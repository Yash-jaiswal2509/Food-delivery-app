import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { assets } from "../../assets/frontend_assets/assets.js"
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {
    const navigate = useNavigate()
    const [menu, setMenu] = useState("home");
    const { getTotalCartValue, token, setToken } = React.useContext(StoreContext);
    const logout = () => {
        setToken("");
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className='navbar'>
            <Link to={"/"} className='navbar-left'>
                <img src={assets.thumbnail} className='thumbnail' alt="" />
                <img src={assets.logo} alt="" className='logo' />
            </Link>
            <ul className='navbar-menu'>
                <Link to={"/"} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className='navbar-right'>
                <img src={assets.search_icon} alt="" />
                <div className='navbar-search-icon'>
                    <Link to={"/cart"}><img src={assets.basket_icon} alt="" /></Link>

                    <div className={getTotalCartValue() === 0 ? "" : "dot"}></div>
                </div>
                {!token
                    ? <button onClick={() => setShowLogin(true)}>Sign-In</button>
                    : <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <ul className='navbar-profile-dropdown'>
                            <li onClick={() => navigate("/my-orders")}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    )
}

export default Navbar