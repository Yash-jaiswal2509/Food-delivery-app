import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/admin_assets/assets.js'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className='navbar'>
            <img onClick={() => navigate("/")} src={assets.logo} className='logo' alt="" />
            <img src={assets.profile_image} className='profile' alt="" />
        </div>
    )
}

export default Navbar