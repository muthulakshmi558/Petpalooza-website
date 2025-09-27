import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Swiper CSS first
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// Your CSS files
import './index.css';
import './App.css';
import { AuthProvider } from "./context/AuthContext";

import App from './App.jsx';
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>

    <CartProvider>
      <App />
    </CartProvider>
    </AuthProvider>

  </StrictMode>
);
