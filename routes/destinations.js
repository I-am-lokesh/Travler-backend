import express from "express" ;
import {addDestination,deleteDestination,updateDestination, getAllDestination, getByCity, getByID} from "../controllers/destControl.js" ;



const router = express.Router() ;


//POST METHODS
router.post("/add",addDestination) ;
router.delete("/delete",deleteDestination) ;
router.put("/update",updateDestination) ;




//GET METHODS
router.get("/get/all",getAllDestination) ;
router.get("/get/one", getByID) ;
router.get("/get/:city",getByCity) ;





export default router ;