import { useContext } from "react";
import './FoodDisplay.css'
import PropTypes from 'prop-types'
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { useTranslation } from "react-i18next";

const FoodDisplay = ({category}) => {
    const { food_list } = useContext(StoreContext);
    const { t } = useTranslation();

    return (
        <div className="food-display" id="food-display">
            <h2>{t("topDishesNearYou")}</h2>
            <div className="food-display-list">
                {food_list.map((item,index)=>{
                    if(category==="All" || category===item.category){
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                    }
                })}
            </div>
        </div>
    )
}

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired 
};

export default FoodDisplay;