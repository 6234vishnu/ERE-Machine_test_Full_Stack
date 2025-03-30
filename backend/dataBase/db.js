import mongoose from "mongoose";

const url=process.env.MONGODB_URI
const connectDb=async()=>{
   try {
    const connect=await mongoose.connect('mongodb://localhost:27017/ERE_interview',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    
    console.log('database connected');
    
   } catch (error) {
    console.log('error in connecting database',error);
    
    
   }
}

export default connectDb
