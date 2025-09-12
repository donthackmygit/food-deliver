import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className='navbar'>
            {/* Nhóm logo và text "Admin Panel" */}
            <div className="navbar-logo-container">
                <img className='logo' src={assets.logo} alt="Logo" />
                <p className='admin-panel-text'>{t("adminPanel")}</p>
            </div>
            
            {/* Nhóm các phần tử bên phải */}
            <div className='navbar-right-container'>
                <div className="language-selector">
                    <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language || 'en'}>
                        <option value="en">EN</option>
                        <option value="ja">JP</option>
                    </select>
                </div>
                <img className='profile' src={assets.profile_image} alt="Profile" />
            </div>
        </div>
    );
};

export default Navbar;