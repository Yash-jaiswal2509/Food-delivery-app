import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={assets.footerLogo} className='footer-logo' alt="" />
                    <p><b>Khana on Wheels</b> brings you the finest flavors of Indian cuisine, delivered right to your doorstep. From fresh salads to delecious deserts, we’re here to satisfy your cravings. Order now and experience the joy of delicious food on wheels!</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Dleivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+85-832-83-823-324</li>
                        <li>contact@https://khana-on-wheels-food-delivery.vercel.app/</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright 2024 <span>&copy;</span> #ef9215.com - All Rights Reserved</p>
        </div>
    )
}

export default Footer