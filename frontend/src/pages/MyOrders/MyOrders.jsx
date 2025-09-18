import React, { useState, useEffect, useContext } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useTranslation } from 'react-i18next';

const MyOrders = () => {
    const { url, token } = useContext(StoreContext);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); 
    const { t } = useTranslation();

    const fetchOrders = async () => {
        if (!token) {
            console.log("Token not available, cannot fetch orders.");
            return;
        }
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            const sortedOrders = response.data.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            setOrders(sortedOrders);
            console.log(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleBackToList = () => {
        setSelectedOrder(null);
    };

    return (
        <div className='my-orders'>
            <h2>{t("My Orders")}</h2>
            {!selectedOrder ? ( // Hiển thị danh sách đơn hàng nếu không có đơn hàng nào được chọn
                <div className="container">
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <div key={index} className="my-orders-order">
                                <img src={assets.parcel_icon} alt="" />
                                <p>
                                    {order.items.map((item, itemIndex) => {
                                        if (itemIndex === order.items.length - 1) {
                                            return item.name + " x " + item.quantity;
                                        } else {
                                            return item.name + " x " + item.quantity + ", ";
                                        }
                                    })}
                                </p>
                                <p>${order.amount}.00</p>
                                <p>{t("Items")}: {order.items.length}</p>
                                <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                                {/* Chỉ hiển thị nút "Track Order" cho các đơn hàng đang hoạt động */}
                                {order.status === "Food Processing" || order.status === "Out for Delivery" ? (
                                    <button>{t("trackOrder")}</button>
                                ) : (
                                    <button onClick={() => handleViewDetails(order)}>{t("View Order Details")}</button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="no-orders">{t("No orders found.")}</p>
                    )}
                </div>
            ) : ( // Hiển thị chi tiết đơn hàng nếu có đơn hàng được chọn
                <div className="order-details">
                    <button onClick={handleBackToList} className="back-button">{t("Back to Orders")}</button>
                    <h3>{t("Order Details")} # {selectedOrder._id}</h3>
                    <p><strong>{t("Order Date")}:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                    <p><strong>{t("Status")}:</strong> {selectedOrder.status}</p>
                    <p><strong>{t("Total Amount")}:</strong> ${selectedOrder.amount}.00</p>
                    <h4>{t("Items")}:</h4>
                    <ul>
                        {selectedOrder.items.map((item, index) => (
                            <li key={index}>
                                {item.name} x {item.quantity} - ${item.price * item.quantity}.00
                            </li>
                        ))}
                    </ul>
                    <h4>{t("Delivery Information")}:</h4>
                    <p><strong>{t("Name")}:</strong> {selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                    <p><strong>{t("Email")}:</strong> {selectedOrder.address.email}</p>
                    <p><strong>{t("Street")}:</strong> {selectedOrder.address.street}</p>
                    <p><strong>{t("City")}:</strong> {selectedOrder.address.city}</p>
                    <p><strong>{t("State")}:</strong> {selectedOrder.address.state}</p>
                    <p><strong>{t("Zip Code")}:</strong> {selectedOrder.address.zipCode}</p>
                    <p><strong>{t("Country")}:</strong> {selectedOrder.address.country}</p>
                    <p><strong>{t("Phone")}:</strong> {selectedOrder.address.phone}</p>
                </div>
            )}
        </div>
    );
};

export default MyOrders;