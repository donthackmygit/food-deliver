import foodModel from '../models/foodModel.js';
import fs from 'fs';

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

export { addFood, listFood, removeFood };