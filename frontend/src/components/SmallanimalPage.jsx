import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom"; // 👈 import navigation
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const SmallanimalPage = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [availableFilters, setAvailableFilters] = useState({});

  const [filters, setFilters] = useState({
    brand: [],
    size: [],
    breed: [],
    life_stage: [],
    flavor: [],
    min_price: "",
    max_price: "",
  });
  const [sort, setSort] = useState("");
  const [showFilters, setShowFilters] = useState(true);

  const { isLoggedIn } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate(); // 👈 navigation hook

  const fetchProducts = () => {
    let query = [];
    Object.keys(filters).forEach((key) => {
      if (Array.isArray(filters[key]) && filters[key].length > 0) {
        query.push(`${key}=${filters[key].join(",")}`);
      } else if (filters[key] && !Array.isArray(filters[key])) {
        query.push(`${key}=${filters[key]}`);
      }
    });
    if (sort) query.push(`ordering=${sort}`);
    const queryString = query.length ? `?${query.join("&")}` : "";
    api.get(`smallanimalproducts/${queryString}`).then((res) => setProducts(res.data));
  };

  useEffect(() => {
    api.get("smallanimalbanners/").then((res) => setBanners(res.data));
  }, []);

  useEffect(() => {
    api.get("smallanimalproducts/filters/").then((res) => {
      setAvailableFilters(res.data);
      setFilters((prev) => ({
        ...prev,
        min_price: res.data.min_price || "",
        max_price: res.data.max_price || "",
      }));
    });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters, sort]);

  const toggleFilter = (key, value) => {
    setFilters((prev) => {
      const newValues = prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value];
      return { ...prev, [key]: newValues };
    });
  };

  // 👇 Instead of adding to cart, navigate to product detail page
  const handleAddToCart = (prod) => {
    navigate(`/smallanimalproducts/${prod.id}`);
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 lg:p-6 gap-6">
      {/* Left Side Filters */}
      <div className="w-full lg:w-1/4">
        {/* Filters Section */}
        <div
          onClick={() => setShowFilters(!showFilters)}
          className="flex justify-between items-center bg-gray-100 p-3 rounded cursor-pointer shadow"
        >
          <h2 className="text-lg font-bold">Filters</h2>
          <span className="text-xl">{showFilters ? "▲" : "▼"}</span>
        </div>

        {showFilters && (
          <div className="space-y-4 mt-4 mb-6">
            {Object.keys(availableFilters).map((key) => {
              if (["min_price", "max_price"].includes(key)) return null;
              return (
                <div key={key} className="border rounded p-3 shadow-sm">
                  <h3 className="font-semibold mb-2">
                    {key.replace("_", " ").toUpperCase()}
                  </h3>
                  {availableFilters[key].map((val) => (
                    <label key={val} className="block text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters[key]?.includes(val)}
                        onChange={(e) => {
                          e.preventDefault();
                          toggleFilter(key, val);
                        }}
                        className="mr-2"
                      />
                      {val}
                    </label>
                  ))}
                </div>
              );
            })}

            {/* Price Filter */}
            <div className="border rounded p-3 shadow-sm">
              <h3 className="font-semibold mb-2">Price</h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={filters.min_price}
                  onChange={(e) =>
                    setFilters({ ...filters, min_price: e.target.value })
                  }
                  placeholder="Min"
                  className="border p-1 w-1/2"
                />
                <input
                  type="number"
                  value={filters.max_price}
                  onChange={(e) =>
                    setFilters({ ...filters, max_price: e.target.value })
                  }
                  placeholder="Max"
                  className="border p-1 w-1/2"
                />
              </div>
            </div>
          </div>
        )}

        {/* Banners */}
        <div className="space-y-6 mt-4 lg:mt-0">
          {banners.map((banner) => (
            <div key={banner.id} className="border rounded-lg p-3 shadow">
              <img
                src={banner.image}
                alt={banner.title}
                className="rounded-lg mb-2 w-full h-32 object-cover"
              />
              <h3 className="font-semibold">{banner.title}</h3>
              <p className="text-gray-600 text-sm">{banner.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Products */}
      <div className="w-full lg:w-3/4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
          <h2 className="text-xl font-bold">Small Pet Products</h2>
          <select
            className="border px-3 py-1 rounded"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="price">Price Low to High</option>
            <option value="-price">Price High to Low</option>
            <option value="-created_at">Recent</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="border rounded-lg p-4 shadow flex flex-col"
            >
              <img
                src={prod.image}
                alt={prod.name}
                className="h-40 w-full object-cover mb-3 rounded"
              />
              <h3 className="font-semibold">{prod.name}</h3>
              <div className="flex items-center text-yellow-500 my-1">
                {"★".repeat(Math.round(prod.rating))}
                {"☆".repeat(5 - Math.round(prod.rating))}
                <span className="text-gray-600 text-sm ml-2">
                  ({prod.review_count})
                </span>
              </div>
              <p className="font-bold text-lg">₹{prod.price}</p>
              <p className="text-sm text-gray-500">{prod.quantity}</p>

              {/* ✅ Product Description */}
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {prod.description}
              </p>

              <button
                onClick={() => handleAddToCart(prod)}
                className="bg-blue-600 text-white w-full py-2 mt-3 rounded-lg hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmallanimalPage;
