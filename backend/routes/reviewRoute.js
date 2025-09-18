import express from 'express';
import { addReview, getReviewsForFood } from '../controllers/reviewController.js';
import authMiddleware from '../middleware/auth.js'; 
const reviewRouter = express.Router();
reviewRouter.post("/add", authMiddleware, addReview);
reviewRouter.get("/:foodId", getReviewsForFood);

export default reviewRouter