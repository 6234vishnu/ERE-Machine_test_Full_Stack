import mongoose from "mongoose";

const url=process.env.MONGODB_URI || "mongodb://localhost:27017/ERE_interview"
const connectDb=async()=>{
   try {
    const connect=await mongoose.connect(url)
    
    console.log('database connected');
    
   } catch (error) {
    console.log('error in connecting database',error);
    
    
   }
}

export default connectDb
