import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';
 await connectDb();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log('You are connected successfully');
  // Friendly, stable welcome message
  res.send('Welcome to home page');
});

// For webhook verification (svix) we must use the raw request body so the
// signature can be validated against the original payload. Configure this
// route to use express.raw for application/json content.
app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
