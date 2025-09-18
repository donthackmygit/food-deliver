import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FoodDetailModal.css';
import AddReviewForm from '../AddReviewForm/AddReviewForm'; 
const FoodDetailModal = ({ foodId, onClose }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/review/${foodId}`);
                if (response.data.success) {
                    setReviews(response.data.data);
                }
            } catch (error) {
                console.error("Lỗi khi tải đánh giá:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, [foodId]);

    // Hàm này sẽ được gọi từ AddReviewForm sau khi thêm review thành công
    const handleReviewAdded = (newReview) => {
        setReviews([newReview, ...reviews]); // Thêm review mới vào đầu danh sách
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onClose}>X</button>
                <h2>Đánh giá sản phẩm</h2>
                <hr />
                {/* Phần Form thêm review */}
                <AddReviewForm foodId={foodId} onReviewAdded={handleReviewAdded} />
                <hr />
                {/* Phần hiển thị danh sách review */}
                <div className="reviews-list">
                    {loading ? <p>Đang tải đánh giá...</p> : (
                        reviews.length > 0 ? (
                            reviews.map(review => (
                                <div key={review._id} className="review-item">
                                    <strong>{review.username}</strong> - <span>{'⭐'.repeat(review.rating)}</span>
                                    <p>{review.comment}</p>
                                    <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                                </div>
                            ))
                        ) : <p>Chưa có đánh giá nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodDetailModal;