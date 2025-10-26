import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true }, // Combined name
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String },
    imageUrl: { type: String },
    enrolledCourse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;
