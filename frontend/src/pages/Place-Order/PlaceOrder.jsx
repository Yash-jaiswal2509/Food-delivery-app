import React, { useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

    const navigate = useNavigate();
    const { getTotalCartValue, token, food_list, cartItems, url } = React.useContext(StoreContext);

    const [data, setData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        phoneNumber: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData({ ...data, [name]: value });
    }

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
            amount: 2 + getTotalCartValue()
        }

        //axios wasn't working...
        try {
            const response = await fetch(`${url}/api/order/place-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (result.success) {
                const { session_url } = result;
                window.location.replace(session_url);
            } else {
                alert(result.message);
            }


            //******this doesn't works beacuse now response is a promise and it needs to be handled that way only*******

            /* .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
            
            console.log(response)
          if (response.data.success) {
              const { session_url } = response.data;
              window.location.replace(session_url);
          }
          else {
              alert(response.data.message);
          } */
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate("/cart")
        }
        else if (getTotalCartValue() === 0) {
            alert("Cart is empty")
            navigate("/");
        }
    }, [token])

    return (
        <form className='place-order' onSubmit={placeOrder}>
            <div className='place-order-left'>
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input required type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' />
                    <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' />
                </div>
                <input required type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' />
                <input required type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' />
                <div className='multi-fields'>
                    <input required type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' />
                    <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' />
                </div>
                <div className='multi-fields'>
                    <input required type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' />
                    <input required type="text" name='zipCode' onChange={onChangeHandler} value={data.zipCode} placeholder='Zip Code' />
                </div>
                <input required type="text" name='phoneNumber' onChange={onChangeHandler} value={data.phoneNumber} placeholder='Phone number' />
            </div>
            <div className='place-order-right'>
                <div className='cart-total'>
                    <h2>Cart Total</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p><span>&#8377;</span> {getTotalCartValue()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p><span>&#8377;</span> {2}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b><span>&#8377;</span> {2 + getTotalCartValue()}</b>
                        </div>
                    </div>
                    <button type='submit'>Proceed to payment</button>
                </div>
            </div>
        </form >
    )
}

export default PlaceOrder