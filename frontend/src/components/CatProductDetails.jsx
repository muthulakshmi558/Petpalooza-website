import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const CatProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [qty, setQty] = useState(1);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  });
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get(`catproducts/${id}/`).then((res) => {
      setProduct(res.data);
      const imgs = [res.data.image, ...(res.data.extra_images || [])];
      setMainImage(imgs[0]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const changeQty = (delta) => {
    setQty((prev) => Math.max(1, prev + delta));
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      const tempCart = JSON.parse(localStorage.getItem("temp_cart")) || [];
      const idx = tempCart.findIndex((i) => i.product_id === product.id);
      if (idx !== -1) tempCart[idx].qty += qty;
      else tempCart.push({ product_id: product.id, qty });
      localStorage.setItem("temp_cart", JSON.stringify(tempCart));
      alert("Added to cart (Login required)");
      return;
    }
    await addToCart(product.id, qty);
    alert("Added to cart!");
  };

  const handleBuyNow = async () => {
    // Add item to cart then navigate to checkout (or directly to buy flow)
    await handleAddToCart();
    navigate("/checkout"); // adjust route to your checkout
  };

  const submitReview = async (e) => {
    e.preventDefault();
    const payload = {
      name: reviewForm.name,
      email: reviewForm.email,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
    };
    try {
      await api.post(`catproducts/${id}/add_review/`, payload);
      // reload product to fetch reviews & updated rating
      const res = await api.get(`products/${id}/`);
      setProduct(res.data);
      setReviewForm({ name: "", email: "", rating: 5, comment: "" });
      alert("Review submitted!");
    } catch (err) {
      console.error(err);
      alert("Unable to submit review");
    }
  };

  if (loading || !product) return <div className="p-6">Loading...</div>;

  const imgs = [product.image, ...(product.extra_images || [])];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Section 1 - main */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: images */}
        <div className="w-full lg:w-1/2">
          <img src={mainImage} alt={product.name} className="w-full h-auto object-contain rounded-lg shadow" />
          <div className="flex gap-3 mt-4">
            {imgs.map((im, idx) => (
              <button key={idx} onClick={() => setMainImage(im)} className="w-20 h-20 border p-1 rounded">
                <img src={im} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: details */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-sm text-gray-600 my-2">Coupon code: <strong>92921</strong></p>
          <p className="text-gray-700 text-sm mb-4">{product.description}</p>

          <div className="flex items-center gap-4 my-3">
            <div className="text-lg font-bold">₹{product.price}</div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button onClick={() => changeQty(-1)} className="px-3 py-1 border rounded">-</button>
            <div className="px-4 py-1 border rounded">{qty}</div>
            <button onClick={() => changeQty(1)} className="px-3 py-1 border rounded">+</button>
          </div>

          <div className="flex gap-4 mt-6">
            <button onClick={handleAddToCart} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Add to cart</button>
            <button onClick={handleBuyNow} className="border px-6 py-2 rounded-lg">Buy Now</button>
          </div>
        </div>
      </div>

      {/* Section 2 - one row two columns */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-xl font-semibold">Product Details</h3>
          <p className="text-gray-700 mt-2">
            {product.description}
          </p>
        </div>
        <div>
          {/* Replace with an informative image or diagram */}
          <img src={product.image} alt="detail" className="w-full h-56 object-cover rounded-lg" />
        </div>
      </div>

      {/* Section 3 - reviews */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>

        {/* reviews list */}
        <div className="mt-4 space-y-4">
          {product.reviews && product.reviews.length ? (
            product.reviews.map((r) => (
              <div key={r.id} className="border rounded p-3">
                <div className="flex justify-between items-center">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                </div>
                <div className="text-sm text-gray-600">{r.comment}</div>
                <div className="text-xs text-gray-400 mt-1">{new Date(r.created_at).toLocaleString()}</div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>

        {/* review form */}
        <form onSubmit={submitReview} className="mt-6 border rounded p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              required
              placeholder="Your name"
              value={reviewForm.name}
              onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
              className="border p-2 rounded"
            />
            <input
              required
              placeholder="Your email"
              type="email"
              value={reviewForm.email}
              onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
              className="border p-2 rounded"
            />
          </div>

          <div className="mt-3">
            <label className="block text-sm">Rating</label>
            <select
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
              className="border p-2 rounded mt-1"
            >
              <option value={5}>5 - Excellent</option>
              <option value={4}>4 - Very good</option>
              <option value={3}>3 - Good</option>
              <option value={2}>2 - Poor</option>
              <option value={1}>1 - Terrible</option>
            </select>
          </div>

          <div className="mt-3">
            <textarea
              placeholder="Comment"
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              className="border p-2 rounded w-full"
              rows={4}
            />
          </div>

          <div className="mt-3">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CatProductDetail;
