import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BroswerRouter, Routes, Route, BrowserRouter} from 'react-router-dom'
import Login from './Login'
function App() {
 
return (
 
     <BrowserRouteR>
      <Routes>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Signup />}></Route>
        </Routes>
     </BrowserRouteR>
     
  )
}

export default App