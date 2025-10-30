import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';

const app = express();
connectDB();

app.use(cors());
// capture raw body for webhook signature verification while still parsing JSON
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf && buf.toString(); } }));
app.use(clerkMiddleware());

app.get('/', (req, res) => {
  res.send('api working');
});

app.post('/clerk', clerkWebhooks);
app.use('/api/educator', educatorRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
