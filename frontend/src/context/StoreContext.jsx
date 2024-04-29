import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";

export const StoreContext = createContext(null)



const StoreContextProvider = ({ children }) => {

    const url = "http://localhost:4000"
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState("")

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }
    //[itemId]: prev[itemId] this gives the value of cart item id
    const removeCartItem = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getTotalCartValue = () => {

        let total = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                total += itemInfo.price * cartItems[item];
            }
        }
        return total;
    }

    const contextValue = {
        // Add your global state variables and functions here
        food_list: food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeCartItem,
        getTotalCartValue,
        url
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider