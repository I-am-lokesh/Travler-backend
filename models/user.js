import mongoose from "mongoose";


 const userSchema = new mongoose.Schema({
         
      name : {
         type : String,
         required : true,
      },
      email: {
        type : String,
        required : true,
        unique : true
        },
      gender : {
            type : String,
            required : true,
        },
        DOB : {
            type : Date,
            required : true,
         },
      password: {
         type :  String,
         required : true,
         select : false
        },
        visited : [String],

        bookedTickets : [String],

        likes: [String],

        nationality : {
            type : String,
            
        },

            
        
        createdAt : {
           type : Date,
           default : Date.now,
        }
 })


 export const User = mongoose.model("Users", userSchema);