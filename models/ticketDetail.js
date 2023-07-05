import mongoose from "mongoose";

const ticketDetailSchema = new mongoose.Schema({


    ticket_id : String,
    user_id : String,
    destination_name : String,
    Date :  {
        type : Date,
        default : Date.now,
    },
    persons : Number,
    total_price : Number,
});



export const TicketDetail = mongoose.model("TicketDetail", ticketDetailSchema);