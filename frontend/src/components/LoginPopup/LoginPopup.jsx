import React, { useState, useContext } from "react";
import './LoginPopup.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from "../../assets/assets";
import axios from 'axios'
import { useTranslation } from "react-i18next";

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const { t } = useTranslation();
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }
        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    };
    return (
        <div className="login-popup">
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{t(currState)}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder={t('yourName')} required />}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder={t("yourEmail")} required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder={t("Password")} required />
                </div>
                <button type="submit">{currState === "Sign Up" ? t("createAccount") : t("Login")}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>{t("agreeToTerms")}</p>
                </div>
                {currState === "Login"
                    ? <p>{t("createNewAccountPrompt")}<span onClick={() => setCurrState("Sign Up")}>{t("clickHere")}</span></p>
                    : <p>{t("alreadyHaveAccountPrompt")}<span onClick={() => setCurrState("Login")}>{t("loginHere")}</span></p>
                }
            </form>
        </div>
    )
}
export default LoginPopup;