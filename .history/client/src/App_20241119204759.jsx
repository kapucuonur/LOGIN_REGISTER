import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup';
import {BroswerRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
function App() {
 
return (
 
     <BrowserRouteR>
      <Routes>
        <Route path="/register" element={<Signup />} />
      </Routes>
     </BrowserRouteR>
     
  )
}

export default App
