// /backend/serverless-handlers/lambda_cart_handler.js

import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';

// --- CÁC HÀM TIỆN ÍCH VÀ KẾT NỐI DB (Tương tự các file handler khác) ---

let dbConnection = null;
const connectToDatabase = async () => {
    if (dbConnection && dbConnection.readyState === 1) {
        return; // Tái sử dụng kết nối nếu đã có
    }
    dbConnection = await mongoose.connect(process.env.MONGODB_URI);
};

const createResponse = (statusCode, body) => ({
    statusCode,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Bật CORS
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
    body: JSON.stringify(body),
});

// --- HÀM LAMBDA CHÍNH ---

export const handler = async (event) => {
    try {
        await connectToDatabase();
        const { httpMethod, path, headers, body } = event;
        
        // Xử lý CORS pre-flight request
        if (httpMethod === 'OPTIONS') {
            return createResponse(204, {});
        }

        // --- BẮT ĐẦU LOGIC XÁC THỰC ---
        // Thay thế cho authMiddleware
        const authHeader = headers.Authorization || headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return createResponse(401, { success: false, message: "Not authorized, login again" });
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;
        // --- KẾT THÚC LOGIC XÁC THỰC ---

        const requestBody = body ? JSON.parse(body) : {};

        // --- BỘ ĐỊNH TUYẾN (ROUTER) TRONG LAMBDA ---
        
        // 1. Lấy giỏ hàng (GET /cart)
        if (httpMethod === 'GET' && path.includes('/cart')) {
            const userData = await UserModel.findById(userId);
            if (!userData) return createResponse(404, { success: false, message: "User not found" });
            return createResponse(200, { success: true, cartData: userData.cartData || {} });
        }

        // 2. Thêm hoặc bớt sản phẩm (POST /cart/add hoặc POST /cart/remove)
        if (httpMethod === 'POST') {
            const { itemId } = requestBody;
            if (!itemId) return createResponse(400, { success: false, message: "itemId is required" });

            const userData = await UserModel.findById(userId);
            if (!userData) return createResponse(404, { success: false, message: "User not found" });

            let cartData = userData.cartData || {};

            if (path.includes('/cart/add')) {
                // --- Add to Cart ---
                cartData[itemId] = (cartData[itemId] || 0) + 1;
                await UserModel.findByIdAndUpdate(userId, { cartData });
                return createResponse(200, { success: true, message: "Added To Cart" });

            } else if (path.includes('/cart/remove')) {
                // --- Remove from Cart ---
                if (cartData[itemId] && cartData[itemId] > 0) {
                    cartData[itemId] -= 1;
                    if (cartData[itemId] === 0) {
                        delete cartData[itemId]; // Xóa khỏi giỏ hàng nếu số lượng là 0
                    }
                }
                await UserModel.findByIdAndUpdate(userId, { cartData });
                return createResponse(200, { success: true, message: "Removed From Cart" });
            }
        }
        
        // Nếu không khớp route nào
        return createResponse(404, { success: false, message: 'Route not found' });

    } catch (error) {
        console.error("Handler Error:", error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return createResponse(401, { success: false, message: 'Invalid or expired token' });
        }
        return createResponse(500, { success: false, message: error.message || "Internal Server Error" });
    }
};