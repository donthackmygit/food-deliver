import React, { useEffect, useState } from "react";
import './Orders.css';
import axios from "axios";
import { toast } from 'react-toastify';
import { assets } from "../../assets/assets";
import { useTranslation } from "react-i18next";

const Orders = ({ url }) => {
    const { t } = useTranslation();
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("All");

    const fetchAllOrders = async () => {
        const response = await axios.get(url + "/api/order/list");
        if (response.data.success) {
            setOrders(response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date))); // Sắp xếp cho đơn hàng mới nhất lên đầu
        } else {
            toast.error(t("error"));
        }
    };

    const statusHandler = async (event, orderId) => {
        const response = await axios.post(url + "/api/order/status", {
            orderId,
            status: event.target.value
        });
        if (response.data.success) {
            await fetchAllOrders();
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const filteredOrders = orders.filter(order => {
        if (filter === "All") return true;
        return order.status === filter;
    });

    return (
        <div className='order add'>
            <div className="order-header">
                <h3>{t("orderPage")}</h3>
                <select onChange={(e) => setFilter(e.target.value)} value={filter} className="filter-select">
                    <option value="All">{t("filterAll")}</option>
                    {/* --- THÊM TRẠNG THÁI MỚI VÀO BỘ LỌC --- */}
                    <option value="Scheduled">Scheduled</option>
                    <option value="Food Processing">{t("statusProcessing")}</option>
                    <option value="Out for delivery">{t("statusOutForDelivery")}</option>
                    <option value="Delivered">{t("statusDelivered")}</option>
                </select>
            </div>
            <div className='order-list'>
                {filteredOrders.map((order, index) => (
                    <div key={index} className={`order-item ${order.isScheduled && order.status === 'Scheduled' ? 'scheduled-order-item' : ''}`}>
                        <img src={assets.parcel_icon} alt='' />
                        <div>
                            <p className="order-item-food">{/* ... mapping items ... */}</p>
                            <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                            <div className="order-item-address">{/* ... address info ... */}</div>
                            <p className="order-item-phone">{order.address.phone}</p>

                            {/* --- HIỂN THỊ THÔNG TIN HẸN GIỜ --- */}
                            {order.isScheduled && (
                                <div className='scheduled-info'>
                                    <p><b>Scheduled for:</b> {new Date(order.scheduledDeliveryTime).toLocaleString()}</p>
                                </div>
                            )}
                        </div>
                        <p>{t("itemsLabel")}: {order.items.length}</p>
                        <p>${order.amount}</p>
                        <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                            {/* --- THÊM TRẠNG THÁI MỚI VÀO DROPDOWN CẬP NHẬT --- */}
                            <option value="Scheduled">Scheduled</option>
                            <option value="Food Processing">{t("statusProcessing")}</option>
                            <option value="Out for delivery">{t("statusOutForDelivery")}</option>
                            <option value="Delivered">{t("statusDelivered")}</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Orders