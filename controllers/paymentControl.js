import {instance } from "../server.js";
import crypto from "crypto";
import {Payment} from "../models/paymentSchema.js"

let order_id ;

export const checkout = async (req, res) => {
        try {
            const options = {
                amount: Number(req.body.amount * 100),  // amount in the smallest currency unit but now in Rs
                currency: "INR",
                receipt: "order_rcptid_11"
              };
             const order = await instance.orders.create(options)
                           
             console.log(order)
             order_id = order.id ;

             res.status(200).json({
                    success: true,
                    order
                })
        
        
        } catch (error) {
              console.log(error)
        }
    
}

export const paymentVerification = async (req, res) => {
         
       const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body ;

        console.log(req.body) ;
       
       
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest("hex");
        console.log(digest, razorpay_signature);
        if (digest !== razorpay_signature)
        return res.status(400).json({
            success: false,
            message: "Payment verification failed",
        });
           // Database related work
              const payment = await Payment.create({
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                });
               
          const { destination_id, persons } = req.query ;
        

        res.redirect(`${process.env.FRONTEND_URL}/paymentSuccess?reference_id=${razorpay_payment_id}&destination_id=${destination_id}&persons=${persons}`)
       
        
 }