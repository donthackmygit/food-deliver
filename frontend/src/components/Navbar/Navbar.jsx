import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext.jsx';
import { useTranslation } from 'react-i18next';

const Navbar = ({ setShowLogin, onSearch }) => {
    const { t, i18n } = useTranslation();
    const [menu, setMenu] = useState("menu");
    const { getTotalCartAmount, token, setToken, userName } = useContext(StoreContext);
    const navigate = useNavigate();

    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== "") {
            onSearch(searchQuery);
            setSearchQuery("");
            setIsSearchVisible(false);
        }
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt='' className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>{t("Home")}</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>{t("Menu")}</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>{t("Mobile App")}</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>{t("Contact Us")}</a >
            </ul>
            <div className="navbar-right">
                <div className="language-selector">
                    <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
                        <option value="en">EN</option>
                        <option value="ja">JP</option>
                    </select>
                </div>

                <div className="search-container">
                    <div className={`search-bar ${isSearchVisible ? 'active' : ''}`}>
                        <input
                            type="text"
                            placeholder={t("Search your favourite food...")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                        />
                        <button onClick={handleSearchSubmit}>{t("Go")}</button>
                    </div>
                    <img
                        src={assets.search_icon}
                        alt='search'
                        onClick={() => setIsSearchVisible(!isSearchVisible)}
                        className="search-icon-trigger"
                    />
                </div>

                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt='' /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>{t("Sign In")}</button>
                    : <div className="navbar-profile">
                        <div className='navbar-profile-info'>
                            <span>{userName || 'Profile'}</span>
                            <img src={assets.profile_icon} alt="" />
                        </div>
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>{t("Orders")}</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>{t("Logout")}</p></li>
                        </ul>
                    </div>}

            </div>
        </div>
    );
};
export default Navbar;