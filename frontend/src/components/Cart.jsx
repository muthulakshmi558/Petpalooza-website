import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // 👈 import

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchCartCount } = useCart();
  const navigate = useNavigate(); // 👈 hook

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("cart/");
      setCart(res.data[0]);
      fetchCartCount();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      await api.patch(`cart-items/${itemId}/`, { quantity });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      await api.delete(`cart-items/${itemId}/`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  if (!cart || cart.items.length === 0)
    return <p className="text-center">Your cart is empty.</p>;

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg p-4 shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">₹ {item.product.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      className="px-2 border"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      className="px-2 border"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-semibold">
                  ₹ {item.product.price * item.quantity}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="border rounded-lg p-6 shadow space-y-4">
          <h2 className="text-lg font-bold">Cart Total</h2>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹ {subtotal}</span>
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4"
            onClick={() => navigate("/checkout")} // ✅ navigate to checkout
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
