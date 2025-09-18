import foodModel from '../models/foodModel.js';
import fs from 'fs';
import userModel from '../models/userModel.js';
import mongoose from 'mongoose'
// Add food item
const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ success: false, message: "Full information please!" });
        }

        if (isNaN(price) || price < 0) {
            return res.status(400).json({ success: false, message: "Invalid price!" });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload image!" });
        }
        const newFood = new foodModel({
            name,
            description,
            price,
            category,
            image: req.file.filename // Sửa thành req.file.filename
        });

        await newFood.save();
        res.status(201).json({ success: true, message: "Food added!", food: newFood });

    } catch (error) {
        console.error("Error in addFood:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// All food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error in listFood:", error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Không tìm thấy món ăn" });
        }

        // Xóa file ảnh
        if (fs.existsSync(`uploads/${food.image}`)) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.error("Error deleting image:", err);
            });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error("Error in removeFood:", error);
        res.json({ success: false, message: "Error" });
    }
};

const searchFood = async (req, res) => {
    try {
        // Lấy từ khóa tìm kiếm từ query parameter 'q'
        const searchQuery = req.query.q;

        if (!searchQuery) {
            return res.json({ success: true, data: [] });
        }

        // Tạo một biểu thức chính quy (regex) để tìm kiếm không phân biệt chữ hoa/thường
        const keyword = new RegExp(searchQuery, 'i');

        // Tìm các món ăn có 'name' hoặc 'description' khớp với từ khóa
        const foods = await foodModel.find({
            $or: [
                { name: { $regex: keyword } },
                { description: { $regex: keyword } }
            ]
        });

        res.json({ success: true, data: foods });

    } catch (error) {
        console.log("Error in searchFood:", error);
        res.json({ success: false, message: "Error searching for food" });
    }
}
const updateFood = async (req, res) => {
    try {
        const foodId = req.params.id; // Lấy ID món ăn từ URL params
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ success: false, message: "Full information please!" });
        }

        if (isNaN(price) || price < 0) {
            return res.status(400).json({ success: false, message: "Invalid price!" });
        }

        let updateData = {
            name,
            description,
            price,
            category
        };
        if (req.file) {
            const oldFood = await foodModel.findById(foodId);
            if (oldFood && fs.existsSync(`uploads/${oldFood.image}`)) {
                fs.unlink(`uploads/${oldFood.image}`, (err) => {
                    if (err) console.error("Error deleting old image:", err);
                });
            }
            updateData.image = req.file.filename;
        }

        const updatedFood = await foodModel.findByIdAndUpdate(foodId, updateData, { new: true });

        if (!updatedFood) {
            return res.status(404).json({ success: false, message: "Food not found!" });
        }

        res.json({ success: true, message: "Food updated!", food: updatedFood });

    } catch (error) {
        console.error("Error in updateFood:", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
const listRecommendations = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findById(userId);

        let recommendedFoodIds = [];

        if (user && user.mlRecommendations && user.mlRecommendations.length > 0) {
            recommendedFoodIds = user.mlRecommendations.map(id => new mongoose.Types.ObjectId(id));
        } else {
            const fallbackRecs = await foodModel.aggregate([{ $sample: { size: 6 } }]);
            return res.json({ success: true, data: fallbackRecs });
        }

        const recommendations = await foodModel.find({ _id: { $in: recommendedFoodIds } });

        // --- BẮT ĐẦU SỬA LỖI ---
        // Dùng Map để đảm bảo mỗi món ăn chỉ xuất hiện một lần, giữ lại thứ tự gợi ý
        const uniqueRecommendationsMap = new Map();
        recommendations.forEach(food => {
            // Nếu món ăn chưa có trong Map, thêm nó vào
            if (!uniqueRecommendationsMap.has(food._id.toString())) {
                uniqueRecommendationsMap.set(food._id.toString(), food);
            }
        });

        // Chuyển Map trở lại thành mảng
        const uniqueRecommendations = Array.from(uniqueRecommendationsMap.values());
        // --- KẾT THÚC SỬA LỖI ---

        // (Tùy chọn) Sắp xếp lại kết quả theo đúng thứ tự mà mô hình đã gợi ý
        const sortedRecommendations = recommendedFoodIds
            .map(id => uniqueRecommendationsMap.get(id.toString())) // Lấy từ map đã lọc
            .filter(Boolean); // Lọc ra các món null (nếu có món đã bị xóa)

        res.json({ success: true, data: sortedRecommendations });

    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export { addFood, listFood, removeFood, searchFood, updateFood, listRecommendations};