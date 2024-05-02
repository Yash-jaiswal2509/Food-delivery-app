import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null)

const StoreContextProvider = ({ children }) => {

    const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([]);
    const [loading, setLoading] = useState(false);

    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            //here headers is used to authenticate the user not to allow any other user to add items to cart
            //item id is for the food to be added to cart
            axios.post(`${url}/api/cart/add-to-cart`, { itemId: itemId }, { headers: { token } })
        }
    }
    //[itemId]: prev[itemId] this gives the value of cart item id
    const removeCartItem = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            axios.post(`${url}/api/cart/remove-from-cart`, { itemId: itemId }, { headers: { token } })
        }
    }

    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/get-cart`, {}, { headers: { token } });
        setCartItems(response.data.cartData);
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

    const fetchFoodList = async () => {
        setLoading(true);
        const response = await axios.get(`${url}/api/food/list-food`);
        setFoodList(response.data.data);
        setLoading(false);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    }, [])

    const contextValue = {
        // Add your global state variables and functions here
        food_list,
        loading,
        cartItems,
        setCartItems,
        addToCart,
        removeCartItem,
        getTotalCartValue,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider