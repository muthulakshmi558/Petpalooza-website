// src/components/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { MdEmail, MdSearch } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import logo from "../assets/images/logo.png";


const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { cartCount } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const res = await api.get(`/products/?search=${query}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error("Search failed:", err);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full shadow-md relative">
      {/* Top Row */}
      <div className="bg-white text-black px-4 py-2 flex justify-between items-center text-sm">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <FaPhoneAlt /> +91-1234567890
          </span>
          <span className="flex items-center gap-1">
            <MdEmail /> Support@petpalooza.com
          </span>
        </div>
      </div>

      {/* Middle Row */}
      <div className="bg-[#2345c5] text-white px-6 py-3 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-lg">
          <img src={logo} alt="PetPalooza" className="w-20 h-20" />
        </div>

        {/* Desktop Search */}
        <div ref={searchRef} className="relative hidden md:flex flex-1 justify-center px-4">
          <input
            type="text"
            placeholder="Search for products"
            value={searchQuery}
            onChange={handleSearch}
            className="w-2/3 px-4 py-2 rounded-full text-black"
          />
          {searchResults.length > 0 && (
            <div className="absolute mt-2 bg-white shadow-lg rounded w-2/3 max-h-60 overflow-y-auto z-50 text-black">
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>

          {!isLoggedIn ? (
            <Link to="/login" className="flex items-center gap-1">
              <FaUser /> Log In
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:underline"
            >
              Logout
            </button>
          )}

          <Link to="/cart" className="flex items-center gap-1 relative">
            <FaShoppingCart /> Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-[#2345c5] text-white flex flex-col gap-4 px-6 py-4 relative">
          {/* Mobile Search */}
          <div ref={searchRef} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-full text-black"
            />
            {searchResults.length > 0 && (
              <div className="absolute mt-2 bg-white shadow-lg rounded w-full max-h-60 overflow-y-auto z-50 text-black">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => {
                      setSearchQuery("");
                      setSearchResults([]);
                      setMobileMenu(false);
                    }}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {!isLoggedIn ? (
            <Link to="/login" className="flex items-center gap-1">
              <FaUser /> Log In
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:underline"
            >
              Logout
            </button>
          )}
          <Link to="/cart" className="flex items-center gap-1 relative">
            <FaShoppingCart /> Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-400 text-black text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      )}

      {/* Bottom Row (Mega Menu) */}
      <div className="bg-[#2345c5] text-white hidden md:flex justify-center gap-6 py-2 font-medium">
        <Link to="/dogs">Dog ▼</Link>
        <Link to="/cats">Cat ▼</Link>
        <Link to="/small-pets" className="text-yellow-300">Small Pets ▼</Link>
        <Link to="/services">Pet Service ▼</Link>
        <Link to="">Shop by Brand ▼</Link>
        <Link to="">Shop by Breed ▼</Link>
        <Link to="/consult">Consult a Vet</Link>
      </div>
    </div>
  );
};

export default Navbar;
