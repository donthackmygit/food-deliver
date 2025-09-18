import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();
    const { t } = useTranslation();
    if (!cartItems) {
        return null; 
    }

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>{t("Items")}</p>
                    <p>{t("Title")}</p>
                    <p>{t("Price")}</p>
                    <p>{t("Quantity")}</p>
                    <p>{t("Total")}</p>
                    <p>{t("Remove")}</p>
                </div>
                <br />
                <hr />
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <React.Fragment key={item._id}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
                                </div>
                                <hr />
                            </React.Fragment>
                        )
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>{t("Cart Totals")}</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>{t("Subtotal")}</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>{t("Delivery Fee")}</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>{t("Total")}</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>{t("PROCEED TO CHECKOUT")}</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>{t("If you have a promo code, Enter it here")}</p>
                        <div className="cart-promocode-input">
                            <input type='text' placeholder={t("Promo code")} />
                            <button>{t("Submit")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart