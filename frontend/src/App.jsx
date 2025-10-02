import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Cart from './pages/Cart/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import Verify from './pages/Verify/Verify.jsx';
import MyOrders from './pages/MyOrders/MyOrders.jsx';
import StoreContextProvider from './context/StoreContext.jsx';
import Layout from './Layout.jsx'; 
import AuthHandler from './pages/AuthHandler.jsx';

const App = () => {
    return (
        <StoreContextProvider>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order' element={<PlaceOrder />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path='/myorders' element={<MyOrders />} />
                    <Route path='/auth/callback' element={<AuthHandler />} />
                </Routes>
            </Layout>
        </StoreContextProvider>
    );
};

export default App;