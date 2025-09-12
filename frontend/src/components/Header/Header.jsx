import React from 'react';
import './Header.css';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Header = () => {
    const { t } = useTranslation(); // Khởi tạo useTranslation

    return (
        <div className="header">
            <div className="header-contents">
                <h2>{t("Order your favourite food here")}</h2>
                <p>{t("Choose from a diverse menu featuring a delectable array of dishes crafted with the food")}</p>
                <button>{t("View Menu")}</button>
            </div>
        </div>
    );
};
export default Header;