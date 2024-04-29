import React from 'react'
import "./LoginPopup.css";
import { useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {

    const { url } = useContext(StoreContext)
    const [currentState, setCurrentState] = useState("Sign In")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if (currentState === "Sign Up") {
            newUrl += "api/user/register"
        } else {
            newUrl += "api/user/login"
        }

        const response = await axios.post(newUrl, data);
        if(response.data.success){
            
        }
    }



    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={onLogin}>
                <div className='login-popup-title'>
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className='login-popup-inputs'>
                    {currentState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter your name...' /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter your email...' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter your passwrod...' />
                </div>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing I agree to the terms of conditions & privacy policy</p>
                </div>
                <button type='submit'>{currentState === "Sign Up" ? "Create Account" : "Sign In"}</button>
                {currentState === "Sign Up"
                    ? <p>Already have an account? <span onClick={() => setCurrentState("Sign In")}>Sign-In here</span></p>
                    : <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Register here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup