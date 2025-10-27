// controllers/clerkWebhooks.js
import { Webhook } from "svix";
import Users from "../models/user.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Verify the webhook
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
    console.log(`Processing webhook: ${type}`, data);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email_addresses?.[0]?.email_address,
          imageUrl: data.image_url,
        };
        console.log('Creating user:', userData);
        await Users.create(userData);
        res.json({ message: "User created successfully" });
        break;
      }

      case "user.updated": {
        const userData = {
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email_addresses?.[0]?.email_address,
          imageUrl: data.image_url,
        };
        console.log('Updating user:', data.id, userData);
        await Users.findByIdAndUpdate(data.id, userData, { new: true });
        res.json({ message: "User updated successfully" });
        break;
      }

      case "user.deleted": {
        console.log('Deleting user:', data.id);
        await Users.findByIdAndDelete(data.id);
        res.json({ message: "User deleted successfully" });
        break;
      }

      default:
        console.log(`Unhandled event type: ${type}`);
        res.status(200).json({ message: "Event type not handled" });
        break;
    }
  } catch (error) {
    console.error("Webhook verification or processing failed:", error);
    res.status(400).json({ error: "Webhook processing failed" });
  }
};
