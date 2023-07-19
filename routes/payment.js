import express from "express";
import { checkout, paymentVerification } from "../controllers/paymentControl.js";


const router = express.Router();

router.route("/checkout").post(checkout);
router.route("/paymentVerification").post(paymentVerification);

router.get("/getKey", (req, res) => {
    res.status(200).json({
        success: true,
        key: process.env.RAZORPAY_API_KEY
 }) })


export default router;