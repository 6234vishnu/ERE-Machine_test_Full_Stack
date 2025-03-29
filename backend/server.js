import express from 'express'
import dotenv from 'dotenv'
import connectDb from './dataBase/db.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors'



connectDb()
dotenv.config()
const app=express()
const PORT=process.env.PORT

app.get("/",(req,res)=>{
    res.send('backend is running')
})
app.use(express.json())
app.use('/user',userRoutes)
app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:"GET,POST,PUT,PATCH,OPTIONS",
    credentials:true,
    allowedHeaders:"Application-content,content-type"
}
))

app.listen(PORT,()=>{
    console.log(`serve running on http://localhost:${PORT}`);
    
})