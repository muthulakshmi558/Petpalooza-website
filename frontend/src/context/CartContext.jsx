import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setCartCount(0);

    try {
      const res = await api.get("/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const items = res.data[0]?.items || [];
      const total = items.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(total);
    } catch (err) {
      setCartCount(0);
    }
  };

  const addToCart = async (productId, qty = 1) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login required");

    await api.post(
      "/cart-items/",
      { product_id: productId, quantity: qty },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchCartCount();
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
