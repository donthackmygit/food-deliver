import reviewModel from '../models/reviewModel.js';
import foodModel from '../models/foodModel.js';
import mongoose from 'mongoose';
const updateFoodRating = async (foodId) => {
    try {
        const stats = await reviewModel.aggregate([
            {
                $match: { foodId: new mongoose.Types.ObjectId(foodId) }
            },
            {
                $group: {
                    _id: '$foodId',
                    ratingCount: { $sum: 1 },
                    averageRating: { $avg: '$rating' }
                }
            }
        ]);

        if (stats.length > 0) {
            await foodModel.findByIdAndUpdate(foodId, {
                ratingCount: stats[0].ratingCount,
                averageRating: stats[0].averageRating
            });
        } else {
            // Nếu không còn review nào, reset lại rating
            await foodModel.findByIdAndUpdate(foodId, {
                ratingCount: 0,
                averageRating: 0
            });
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật rating món ăn:", error);
    }
};

// Thêm review mới
const addReview = async (req, res) => {
    try {
        const { foodId, rating, comment } = req.body;
        const userId = req.userId; // Middleware auth sẽ cung cấp userId
        const username = req.username; // Middleware auth cũng nên cung cấp username

        // Kiểm tra xem người dùng đã review món này chưa
        const existingReview = await reviewModel.findOne({ foodId, userId });
        if (existingReview) {
            return res.status(400).json({ success: false, message: "Bạn đã đánh giá món ăn này rồi." });
        }

        const newReview = new reviewModel({
            foodId,
            userId,
            username, // Lấy từ token sau khi đăng nhập
            rating,
            comment
        });

        await newReview.save();

        // Sau khi lưu review, cập nhật lại rating cho món ăn
        await updateFoodRating(foodId);

        res.json({ success: true, message: "Thêm đánh giá thành công!", review: newReview });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
};

// Lấy tất cả review của một món ăn
const getReviewsForFood = async (req, res) => {
    try {
        const { foodId } = req.params;
        const reviews = await reviewModel.find({ foodId }).sort({ createdAt: -1 }); // Sắp xếp theo mới nhất
        res.json({ success: true, data: reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi Server" });
    }
};

export { addReview, getReviewsForFood }