import { useState, useEffect } from "react";
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const List = ({ url }) => {
    const { t } = useTranslation();
    const [list, setList] = useState([]);

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
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message);
        } else {
            toast.error(t("errorRemovingFood"));
        }
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
                    <b>{t("action")}</b>
                </div>
                {list.map((item) => (
                    <div key={item._id} className="list-table-format">
                        <img src={`${url}/images/` + item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>${item.price}</p>
                        <p onClick={() => removeFood(item._id)} className="cursor">X</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

List.propTypes = {
    url: PropTypes.string.isRequired
};

export default List;