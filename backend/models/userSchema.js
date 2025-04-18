import mongoose from "mongoose"

const useSchema = new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})
export default mongoose.model("User",useSchema)