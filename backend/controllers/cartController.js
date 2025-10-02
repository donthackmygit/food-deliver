import userModel from '../models/userModel.js';
// Add items to user cart
const addToCart = async (req, res) => {
    try {
        const userId = req.userId; // lấy từ authMiddleware
        const { itemId } = req.body;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Error processing request" });
    }
};

// ==========================
// Remove items from user cart
// ==========================
const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId; // lấy từ authMiddleware
        const { itemId } = req.body;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId] && cartData[itemId] > 0) {
            cartData[itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log("Error in removeFromCart:", error);
        res.status(500).json({ success: false, message: "Error processing request" });
    }
};

// ============================
// Fetch user cart data
// ============================
const getCart = async (req, res) => {
    try {
        const userId = req.userId; // lấy từ authMiddleware

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.log("Error in getCart:", error);
        res.status(500).json({ success: false, message: "Error fetching cart" });
    }
};

export { addToCart, removeFromCart, getCart };