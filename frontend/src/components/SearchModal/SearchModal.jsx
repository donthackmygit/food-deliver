// frontend/src/components/SearchModal/SearchModal.jsx
import React from 'react';
import './SearchModal.css';
import FoodItem from '../FoodItem/FoodItem';
import { useTranslation } from 'react-i18next'; // <-- Import useTranslation

const SearchModal = ({ isOpen, onClose, searchResults }) => {
    const { t } = useTranslation(); // <-- Khởi tạo useTranslation

    if (!isOpen) {
        return null;
    }

    return (
        <div className="search-modal-overlay" onClick={onClose}>
            <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="search-modal-header">
                    <h2>{t("Search Results")}</h2> {/* Dịch tiêu đề */}
                    <button onClick={onClose} className="close-button">&times;</button>
                </div>
                <div className="search-results-list">
                    {searchResults && searchResults.length > 0 ? (
                        searchResults.map((item, index) => (
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                            />
                        ))
                    ) : (
                        <p className="no-results">{t("No food items found matching your search.")}</p> // Dịch thông báo không tìm thấy
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;