
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDb from './config/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

await connectDb();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log('You are connected successfully');
  res.send('Welcome to home page');
});

app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
