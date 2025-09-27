import { useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import Logo from "../assets/images/logo.png";
import api from "../api/axios"; // 🔹 backend axios instance

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      // 🔹 call backend API
      const res = await api.post("/subscribe/", { email });

      if (res.status === 200) {
        setMessage("✅ Subscription successful! Check your email.");
        setEmail("");
      }
    } catch (err) {
      setMessage("❌ Failed to subscribe. Try again later.");
    }

    // 🔹 hide alert after 4s
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <footer className="bg-[#1C49C2] text-white py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Column 1 */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src={Logo} alt="PetPalooza Logo" className="w-15 h-15" />
          </div>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Dog</a></li>
            <li><a href="#">Cat</a></li>
            <li><a href="#">Fish</a></li>
            <li><a href="#">Rats</a></li>
            <li><a href="#">Rabbits</a></li>
            <li><a href="#">Hamsters</a></li>
            <li><a href="#">Guinea pigs</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Privacy policy</a></li>
            <li><a href="#">Refund & returns policy</a></li>
            <li><a href="#">Shipping policy</a></li>
            <li><a href="#">Terms & conditions</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#"><FaFacebookF size={22} /></a>
            <a href="#"><FaInstagram size={22} /></a>
            <a href="#"><FaYoutube size={22} /></a>
            <a href="#"><FaWhatsapp size={22} /></a>
          </div>
          <h3 className="font-semibold text-lg mb-2">Get in Touch</h3>
          <p className="text-sm">Call: +91-1234567890</p>
          <p className="text-sm">Email: support@petpalooza.com</p>
        </div>

        {/* Column 5: Subscribe */}
        <div>
          <h3 className="font-semibold text-lg mb-3">For Subscribe,</h3>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-3 py-2 rounded-md text-black focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-[#1C49C2] font-semibold py-2 rounded-md hover:bg-gray-100 transition"
            >
              Subscribe Now
            </button>
          </form>

          {/* 🔹 Notification */}
          {message && (
            <div className="mt-3 text-sm bg-white text-[#1C49C2] px-3 py-2 rounded-md">
              {message}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
