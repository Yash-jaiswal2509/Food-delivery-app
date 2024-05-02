import React from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const handleOnclick = () => {
        window.location.href = '#explore-menu'
    }
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order your favourite here</h2>
                <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingrdients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
                <button onClick={handleOnclick}>View menu</button>
            </div>
        </div>
    )
}

export default Header