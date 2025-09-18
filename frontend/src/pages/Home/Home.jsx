import React, { useState } from 'react'
import './Home.css'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu.jsx'
import Header from '../../components/Header/Header.jsx'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'
import AppDownload from '../../components/AppDownload/AddDownload.jsx'
import RecommendedFood from '../../components/RecommendedFood/RecommendedFood'
const Home = () => {
    const [category,setCategory] = useState("All");
    return (
        <div>
            <Header/>
            <ExploreMenu category={category} setCategory={setCategory}/>
            <RecommendedFood/>
            <FoodDisplay category={category}/>
            <AppDownload/>
        </div>
    )
}
export default Home