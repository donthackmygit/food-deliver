import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './EditFoodModal.css'; 

const EditFoodModal = ({ url, foodData, onClose }) => {
    const { t } = useTranslation();
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    });
    const [image, setImage] = useState(null); 

    useEffect(() => {
        if (foodData) {
            setData({
                name: foodData.name,
                description: foodData.description,
                price: foodData.price,
                category: foodData.category,
            });
        }
    }, [foodData]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.put(`${url}/api/food/edit/${foodData._id}`, formData);

            if (response.data.success) {
                toast.success(response.data.message);
                onClose(); 
            } else {
                toast.error(t("errorUpdatingFood"));
            }
        } catch (error) {
            console.error("Error updating food:", error);
            toast.error(t("errorUpdatingFood"));
        }
    };

    return (
        <div className="edit-food-modal-overlay">
            <div className="edit-food-modal">
                <form className="flex-col" onSubmit={onSubmitHandler}>
                    <h3>{t("editFoodItem")}</h3>
                    <div className="food-image-upload flex-col">
                        <p>{t("currentImage")}</p>
                        <img src={image ? URL.createObjectURL(image) : `${url}/images/${foodData.image}`} alt="Food Image" />
                        <label htmlFor="image">
                            <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} hidden required={!foodData.image} />
                            <span>{t("changeImage")}</span>
                        </label>
                    </div>
                    <div className="form-group flex-col">
                        <label htmlFor="name">{t("productName")}</label>
                        <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder={t("enterProductName")} required />
                    </div>
                    <div className="form-group flex-col">
                        <label htmlFor="description">{t("productDescription")}</label>
                        <textarea name="description" onChange={onChangeHandler} value={data.description} rows="6" placeholder={t("enterProductDescription")} required></textarea>
                    </div>
                    <div className="form-group flex-col">
                        <label htmlFor="price">{t("productPrice")}</label>
                        <input type="number" name="price" onChange={onChangeHandler} value={data.price} placeholder={t("enterProductPrice")} required />
                    </div>
                    <div className="form-group flex-col">
                        <label htmlFor="category">{t("productCategory")}</label>
                        <select name="category" onChange={onChangeHandler} value={data.category} required>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <button type="submit" className="add-btn">{t("update")}</button>
                    <button type="button" onClick={onClose} className="cancel-btn">{t("cancel")}</button>
                </form>
            </div>
        </div>
    );
};

EditFoodModal.propTypes = {
    url: PropTypes.string.isRequired,
    foodData: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
};

export default EditFoodModal;