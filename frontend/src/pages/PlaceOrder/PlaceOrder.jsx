import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const { t } = useTranslation();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert("Error");
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token, getTotalCartAmount, navigate]); // Thêm dependencies

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">{t("deliveryInformation")}</p>
                <div className="multi-fields">
                    <input name='firstName' required onChange={onChangeHandler} value={data.firstName} type="text" placeholder={t('firstName')} />
                    <input name='lastName' required onChange={onChangeHandler} value={data.lastName} type="text" placeholder={t('lastName')} />
                </div>
                <input name='email' required onChange={onChangeHandler} value={data.email} type="email" placeholder={t('emailAddress')} />
                <input name='street' required onChange={onChangeHandler} value={data.street} type="text" placeholder={t('street')} />
                <div className="multi-fields">
                    <input name='city' required onChange={onChangeHandler} value={data.city} type="text" placeholder={t('city')} />
                    <input name='state' required onChange={onChangeHandler} value={data.state} type="text" placeholder={t('state')} />
                </div>
                <div className="multi-fields">
                    <input name='zipcode' required onChange={onChangeHandler} value={data.zipcode} type="text" placeholder={t('zipCode')} />
                    <input name='country' required onChange={onChangeHandler} value={data.country} type="text" placeholder={t('country')} />
                </div>
                <input name='phone' required onChange={onChangeHandler} value={data.phone} type="text" placeholder={t('phone')} />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>{t("cartTotals")}</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>{t("subtotal")}</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <div className="cart-total-details">
                            <p>{t("deliveryFee")}</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <div className="cart-total-details">
                            <b>{t("total")}</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>{t("proceedToPayment")}</button>
                </div>
            </div>
        </form>
    )
}
export default PlaceOrder;