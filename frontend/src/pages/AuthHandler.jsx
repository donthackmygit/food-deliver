import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAuth, getRedirectResult } from 'firebase/auth';
import { StoreContext } from '../context/StoreContext';
import { jwtDecode } from 'jwt-decode';

const AuthHandler = () => {
    const navigate = useNavigate();
    const { url, setToken, setUserName, token } = useContext(StoreContext); 

    // Hàm xử lý kết quả chuyển hướng từ Firebase/Google
    useEffect(() => {
        const handleAuthRedirect = async () => {
            const auth = getAuth();
            try {
                const result = await getRedirectResult(auth);

                if (result) {
                    console.log("Đã nhận kết quả chuyển hướng từ Google.");
                    const idToken = await result.user.getIdToken();
                    const name = result.user.displayName || "User";
                    const email = result.user.email;

                    // Gửi ID Token đến backend để lấy token ứng dụng
                    const response = await axios.post(`${url}/api/user/firebase-login`, {
                        name,
                        email,
                        idToken
                    });

                    if (response.data.success) {
                        const appToken = response.data.token;
                        
                        // 1. Cập nhật Token và lưu vào Local Storage
                        setToken(appToken);
                        localStorage.setItem("token", appToken);
                        
                        // 2. Cập nhật tên người dùng
                        try {
                            const decodedToken = jwtDecode(appToken);
                            setUserName(decodedToken.name);
                        } catch (error) {
                            console.error("Lỗi giải mã token:", error);
                        }
                        
                        console.log("Login Success. Token và UserName đang được cập nhật.");
                        
                        // KHÔNG GỌI navigate('/') Ở ĐÂY NỮA. 
                        // Việc điều hướng sẽ được xử lý bởi useEffect bên dưới.

                    } else {
                        alert(response.data.message);
                        navigate('/login'); // Điều hướng về trang đăng nhập nếu thất bại
                    }
                } else {
                    // Nếu không có kết quả chuyển hướng, chuyển về trang chủ (chẳng hạn nếu người dùng tự truy cập URL này)
                    console.log("Không có kết quả chuyển hướng, điều hướng về trang chủ.");
                    // Chỉ điều hướng nếu không có token để tránh lặp vô tận
                    if (!localStorage.getItem("token")) {
                         navigate('/');
                    }
                }
            } catch (error) {
                console.error("Lỗi xử lý kết quả chuyển hướng:", error);
                alert("Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.");
                navigate('/');
            }
        };

        handleAuthRedirect();
    }, [navigate, setToken, url, setUserName]); 
    
    // *** USE EFFECT MỚI: Xử lý điều hướng khi token đã được cập nhật ***
    // Điều này đảm bảo Navbar có đủ thời gian để re-render với state mới (token)
    useEffect(() => {
        if (token) {
            console.log("Token đã có trong Context. Hoàn tất điều hướng về /");
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2>Đang xử lý đăng nhập...</h2>
        </div>
    );
};

export default AuthHandler;