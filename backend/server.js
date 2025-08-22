import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// --- APP CONFIG ---
const app = express();
const port = process.env.PORT || 4000;

// --- MIDDLEWARE ---

// TỐI ƯU: Xử lý route webhook của Stripe TRƯỚC khi phân tích JSON.
// Stripe yêu cầu request body ở dạng raw để xác thực chữ ký.
// Dòng này đảm bảo chỉ route webhook mới nhận được raw body.
app.use('/api/order/webhook', express.raw({ type: 'application/json' }), orderRouter);

// Middleware express.json() sẽ được áp dụng cho tất cả các route còn lại.
app.use(express.json());

// Cấu hình CORS của bạn đã tốt, sử dụng biến môi trường là một thực hành hay.
const allowedOrigins = process.env.CLIENT_URLS ? process.env.CLIENT_URLS.split(',') : [];

app.use(cors({
    origin: function (origin, callback) {
        // Cho phép các request không có origin (ví dụ: Postman, mobile apps)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

// --- DATABASE CONNECTION ---
connectDB();
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter); // Xử lý các route còn lại của order (place, list,...)
app.use("/images", express.static('uploads')); 

// Route health check
app.get("/", (req, res) => {
    res.send("API is working correctly.");
});

// --- START SERVER ---
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});