import { useState, useEffect } from "react";
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import EditFoodModal from './EditFoodModal/EditFoodModal.jsx'; 

const List = ({ url }) => {
    const { t } = useTranslation();
    const [list, setList] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingFood, setEditingFood] = useState(null); // Lưu trữ món ăn đang chỉnh sửa

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        if (response.data.success) {
            setList(response.data.data);
        } else {
            toast.error(t("errorFetchingList"));
        }
    };

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
        await fetchList(); // Làm mới danh sách sau khi xóa
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error(t("errorRemovingFood"));
        }
    };

    // Hàm xử lý khi nhấp vào nút "Edit"
    const handleEdit = (item) => {
        setEditingFood(item);
        setShowEditModal(true);
    };

    // Hàm xử lý khi modal đóng hoặc cập nhật thành công
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditingFood(null);
        fetchList(); // Làm mới danh sách sau khi chỉnh sửa
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className='list-add flex-col'>
            <p>{t("allFoodList")}</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>{t("image")}</b>
                    <b>{t("name")}</b>
                    <b>{t("category")}</b>
                    <b>{t("price")}</b>
                    <b>{t("action")}</b> {/* Cột cho Remove và Edit */}
                </div>
                {list.map((item) => (
                    <div key={item._id} className="list-table-format">
                        <img src={`${url}/images/` + item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <div className="list-action-buttons"> 
                            <p onClick={() => handleEdit(item)} className="cursor action-btn edit-btn">{t("edit")}</p>
                            <p onClick={() => removeFood(item._id)} className="cursor remove-button">X</p> 
                        </div>
                    </div>
                ))}
            </div>
            {showEditModal && (
                <EditFoodModal
                    url={url}
                    foodData={editingFood}
                    onClose={handleCloseEditModal}
                />
            )}
        </div>
    );
};

List.propTypes = {
    url: PropTypes.string.isRequired
};

export default List;