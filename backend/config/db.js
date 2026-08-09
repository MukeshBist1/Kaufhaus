// config/db.js
const mongoose=require('mongoose')

const connectDB=async ()=>{
    try{
        const conn=await mongoose.connect(process.env.Mongo_Uri);
        console.log('MongoDB connected successfully' ) ;
    }catch(error){
        console.error("Mongodb connection failed:", error.message)
        process.exit(1)
    }
}

module.exports=connectDB