 import express from 'express'
 import mongoose from'mongoose'
 const userSchema=new mongoose.Schema(
    {
        _id:{type:String, required:true, },
     Firestname:{type:String,required:true,},
      Lastname:{type:String,required:true,},
     
      email: {type: String,required: true,unique: true,
        lowercase: true}, password: {type: String,required: true,},
        imageUrl:{ type:String, required:true, },
    enrolledCourse:[
            {
          type:mongoose.Schema.Types.ObjectId,
          ref:'Course'
            }
        ],

    },{
        timestamps:true
    }
 );
 const User=mongoose.model('user',userSchema);
 export default User