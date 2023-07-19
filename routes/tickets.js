import express from "express" ;
import { isAuthentic } from "../middlewares/auth.js";
import { getUserTicket, bookTicket, addTicket,getTicketById } from "../controllers/ticketControl.js";

const router = express.Router() ;



//POST METHODS
router.post("/book",bookTicket);
router.post("/addTicket",addTicket);
router.post("/getTicketByID", getTicketById)

//GET METHODS
router.get("/getUserTickets", isAuthentic, getUserTicket);

export default router ;

