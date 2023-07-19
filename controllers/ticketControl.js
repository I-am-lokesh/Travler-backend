import {Ticket} from "../models/ticket.js";
import {User} from "../models/user.js";
import { TicketDetail } from "../models/ticketDetail.js";
import jwt from "jsonwebtoken";
import { convenience } from "../variables.js";
import { Destination } from "../models/destination.js";

//BOOK TICKET START

export const bookTicket = async (req, res) => { 

    const { destination_id, persons, payment_id } = req.body;
     try {  
         const destination = await Destination.findById(destination_id);
            if(!destination) {
                throw new Error("Destination not found");
            }
           const ticket = await Ticket.findOne({destination_id});
           if(!ticket) {
               throw new Error("Ticket for this destination not available at this time");
           }
           
           const total_price = ( ticket.price + convenience * ticket.price )* persons;
           
           const {userToken} = req.cookies;
           let user_id;
           if(userToken) {
                 user_id  = jwt.verify(userToken, process.env.JWT_SECRET);
           }
              else {
                user_id = null;
           }

           const bookedTicket = await TicketDetail.create({
                ticket_id : ticket.ticket_id,
                user_id : user_id,
                destination_name : ticket.destination_name,
                persons : persons,
                total_price : total_price,
                payment_id : payment_id,
                Date : new Date(Date.now()),
                });

                destination.no_of_visits += persons;
                await destination.save();
            res.status(201).json({
                success: true,
                message: "Ticket booked successfully",
                data: bookedTicket
            }) 

     }
        catch (error) {
            console.log(error)
            res.status(404)
            .json({ 
                success: false,
                message: "Could not book ticket for this destination"
             });
        }


}

//BOOK TICKET END




//GET ALL USER TICKETS START
export const getUserTicket = async (req, res) => {
  
    try {
        const { _id } = req.user;
        const ticktDetail = await TicketDetail.find({user_id: _id});
         if(!ticktDetail) {
            throw new Error("Ticket details not found");
         }

        res.status(200)
        .json({
            success: true,
            data: ticktDetail
             });
    } 
    catch (error) {
        console.log(error)
        res.status(404)
        .json({ 
            success: false,
            message: error.message });
    }
 }

 //GET ALL TICKETS END

 
 
 //ADD TICKET START
    export const addTicket = async (req, res) => {

           const {ticket_id, destination_id, destination_name, price} = req.body;
              try {    
                        if(await Ticket.findOne({ticket_id: ticket_id})) {

                            throw new Error("Ticket already exists for this ticket ID");
                            res.status(404).json({
                                success: false,
                                message: "Ticket already exists for this ticket ID" 
                            });
                         } else {
                        const ticket = await Ticket.create({
                        ticket_id : ticket_id,
                        destination_id : destination_id,
                        destination_name : destination_name,
                        price : price,
                    });
                    res.status(201)
                    .json({
                        success: true,
                        data: ticket
                         }); 
                        
                        }
              } 
                catch (error) {
                    console.log(error)
                    res.status(404)
                    .json({ 
                        success: false,
                        message: "could not add the ticket" });
                }
    }

//ADD TICKET END


//GET TICKET BY ID START 


export const getTicketById = async (req, res) => {
       const { ticket_id } = req.body;
        console.log(ticket_id)
         try {
            const ticket = await TicketDetail.findById(ticket_id);
            if(!ticket) {
                throw new Error("Ticket not found");
            }
            res.status(200)
            .json({
                success: true,
                data: ticket
                 });
         }
            catch (error) {
                console.log(error)
                res.status(404)
                .json({ 
                    success: false,
                    message: "Ticket not found or Some internal error occured" });
            }
     


}

//GET TICKET BY ID END
