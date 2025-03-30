import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage'

 function App() {
 

  return (
    
     <BrowserRouter>
     <Routes>
<Route path="/" element={<LoginPage/>}/>
<Route path="/profile" element={<LoginPage/>}/>
     </Routes>
     </BrowserRouter>
     
    
  )
}

export default App
