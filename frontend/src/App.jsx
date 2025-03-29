import { useState } from 'react'
import './App.css'
import {BrowserRoutes,Routes,Route} from 'react'
import LoginPage from './pages/LoginPage'

 function App() {
 

  return (
    
     <BrowserRoutes>
     <Routes>
<Route path="/" element={<LoginPage/>}/>
<Route path="/profile" element={<LoginPage/>}/>
     </Routes>
     </BrowserRoutes>
     
    
  )
}

export default App
