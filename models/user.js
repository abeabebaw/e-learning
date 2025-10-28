import mongoose from "mongoose";
const userSchema=new mongoose.Schema(
  {
    _id:{ type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    imageUrl:{ type:String,required:true},
    enrolledCourses:[
     { type:mongoose.Schema.Types.ObjectId,
      ref:'Course'}
    ],


  },{
    timestamps:true
  }
);
 const User=mongoose.model('User',userSchema);
<<<<<<< HEAD
 export default User;
=======
 export default User;
>>>>>>> 9c99c67dfec2f8eb3d4eb1cd783ba091bd06f528
