import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [data, setData] = useState({
        firstName: "", lastName: "", email: "", street: "",
        city: "", state: "", zipCode: "", country: "", phone: ""
    });

    const [deliveryOption, setDeliveryOption] = useState('now');
    const [scheduledTime, setScheduledTime] = useState(new Date(Date.now() + 60 * 60 * 1000));
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (token) {
                try {
                    const response = await axios.get(url + "/api/user/profile", { headers: { token } });
                    if (response.data.success) {
                        setData(prevData => ({
                            ...prevData,
                            email: response.data.userData.email
                        }));
                    }
                } catch (error) {
                    console.error("Failed to fetch user profile", error);
                }
            }
        };
        fetchUserProfile();
    }, [token, url]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2),
            isScheduled: deliveryOption === 'schedule',
            scheduledDeliveryTime: deliveryOption === 'schedule' ? scheduledTime : null
        };

        try {
            let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
            if (response.data.success) {
                const { session_url } = response.data;
                window.location.replace(session_url);
            } else {
                alert("Error placing order: " + response.data.message);
            }
        } catch (error) {
            console.error("Error during place order request:", error);
            alert("An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        if (!token || getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token, getTotalCartAmount, navigate]);

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">{t("Delivery Information")}</p>
                <div className="multi-fields">
                    <input name='firstName' required onChange={onChangeHandler} value={data.firstName} type="text" placeholder={t('First Name')} />
                    <input name='lastName' required onChange={onChangeHandler} value={data.lastName} type="text" placeholder={t('Last Name')} />
                </div>

                {/* --- THAY ĐỔI: Thêm thuộc tính 'disabled' vào ô email --- */}
                <input name='email' required type="email" value={data.email} placeholder={t('Email address')} disabled />
                
                <input name='street' required onChange={onChangeHandler} value={data.street} type="text" placeholder={t('Street')} />
                <div className="multi-fields">
                    <input name='city' required onChange={onChangeHandler} value={data.city} type="text" placeholder={t('City')} />
                    <input name='state' required onChange={onChangeHandler} value={data.state} type="text" placeholder={t('State')} />
                </div>
                <div className="multi-fields">
                    <input name='zipCode' required onChange={onChangeHandler} value={data.zipCode} type="text" placeholder={t('Zip code')} />
                    <input name='country' required onChange={onChangeHandler} value={data.country} type="text" placeholder={t('Country')} />
                </div>
                <input name='phone' required onChange={onChangeHandler} value={data.phone} type="text" placeholder={t('Phone')} />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>{t("Cart Totals")}</h2>
                    <div>
                        <div className="cart-total-details"><p>{t("Subtotal")}</p><p>${getTotalCartAmount()}</p></div><hr />
                        <div className="cart-total-details"><p>{t("Delivery Fee")}</p><p>${getTotalCartAmount() === 0 ? 0 : 2}</p></div><hr />
                        <div className="cart-total-details"><b>{t("Total")}</b><b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b></div>
                    </div>
                </div>
                <div className="delivery-options">
                    <h2>{t("Delivery Options")}</h2>
                    <div className="delivery-option">
                        <input type="radio" id="now" name="delivery" value="now" checked={deliveryOption === 'now'} onChange={() => setDeliveryOption('now')} />
                        <label htmlFor="now">{t("Deliver Now")}</label>
                    </div>
                    <div className="delivery-option">
                        <input type="radio" id="schedule" name="delivery" value="schedule" checked={deliveryOption === 'schedule'} onChange={() => setDeliveryOption('schedule')} />
                        <label htmlFor="schedule">{t("Schedule for Later")}</label>
                    </div>
                    {deliveryOption === 'schedule' && (
                        <div className="date-picker-wrapper">
                            <DatePicker
                                selected={scheduledTime}
                                onChange={(date) => setScheduledTime(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate={new Date()}
                            />
                        </div>
                    )}
                </div>
                <button type='submit' className='place-order-submit'>{t("PROCEED TO PAYMENT")}</button>
            </div>
        </form>
    )
}

export default PlaceOrder;