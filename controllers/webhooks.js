import { Webhook } from "svix";
import User from "../models/user.js";

export const clerkWebhooks = async (req, res) => {
  try {
    console.log('Webhook received, verifying...');
    
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
    const payload = JSON.stringify(req.body);
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    };

    const verified = whook.verify(payload, headers);
    console.log('Webhook verified successfully');

    const { data, type } = req.body;
    
    console.log(`Webhook type: ${type}`, data);

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          imageUrl: data.image_url || '',
        };
        
        console.log('Creating user:', userData);
        const newUser = await User.create(userData);
        console.log('User created successfully in MongoDB:', newUser._id);
        return res.json({ success: true, message: 'User created' });
      }
      
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          imageUrl: data.image_url || '',
        };
        
        console.log('Updating user:', data.id, userData);
        const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
        console.log('User updated successfully:', updatedUser?._id);
        return res.json({ success: true, message: 'User updated' });
      }
      
      case "user.deleted": {
        console.log('Deleting user:', data.id);
        const deletedUser = await User.findByIdAndDelete(data.id);
        console.log('User deleted successfully:', deletedUser?._id);
        return res.json({ success: true, message: 'User deleted' });
      }
      
      default:
        console.log('Unhandled webhook type:', type);
        return res.json({ success: true, message: 'Webhook received' });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(400).json({ 
      success: false, 
      error: error.message,
      details: 'Webhook processing failed'
    });
  }
};