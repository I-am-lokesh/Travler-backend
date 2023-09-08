import express from "express" 
import userRouter from "./routes/users.js"
import destRouter from "./routes/destinations.js"
import ticketRouter from "./routes/tickets.js"
import cookieParser from "cookie-parser";
import {config} from "dotenv"
import cors from "cors" 
import paymentRouter from "./routes/payment.js"

config({
  path:"./config.env"
  })

export const app = express () ;
app.use(express.json()) ;
app.use(express.urlencoded({extended:true})) ;
app.use(cookieParser())

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
 

app.use("/api/v1/user",userRouter) ;
app.use("/api/v1/destination",destRouter) ;
app.use("/api/v1/tickets",ticketRouter) ;
app.use("/api/v1/payment",paymentRouter) ;

app.get("/", (req, res) => {
  res.json({
    success: true,
    message : "Welcome to Travler Backend",
  });
});

