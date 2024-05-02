import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../Food-items/FoodItem'


const FoodDisplay = ({ category }) => {

    const { food_list, loading } = useContext(StoreContext)

    if (loading) {
        return (
            <div className='food-display' id='food-display'>
                <h2>Top dishes for you</h2>
                <div className='food-display-list'>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                        <div key={index} className='skeleton'>  
                            <div className='skeleton-image'></div>
                            <div className='skeleton-text'></div>
                            <div className='skeleton-description'></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes for you</h2>
            <div className='food-display-list'>
                {food_list.map((item, index) => {
                    if (category === "All" || category === item.category) {
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay
