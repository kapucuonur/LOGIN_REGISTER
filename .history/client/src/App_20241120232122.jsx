import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            {/* ToastContainer global olarak bildirimleri gösterecek */}
            <ToastContainer 
             position="top-right" // Bildirim konumu
             autoClose={3000} // Otomatik kapanma süresi (ms)
             hideProgressBar={false} // İlerleme çubuğu
             newestOnTop={true} // Yeni bildirimler üstte görünsün
             closeOnClick // Tıklanınca kapansın
             pauseOnHover // Fare ile üzerine gelince duraklasın
             draggable // Sürüklenebilir olsun
             theme="light" // Tema: "light", "dark" veya "colored"
            />

            {/* React Router ile yönlendirmeler */}
            <BrowserRouter>
            
                <Routes>
                  
                    <Route path="/register" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
