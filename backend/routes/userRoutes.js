import express from 'express'
const userRoutes=express.Router()
import {userLogin,userRegister} from '../controllers/userController.js'

userRoutes.post('/register',userRegister)
userRoutes.post('/login',userLogin)


export default userRoutes