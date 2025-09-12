import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { useTranslation } from 'react-i18next'

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const { t } = useTranslation();
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]); // Thêm token vào dependency array

    return (
        <div className='my-orders'>
            <h2>{t("myOrders")}</h2>
            <div className="container">
                {data.map((order) => {
                    return (
                        <div className="my-orders-order" key={order._id}>
                            <img src={assets.parcel_icon} alt='' />
                            <p>{order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>●</span> <b>{order.status}</b></p>
                            <button>{t("trackOrder")}</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders;