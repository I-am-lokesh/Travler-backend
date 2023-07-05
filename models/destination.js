import mongoose from "mongoose";


const destinationSchema = new mongoose.Schema({ 
      
        name : { 
            type : String,
            required : true,
        },
        description : {
            type : String,

         },
        entryPrice : {
                type : Number,
                required : true,
            },
        location : {
                type : String,
                required : true,
        
             },
        city : {
                type : String,
                required : true,
                lowercase : true,
             },
        timing : { 
                   openAllDay : {
                     type : Boolean,
                     default : false,
                   },
                    monday : String,
                    tuesday : String,
                    wednesday : String,
                    thursday : String,
                    friday : String,
                    saturday : String,
                    sunday : String,
                 },
                 total_visits : { 
                    type : Number,
                    default : 0,
                 },
          no_of_likes : {
                     type : Number,
                     default : 0,
                   },
          no_of_visits : {
                     type : Number,
                     default : 0,
                     },
          createdAt : {
                 type : Date,
                 default : Date.now,
                 }

});


export const Destination = mongoose.model("Destinations", destinationSchema);