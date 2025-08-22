import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {
    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])

    const fetchOrders = async () => {
        // Thêm try-catch để xử lý lỗi khi gọi API
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
            setData(response.data.data)
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            // Có thể thêm thông báo lỗi cho người dùng ở đây
        }
    }

    useEffect(() => {
        if (token) {
            fetchOrders()
        }
    })

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order) => {
                    return (
                        // SỬA LỖI Ở ĐÂY:
                        // 1. Dùng React.Fragment thay vì <>
                        // 2. Chuyển key lên React.Fragment và dùng order._id (giả sử mỗi order có _id)
                        <React.Fragment key={order._id}> 
                            <div className="my-orders-order">
                                <img src={assets.parcel_icon} alt='' />
                                
                                {/* Cải thiện cách hiển thị danh sách sản phẩm */}
                                <p>{order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}</p>
                                
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>●</span> <b>{order.status}</b></p>
                                <button>Track Order</button>
                            </div>
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders