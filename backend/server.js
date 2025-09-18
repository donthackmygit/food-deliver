import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js'; 
import orderRouter from './routes/orderRoute.js';
import reviewRouter from './routes/reviewRoute.js'
import { stripeWebhook } from './controllers/orderController.js';
import cron from 'node-cron'
import orderModel from './models/orderModel.js'
import { updateAllUserRecommendations } from "./services/recommendationService.js"
// --- APP CONFIG ---
const app = express();
const port = process.env.PORT || 4000;
console.log("Server.js is running..."); 
// --- DATABASE CONNECTION ---
connectDB();

// --- MIDDLEWARE ---
app.use(cors());
app.use((req, res, next) => {
    console.log(`[LOG] Nhận được request: ${req.method} ${req.originalUrl}`);
    next();
});
app.post('/api/order/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(express.json());

// --- API ENDPOINTS ---
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter); 
app.use("/api/order", orderRouter);
app.use("/images", express.static('uploads'));
app.use("/api/review", reviewRouter)
cron.schedule('*/5 * * * *', async () => {
    console.log('Running cron job to check for scheduled orders...');
    try {
        const now = new Date();
        // Lấy các đơn hàng có trạng thái "Scheduled" và thời gian giao hàng nằm trong 60 phút tới
        const sixtyMinutesFromNow = new Date(now.getTime() + 60 * 60 * 1000);

        const ordersToProcess = await orderModel.find({
            status: 'Scheduled',
            scheduledDeliveryTime: { $lte: sixtyMinutesFromNow }
        });

        if (ordersToProcess.length > 0) {
            console.log(`Found ${ordersToProcess.length} scheduled orders to process.`);
            for (const order of ordersToProcess) {
                order.status = 'Food Processing';
                await order.save();
            }
        }
    } catch (error) {
        console.error('Error processing scheduled orders:', error);
    }
})
cron.schedule('0 2 * * *', () => {
    console.log('Running daily cron job to update ML recommendations...');
    updateAllUserRecommendations();
}, {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh"
});
app.get("/", (req, res) => {
    res.send("API is working correctly.");
});

// --- START SERVER ---
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});