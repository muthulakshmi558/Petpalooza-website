import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const LoginRegister = () => {
  const { login } = useAuth();
  const { fetchCartCount } = useCart();
  const [isLogin, setIsLogin] = useState(true);
  const [apiErrors, setApiErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setApiErrors({});
    reset();
  };

  const togglePassword = () => setShowPassword(!showPassword);

  const mergeTempCart = async (token) => {
    const tempCart = JSON.parse(localStorage.getItem("temp_cart")) || [];
    if (tempCart.length > 0) {
      for (let item of tempCart) {
        try {
          await api.post("/cart/", item, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (err) {
          console.log("Failed to merge cart item:", item);
        }
      }
      localStorage.removeItem("temp_cart");
      fetchCartCount(); // update navbar after merge
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setApiErrors({});
    try {
      if (isLogin) {
        const res = await api.post("/token/", data);
        login(res.data.access);           // ✅ update AuthContext
        await mergeTempCart(res.data.access); // ✅ merge temporary cart
        reset();
        alert("Login Successful!");
      } else {
        await api.post("/users/", data);
        alert("Registration Successful! Please login.");
        setIsLogin(true);
        reset();
      }
    } catch (err) {
      if (err.response?.data) {
        setApiErrors(err.response.data);
      } else {
        setApiErrors({ non_field_errors: ["Something went wrong"] });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="Enter username"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            {apiErrors.username && (
              <p className="text-red-600 mt-1">{apiErrors.username[0]}</p>
            )}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {apiErrors.email && (
            <p className="text-red-600 mt-1">{apiErrors.email[0]}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Enter password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            disabled={loading}
          />
          <span
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
            onClick={togglePassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {apiErrors.password && (
            <p className="text-red-600 mt-1">{apiErrors.password[0]}</p>
          )}
        </div>

        {apiErrors.non_field_errors && (
          <p className="text-red-600 mb-4 text-center">
            {apiErrors.non_field_errors[0]}
          </p>
        )}

        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 transition-colors"
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : isLogin ? "Login" : "Register"}
        </button>

        {isLogin && (
          <p className="mt-4 text-center text-gray-600">
            <a href="/forgot" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </p>
        )}

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-600 hover:underline font-semibold"
            disabled={loading}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginRegister;
