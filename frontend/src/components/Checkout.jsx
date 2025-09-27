import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [form, setForm] = useState({
    email: "",
    country: "",
    first_name: "",
    last_name: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    payment_method: "cod",
  });
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const shippingFee = 50;
  const navigate = useNavigate();

  // Fetch cart
  useEffect(() => {
    api.get("cart/").then((res) => {
      if (res.data.length > 0) setCart(res.data[0]);
      else alert("Cart is empty");
    });
  }, []);

  if (!cart) return <p>Loading...</p>;

  // Calculate totals
  const subtotal = cart.items.reduce(
    (acc, item) => acc + Number(item.product.price) * Number(item.quantity),
    0
  );
  const total = subtotal - discount + shippingFee;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Apply coupon
  const applyCoupon = () => {
    if (coupon === "SAVE10") setDiscount(100);
    else {
      setDiscount(0);
      alert("Invalid coupon");
    }
  };

  // Place order
  const placeOrder = async () => {
    // Validate required fields
    const requiredFields = [
      "email",
      "country",
      "first_name",
      "last_name",
      "address",
      "city",
      "state",
      "pincode",
      "phone",
      "payment_method",
    ];
    for (let field of requiredFields) {
      if (!form[field]) {
        alert(`Please fill the ${field} field`);
        return;
      }
    }

    if (!cart.items || cart.items.length === 0) {
      alert("Cart is empty");
      return;
    }

    const payload = {
      email: form.email,
      country: form.country,
      first_name: form.first_name,
      last_name: form.last_name,
      address: form.address,
      apartment: form.apartment,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      phone: form.phone,
      payment_method: form.payment_method,
      subtotal: Number(subtotal),
      shipping_fee: Number(shippingFee),
      discount: Number(discount),
      total: Number(total),
      items: cart.items.map((i) => ({
        product: i.product.id,
        quantity: Number(i.quantity),
        price: Number(i.product.price),
      })),
      user: cart.user, // send the actual user ID from cart
    };

    try {
      const res = await api.post("orders/", payload);
      navigate(`/order-complete/${res.data.id}`);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Order failed. Check console for details.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT - Checkout Form */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <input
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            name="country"
            value={form.country}
            placeholder="Country"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="first_name"
            value={form.first_name}
            placeholder="First Name"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="last_name"
            value={form.last_name}
            placeholder="Last Name"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="phone"
            value={form.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <input
          name="address"
          value={form.address}
          placeholder="Address"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="apartment"
          value={form.apartment}
          placeholder="Apartment"
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <div className="grid grid-cols-3 gap-2">
          <input
            name="city"
            value={form.city}
            placeholder="City"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="state"
            value={form.state}
            placeholder="State"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            name="pincode"
            value={form.pincode}
            placeholder="Pincode"
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        {/* Payment */}
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="payment_method"
              value="card"
              checked={form.payment_method === "card"}
              onChange={handleChange}
            />{" "}
            NetBanking / Card
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment_method"
              value="cod"
              checked={form.payment_method === "cod"}
              onChange={handleChange}
            />{" "}
            Cash on Delivery
          </label>
        </div>

        <button
          onClick={placeOrder}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Order Now
        </button>
      </div>

      {/* RIGHT - Order Summary */}
      <div className="bg-[#98FB98] p-6 rounded-lg shadow space-y-4">
        <h2 className="font-bold text-lg">Order Summary</h2>
        {cart.items.map((i) => (
          <div key={i.id} className="flex justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={i.product.image}
                className="w-14 h-14 object-cover rounded"
              />
              <div>
                <p>{i.product.name}</p>
                <p className="text-sm">
                  Qty {i.quantity} × ₹{i.product.price}
                </p>
              </div>
            </div>
            <p>₹ {i.product.price * i.quantity}</p>
          </div>
        ))}

        {/* Coupon */}
        <div className="flex space-x-2">
          <input
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Coupon Code"
            className="border p-2 flex-1 rounded"
          />
          <button
            onClick={applyCoupon}
            className="bg-gray-800 text-white px-4 rounded"
          >
            Apply
          </button>
        </div>

        {/* Totals */}
        <div className="border-t pt-2 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹ {subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹ {shippingFee}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹ {discount}</span>
            </div>
          )}
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹ {total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
