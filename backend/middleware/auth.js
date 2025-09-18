import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    try {
        let token = null;

        // Ưu tiên đọc từ header token
        if (req.headers.token) {
            token = req.headers.token;
        }

        // Nếu không có, thử đọc từ Authorization: Bearer ...
        else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // Không có token
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
        }

        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Lưu thông tin vào req
        req.userId = decoded.id;
        req.username = decoded.name;

        next();
    } catch (error) {
        console.error("Auth error:", error);
        res.status(401).json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleware;