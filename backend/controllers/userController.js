import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

// Thay đổi ở đây: Thêm 'name' vào hàm tạo token
const createToken = (id, name) => {
    // Thêm 'name' vào payload của token
    return jwt.sign({ id, name }, process.env.JWT_SECRET); 
}

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        // Thay đổi ở đây: Truyền thêm user.name vào createToken
        const token = createToken(user._id, user.name); 
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;
    try {
        //checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exist" });
        }

        //validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        //hashing user's password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });

        const user = await newUser.save();
        // Thay đổi ở đây: Truyền thêm user.name vào createToken
        const token = createToken(user._id, user.name); 
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}
const getUserProfile = async (req, res) => {
    try {
        // LƯU Ý: Sau khi bạn cập nhật authMiddleware, bạn nên đổi dòng này thành:
        // const userId = req.userId;
        const userId = req.body.userId; // userId được lấy từ authMiddleware
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Chỉ trả về những thông tin cần thiết, không trả về mật khẩu
        const userData = {
            name: user.name,
            email: user.email
        };

        res.json({ success: true, userData: userData });

    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
export { loginUser, registerUser, getUserProfile };