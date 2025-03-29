import mongoose from "mongoose";

const url=process.env.MONGODB_URI
const connectDb=async()=>{
   try {
    const connect=await mongoose.connect('mongodb+srv://shafeeq:sneak@cluster0.sq01t.mongodb.net/userData',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    
    console.log('database connected');
    
   } catch (error) {
    console.log('error in connecting database',error);
    
    
   }
}

export default connectDb