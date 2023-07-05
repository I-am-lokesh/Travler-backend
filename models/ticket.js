import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({
    ticket_id : {
        type : String,
        required : true,
    },
    destination_id : {
        type : String,
        required : true,
    },
    destination_name:{
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    }
   
 });

 export const Ticket = mongoose.model("Tickets", ticketSchema);