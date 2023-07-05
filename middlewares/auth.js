import jwt from "jsonwebtoken" ;
import {User} from "../models/user.js" ;

export const isAuthentic = async (req, res, next) => {
       
        const {userToken} = req.cookies ; 
        if(!userToken) {
            return res
            .status(404)
            .json({
                success : false,
                message : "Login Again, Your Session has exprired"
            })
        }

        const id = jwt.verify(userToken, process.env.JWT_SECRET) ;
        
        req.user = await User.findById(id._id) ;
        next() ;
} ;
