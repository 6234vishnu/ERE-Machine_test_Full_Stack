import React, { useState,useNavigate } from 'react'
import api from '../../api/axiosInstance'
import '../styles/loginPage.css'

function LoginPage() {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [message,setMessage]=useState("")
    const navigate=useNavigate()

    const handleClick=async(e)=>{
        e.preventDefault()
        if(!email && !password){
            return setMessage("enter email and password ")
        }
        else if(password!==confirmPassword){
            return setMessage("password no matched try again")
        }
        try {

            const response=await api.get('/user/auth/login',{email,password})// sending data to backend in body
            if(response.data.success){
                setMessage(response.data.message)
                localStorage.setItem('userToken',response.data.token)
                return setTimeout(()=>{
                    navigate('/profile')
                },1000)
            }

        } catch (error) {
            setMessage('server error try later')
            console.log(error);
            
        }
    }

  return (


    <div>
<h2>Login</h2>
<form className='formData' onSubmit={handleClick}>
    <label htmlFor="email">Enter Email</label>
    <input className='formInputs' required onChange={(e)=>setEmail(e.target.value)} type="email" />
    <label htmlFor="password">Enter password</label>
    <input className='formInputs'  required onChange={(e)=>setPassword(e.target.value)} type="password" />
    <label htmlFor="password">confirm password</label>
    <input className='formInputs'  required onChange={(e)=>setConfirmPassword(e.target.value)} type="password" />
    <button className='formButton' type='submit'>Submit</button>
    <h3 style={{color:"white"}}>{message}</h3>
</form>
    </div>
  )
}

export default LoginPage