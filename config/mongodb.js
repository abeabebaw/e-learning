import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
  }
};

export default connectDB;
