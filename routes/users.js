import express from "express";
import { register, login, logout , likeOrUnlike, userDetails, getLikes,updateUser } from "../controllers/userControl.js";
import { isAuthentic } from "../middlewares/auth.js";

const router = express.Router() ;

//POST METHODS 
router.post("/signup",register) ;
router.post("/login",login) ;
//PUT METHODS
router.put("/likeOrUnlike", isAuthentic ,likeOrUnlike) ; 
router.put("/updateUser", isAuthentic ,updateUser) ;

// //GET METHODS
 router.get("/logout",logout) ;
 router.get("/userDetails",isAuthentic,userDetails) ;
router.get("/userLikes",isAuthentic, getLikes) ;

export default router ;

