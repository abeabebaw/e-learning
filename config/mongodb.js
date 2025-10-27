import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully to:', conn.connection.host);
    console.log('📊 Database:', conn.connection.name);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
