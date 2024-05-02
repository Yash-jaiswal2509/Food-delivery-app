import React, { useEffect, useContext, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";

const Verify = () => {
    const { url } = useContext(StoreContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const verifyPayment = useCallback(async () => {
        try {
            const response = await fetch(`${url}/api/order/verify-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ success, orderId })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.success) {
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
            if (window.location.pathname !== "/error") {
                navigate("/error");
            }
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
