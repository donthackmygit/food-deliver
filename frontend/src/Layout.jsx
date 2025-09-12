// frontend/src/components/Layout/Layout.jsx (Đã sửa đổi)
import React, { useState, useContext } from 'react';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import LoginPopup from './components/LoginPopup/LoginPopup.jsx';
import SearchModal from './components/SearchModal/SearchModal.jsx';
import { StoreContext } from './context/StoreContext.jsx';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    const [showLogin, setShowLogin] = useState(false);
    const { url } = useContext(StoreContext);

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (query) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${url}/api/food/search?q=${query}`);
            if (response.data.success) {
                setSearchResults(response.data.data);
                setIsSearchModalOpen(true);
            } else {
                console.error("Search failed:", response.data.message);
            }
        } catch (error) {
            console.error("An error occurred during search:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
            <SearchModal 
                isOpen={isSearchModalOpen} 
                onClose={() => setIsSearchModalOpen(false)} 
                searchResults={searchResults} 
            />

            <div className="app">
                <Navbar setShowLogin={setShowLogin} onSearch={handleSearch} />
                <main>
                    {/* Các components con sẽ được render ở đây */}
                    {children}
                </main>
            </div>
            
            <Footer />
        </>
    );
};

export default Layout;