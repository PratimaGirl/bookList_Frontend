import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCartItem } from '../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';

export default function SuccessPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.userId);
  useEffect(() => {
    const orderData = JSON.parse(sessionStorage.getItem('orderData'));

    const createOrder = async () => {
      if (!orderData) {
        console.error("Order data not found.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/api/order", orderData);
        console.log("Order created successfully:", response.data);

        sessionStorage.removeItem('orderData');
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };

    createOrder();
    if (userId) {
      dispatch(clearCartItem(userId));
    }
  }, [dispatch, userId]);

  const handleGoToCart = () => {
    navigate('/myorder');
  };

  return (
    <div className="success-page" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <img 
        src="https://craftizen.org/wp-content/uploads/2019/02/successful_payment_388054.png"
        alt="Success"
        style={{ width: '500px', margin: '20px 0', height: '500px' }}
      />
      <p>You will receive a confirmation email with the order details.</p>
      <button onClick={handleGoToCart} className="btn btn-primary mt-3">
        Go to Orders!
      </button>
    </div>
  );
}
