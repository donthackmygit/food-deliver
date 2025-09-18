import React, { useContext, useEffect, useState } from 'react';
import './RecommendedFood.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import FoodItem from '../FoodItem/FoodItem';
import { useTranslation } from 'react-i18next';

const RecommendedFood = () => {
    const { url, token } = useContext(StoreContext);
    const [recommendations, setRecommendations] = useState([]);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (token) {
                try {
                    const response = await axios.get(url + "/api/food/recommendations", { headers: { token } });
                    if (response.data.success) {
                        setRecommendations(response.data.data);
                    }
                } catch (error) {
                    console.error("Failed to fetch recommendations", error);
                }
            }
        };

        fetchRecommendations();
    }, [token, url]);

    if (!token || recommendations.length === 0) {
        return null;
    }

    return (
        <div className='recommended-food'>
            <h2>{t("recommendationsForYou")}</h2>
            <div className="recommended-food-list">
                {recommendations.map((item) => (
                    <FoodItem key={item._id} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image} />
                ))}
            </div>
        </div>
    );
};

export default RecommendedFood;