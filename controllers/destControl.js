import {Destination} from "../models/destination.js";





// ADDING DESTINATION
export const addDestination = async (req,res) => { 

  const  { name , description , entryPrice , location , city , timing } = req.body ;

  try {    
        const destination = await Destination.findOne({name}) ;

            if(destination) {
                return res.status(400)
                .json({
                    success : false,
                    message : "Destination already exist"
                })
                }

        const CreatedDestination = await Destination.create({
            name,
            description,
            entryPrice,
            location,
            city,
            timing
           })
        res
        .status(201).json({
            success : true,
            message : "Destination added successfully"
        }) ;
     
    
  } catch (error) {
    console.log(error)
    if(destination) {
        return res.status(400)
        .json({
            success : false,
            message : "Destination not added"
        })
        }
  }
}

// ADDING DESTINATION EXIT




//DELETE DETINATION START

export const deleteDestination = async (req,res) => {

           
     const {_id} = req.body ; 
        try {
            const dest = await Destination.findOne({_id}) ;
            if(!dest) {
                res.status(400).json({
                    success : false,
                    message : "Destination does not exist"
                 })
            }
            const name = dest.name ;

            const deletedDestination = await Destination.findByIdAndDelete({_id}) ;
            res.send(`${name} deleted successfully`) ;

        } 
        catch (error) {
            console.log(error)
            res.status(400).json({
                success : false,
                message : "Failed to deleted"
            })
        }


 }

 //DELETE DESTINATION END


 //UPDATE DESTINATION START

    export const updateDestination = async (req,res) => { 

        const {_id ,description,  entryPrice , timing} = req.body ; 

        try {
            const dest = await Destination.findOne({_id}) ;
            if(!dest) {
                res.status(400).json({
                    success : false,
                    message : "Destination does not exist"
                 })
            }
            const name = dest.name ;

            const updatedDestination = await Destination.findByIdAndUpdate({_id},{$set : {description,entryPrice,timing}}) ;
            res.status(200).json({
                success : true,
                message : `${name} updated successfully`
            }) ;

        }
        catch (error) {
            console.log(error)
            res.status(400).json({
                success : false,
                message : "Failed to update"
            })
        }
            
        
    }

    //UPDATE DESTINATION END




    //GET ALL DESTINATION START

    export const getAllDestination = async (req,res) => { 
             const {dest_id} = req.query ;
        try {
            let destinations ;
             if(dest_id) { 
                destinations = await Destination.find({_id : dest_id}) ; 
            } 
             else {
                 destinations = await Destination.find() ;
                }
           
            res.status(200).
            json({
                success : true,
                message : "All destinations",
                destinations
            }) ;
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success : false,
                message : "Failed to get all destinations"
            })
        }
}

//GET ALL DESTINATION END

//GET BY CITY START

export const getByCity = async (req,res) => {
          
        const {city} = req.params ;
        try {
            const destinations = await Destination.find({city}) ;
            res.status(200).
            json({
                success : true,
                message : `All destinations with city ${city}`,
                destinations
            }) ;
        } catch (error) {
            console.log(error)
            res.status(400).json({
                success : false,
                message : `Failed to get all destinations with city ${city}`
            })
        }
 }

 //GET BY CITY END



//GET BY ID START


export const getByID = async (req,res) => {
             
     const { id } = req.query ;
     try {
          const destination = await Destination.find({_id:id}) ;

          if(!destination) {
               res.status(400).
               json({
                    success : false,
                    message : `Destination with id ${id} does not exist`
               })
          }

          res.status(200).
          json({
                success : true,
                message : `Destination with id ${id}`,
                destination : destination
          }) ;
     } catch (error) {
          console.log(error)
          res.status(400).json({
                success : false,
                message : `Failed to get destination with id ${id}`
          })
     }

       


 }
//GET BY ID END






