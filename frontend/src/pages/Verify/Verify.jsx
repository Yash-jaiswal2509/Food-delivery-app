import React, { useEffect, useContext, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';

const Verify = () => {
    const { url } = useContext(StoreContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const verifyPayment = useCallback(async () => {
        try {
            const response = await axios.post(`${url}/api/order/verify-order`, { success, orderId });
            if (response.data.success) {
                if (window.location.pathname !== "/my-orders") {
                    navigate("/my-orders");
                }
            } else {
                if (window.location.pathname !== "/") {
                    navigate("/");
                }
            }
        } catch (error) {
            console.error('Failed to verify order:', error);
        }
    }, [url, success, orderId, navigate]);

    useEffect(() => {
        if (success !== null && orderId !== null) {
            verifyPayment();
        }
    }, [success, orderId, verifyPayment]);

    return (
        <div className='verify'>
            <div className='spinner'></div>
        </div>
    );
};

export default Verify;
