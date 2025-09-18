import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext'; 
import './AddReviewForm.css'; 
const AddReviewForm = ({ foodId, onReviewAdded }) => {
    const { token } = useContext(StoreContext);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            alert("Vui lòng đăng nhập để có thể đánh giá sản phẩm.");
            return;
        }

        try {
            // Gửi request tới API để thêm review
            const response = await axios.post(
                '/api/review/add', 
                { foodId, rating, comment },
                { headers: { token } } // Gửi token trong header để xác thực
            );

            if (response.data.success) {
                alert("Cảm ơn bạn đã đánh giá sản phẩm!");
                // Gọi hàm callback từ component cha (FoodDetailModal)
                // để cập nhật lại danh sách review ngay lập tức
                if (onReviewAdded) {
                    onReviewAdded(response.data.review);
                }
                // Reset form
                setComment("");
                setRating(5);
            } else {
                // Hiển thị thông báo lỗi từ server (ví dụ: "Bạn đã đánh giá món này rồi")
                alert(response.data.message);
            }
        } catch (error) {
            alert("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại.");
            console.error("Lỗi khi thêm review:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-review-form">
            <h4>Viết đánh giá của bạn</h4>
            <div className='form-group'>
                <label>Xếp hạng:</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                    <option value={5}>5 - Tuyệt vời</option>
                    <option value={4}>4 - Tốt</option>
                    <option value={3}>3 - Tạm được</option>
                    <option value={2}>2 - Không ngon</option>
                    <option value={1}>1 - Rất tệ</option>
                </select>
            </div>
            <div className='form-group'>
                <label>Nhận xét (không bắt buộc):</label>
                <textarea
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Hãy chia sẻ cảm nhận của bạn về món ăn này..."
                ></textarea>
            </div>
            <button type="submit" className='submit-review-btn'>Gửi đánh giá</button>
        </form>
    );
};

AddReviewForm.propTypes = {
    foodId: PropTypes.string.isRequired,
    onReviewAdded: PropTypes.func
};

export default AddReviewForm;