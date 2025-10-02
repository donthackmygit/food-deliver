import React, { useState, useContext } from "react";
import './LoginPopup.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from "../../assets/assets";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { jwtDecode } from 'jwt-decode'; // BƯỚC 1: IMPORT THƯ VIỆN

const LoginPopup = ({ setShowLogin }) => {
    // BƯỚC 2: LẤY setUserName TỪ CONTEXT
    const { url, setToken, setUserName } = useContext(StoreContext);
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
        try {
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                const token = response.data.token;
                setToken(token);
                localStorage.setItem("token", token);

                // BƯỚC 3: GIẢI MÃ TOKEN VÀ CẬP NHẬT TÊN NGƯỜI DÙNG
                try {
                    const decodedToken = jwtDecode(token);
                    setUserName(decodedToken.name); // Cập nhật tên vào context
                } catch (error) {
                    console.error("Lỗi giải mã token:", error);
                }

                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Lỗi khi đăng nhập/đăng ký:", error);
            alert("Đã xảy ra lỗi. Vui lòng thử lại.");
        }
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error("Lỗi khi bắt đầu chuyển hướng Google:", error);
            alert("Không thể bắt đầu đăng nhập bằng Google. Vui lòng thử lại.");
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
                    {currState === "Sign Up" && (
                        <input
                            name='name'
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            placeholder={t('yourName')}
                            required
                        />
                    )}
                    <input
                        name='email'
                        onChange={onChangeHandler}
                        value={data.email}
                        type="email"
                        placeholder={t("yourEmail")}
                        required
                    />
                    <input
                        name='password'
                        onChange={onChangeHandler}
                        value={data.password}
                        type="password"
                        placeholder={t("Password")}
                        required
                    />
                </div>
                <button type="submit">{currState === "Sign Up" ? t("createAccount") : t("Login")}</button>
                
                <div className="login-popup-google-btn">
                    <button type="button" onClick={signInWithGoogle}>
                        <img src={assets.google_icon} alt="Google Icon" className="google-icon" />
                        {t("continueWithGoogle")}
                    </button>
                </div>

                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>{t("agreeToTerms")}</p>
                </div>
                {currState === "Login"
                    ? <p>{t("createNewAccountPrompt")} <span onClick={() => setCurrState("Sign Up")}>{t("clickHere")}</span></p>
                    : <p>{t("alreadyHaveAccountPrompt")} <span onClick={() => setCurrState("Login")}>{t("loginHere")}</span></p>
                }
            </form>
        </div>
    );
};

export default LoginPopup;