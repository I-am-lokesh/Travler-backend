import mongoose from "mongoose";


export const connectDB= () =>{
//mongoDb connection

mongoose.connect( process.env.MONGO_URI ,{
    dbName : "Travler"
} ).then((data)=> {
    console.log(`connected to database ${data.connection.host}`)
}) 
.catch((err)=>{ 
    console.log(err)
})
}