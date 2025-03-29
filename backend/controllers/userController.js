import User from "../models/userSchema.js"
import bcyrpt from 'bcrypt'
import jwt from 'jsonwebtoken'
const mongodbSecretKey = process.env.JWT_SECRET_KEY

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body // reciving from  body
        if (!email && !password) {
            return res.status(200).json({ success: false, message: " email and password is not found" })
        }
        const hashedPassword = bcyrpt.hash(password, 10)

        const findUser = await User.findOne({ email: email, password: hashedPassword }) // finding the user
        if (!findUser) {
            return res.status(200).json({ success: false, message: "user  not found" })
        }
        const token =  jwt.sign({ userId: findUser._id }, mongodbSecretKey, {  //jwt integration
            expiresIn: "2h"
        })
        return res.status(200).json({ success: true, message: "user login successfull", token })
    } catch (error) {
        console.log('error in userLogin', error);
        return res.status(500).json({ success: false, message: "error in user login " })

    }
}


export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(200).json({ success: false, message: "user name and password and email is not found" })
        }
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ success: false, message: "useris already exists" })
        }
        const hashedPassword = bcyrpt.hash(password, 10)
        const createUser = new User({
            email: email,
            name: name,
            password: hashedPassword,
        })

        const saveUser = await createUser.save()
        if (!saveUser) {
            return res.status(500).json({ success: false, message: "error occured while saving data" })
        }

        const token = await jwt.sign({ userId: findUser._id }, mongodbSecretKey, {  //jwt integration
            expiresIn: "2h"
        })
        if (token) {
            return res.status(500).json({ success: false, message: "error occured while saving data" })
        }
        return res.status(200).json({ success: true, message: "user signUp successfull", token })

    } catch (error) {
        console.log('error in userRegister', error);
        return res.status(500).json({ success: false, message: "error in user signUp " })
    }
}

