import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; // BƯỚC 1: IMPORT THƯ VIỆN

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const API_URL_CART = "https://oi35dr01r4.execute-api.ap-southeast-1.amazonaws.com/dev/"
    const [token, setToken] = useState("");
    const [userName, setUserName] = useState(""); // BƯỚC 2: THÊM STATE CHO TÊN NGƯỜI DÙNG
    const [food_list, setFoodList] = useState([]);

    // Add to cart
    const addToCart = async (itemId) => {
        const originalCart = { ...cartItems };
        const newQuantity = (cartItems[itemId] || 0) + 1;
        setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));

        if (token) {
            try {
                await axios.post(
                    `${API_URL_CART}cart/add`,
                    { itemId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error("Failed to add item to cart on server:", error);
                setCartItems(originalCart);
                alert("Could not add item to cart. Please try again.");
            }
        }
    };

    // Remove from cart
    const removeFromCart = async (itemId) => {
        const originalCart = { ...cartItems };
        const newQuantity = (cartItems[itemId] || 0) - 1;
        setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));

        if (token) {
            try {
                await axios.post(
                    `${API_URL_CART}/cart/remove`,
                    { itemId },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error("Failed to remove item from cart on server:", error);
                setCartItems(originalCart);
                alert("Could not remove item from cart. Please try again.");
            }
        }
    };

    // Get total amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    // Fetch food list
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Failed to fetch food list:", error);
        }
    };

    // Load cart data
    const loadCartData = async (token) => {
        try {
            const response = await axios.get(
                `${API_URL_CART}cart`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Failed to load cart data:", error);
            setCartItems({});
        }
    };

    // useEffect: Load initial data and restore user session
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);

                // BƯỚC 3: GIẢI MÃ TOKEN ĐỂ LẤY TÊN NGƯỜI DÙNG KHI TẢI LẠI TRANG
                try {
                    const decodedToken = jwtDecode(storedToken);
                    // Giả định rằng payload của token chứa trường 'name'
                    setUserName(decodedToken.name); 
                } catch (error) {
                    console.error("Invalid token found in localStorage:", error);
                    // Nếu token không hợp lệ, xóa nó đi
                    localStorage.removeItem("token");
                }
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        userName,     
        setUserName   
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

StoreContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default StoreContextProvider;