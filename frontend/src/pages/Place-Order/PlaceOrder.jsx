import React from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

    const { getTotalCartValue } = React.useContext(StoreContext);

    return (
        <form className='place-order'>
            <div className='place-order-left'>
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input type="text" placeholder='First name' />
                    <input type="text" placeholder='Last name' />
                </div>
                <input type="email" placeholder='Email address' />
                <input type="text" placeholder='Street' />
                <div className='multi-fields'>
                    <input type="text" placeholder='Country' />
                    <input type="text" placeholder='State' />
                </div>
                <div className='multi-fields'>
                    <input type="text" placeholder='City' />
                    <input type="text" placeholder='Zip Code' />
                </div>
                <input type="text" placeholder='Phone number' />
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
                    <button>Proceed to payment</button>
                </div>
            </div>
        </form >
    )
}

export default PlaceOrder