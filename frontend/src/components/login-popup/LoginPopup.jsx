import React from 'react'
import "./LoginPopup.css";
import { useState } from 'react';
import { assets } from '../../assets/frontend_assets/assets';

const LoginPopup = ({ setShowLogin }) => {

    const [currentState, setCurrentState] = useState("Sign Up")

    return (
        <div className='login-popup'>
            <form className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className='login-popup-inputs'>
                    {currentState === "Sign Up" ? <input type="text" placeholder='Enter your name...' /> : <></>}
                    <input type="email" placeholder='Enter your email...' />
                    <input type="password" placeholder='Enter your passwrod...' />
                </div>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing I agree to the terms of conditions & privacy policy</p>
                </div>
                <button>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
                {currentState === "Sign Up"
                    ? <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                    : <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Register here</span></p>}
            </form>
        </div>
    )
}

export default LoginPopup