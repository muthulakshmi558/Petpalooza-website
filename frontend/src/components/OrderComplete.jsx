import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

const OrderComplete = () => {
  const { id } = useParams(); // order id from URL
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`orders/${id}/`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return <p className="text-center">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#98FB98] p-8 rounded-lg shadow max-w-lg w-full text-center space-y-4">
        <h1 className="text-2xl font-bold">🎉 Thank you for your order!</h1>
        <p>
          Your order will be processed within <b>24 hours</b> during working
          days. We will notify your email: <b>{order.email}</b>
        </p>

        {/* Billing Address */}
        <div className="bg-white p-4 rounded shadow text-left">
          <h2 className="font-semibold mb-2">Billing Address</h2>
          <p>{order.first_name} {order.last_name}</p>
          <p>{order.address}</p>
          {order.apartment && <p>{order.apartment}</p>}
          <p>{order.city}, {order.state} - {order.pincode}</p>
          <p>{order.country}</p>
          <p>📞 {order.phone}</p>
        </div>

        {/* Order Summary */}
        <div className="text-left">
          <h2 className="font-semibold mt-4">Order Summary</h2>
          {order.items.map((item) => (
            <p key={item.id}>
              {item.product} × {item.quantity} = ₹ {item.price * item.quantity}
            </p>
          ))}
          <p className="font-bold mt-2">Total: ₹ {order.total}</p>
        </div>

        {/* Continue Shopping Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderComplete;
