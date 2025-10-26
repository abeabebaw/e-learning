import { Webhook } from "svix";
import user from "../models/user.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // Verify webhook signature
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": { // Fixed: removed extra space
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address, // Fixed: consistent property name
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };
        await user.create(userData);
        res.json({ message: "User created successfully" });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address, // Fixed: consistent property name
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        };
        await user.findByIdAndUpdate(data.id, userData);
        res.json({ message: "User updated successfully" });
        break;
      }

      case "user.deleted": {
        await user.findByIdAndDelete(data.id);
        res.json({ message: "User deleted successfully" });
        break;
      }

      default:
        console.log(`Unhandled event type: ${type}`);
        res.status(200).json({ message: "Event type not handled" });
        break;
    }
  } catch (error) {
    console.error("Webhook verification failed:", error);
    res.status(400).json({ error: "Webhook processing failed" });
  }
};
