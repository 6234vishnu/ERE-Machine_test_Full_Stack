import React,{useNavigate} from 'react'


export default function UserProfile() {
    const navigate=useNavigate()

    const handleClick=()=>{
        localStorage.deleteItem("userToken")
         navigate('/')
    }
  return (
    <div>
        <h1>Welcome user</h1>
        <button onClick={handleClick}>Logout</button>
    </div>
  )
}
