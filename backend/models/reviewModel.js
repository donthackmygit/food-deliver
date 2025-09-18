// backend/models/reviewModel.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    username: { // Lưu lại username để không cần populate mỗi lần
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        default: ""
    }
}, { timestamps: true })
const reviewModel = mongoose.models.review || mongoose.model("review", reviewSchema);
export default reviewModel;