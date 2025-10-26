import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import connectDb from './config/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB (must be done inside an async function)
(async () => {
  try {
    await connectDb();
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Exit if DB connection fails
  }
})();

// ✅ Middleware
app.use(cors());

// ✅ Default route
app.get('/', (req, res) => {
  console.log("You are connected successfully");
  res.send('Welcome to my hero bro 🚀');
});

// ✅ Clerk Webhook route (MUST use express.raw for signature verification)
app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on PORT ${PORT}`);
});
