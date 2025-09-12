import React from "react";
import './Footer.css'
import { assets } from "../../assets/assets";
import { useTranslation } from "react-i18next";

const Footer = () => {
    const { t } = useTranslation();

    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.logo} alt=""/>
                    <p>{t("footerDescription")}</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt=""/>
                        <img src={assets.twitter_icon} alt=""/>
                        <img src={assets.linkedin_icon} alt=""/>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>{t("company")}</h2>
                    <ul>
                        <li>{t("Home")}</li>
                        <li>{t("aboutUs")}</li>
                        <li>{t("delivery")}</li>
                        <li>{t("privacyPolicy")}</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>{t("getInTouch")}</h2>
                    <ul>
                        <li>0924119028</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>
            </div>
            <hr/>
            <p className="footer-copyright">{t("copyright")}</p>
        </div>
    )
}
export default Footer;