import React, { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import StoreContextProvider from './context/StoreContext.jsx'
import Verify from './pages/Verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
const App = () => {
    const [showLogin,setShowLogin] = useState(false)
    return (<>
    <StoreContextProvider>
        {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
            <div className="app">
                <Navbar setShowLogin={setShowLogin}/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='/order' element={<PlaceOrder/>}/>
                    <Route path="/verify" element={<Verify/>}/>
                    <Route path='/myorders' element={<MyOrders/>}/>
                </Routes>
            </div>
            <Footer/>
     </StoreContextProvider>
        </>
    )
}
export default App