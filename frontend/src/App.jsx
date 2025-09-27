import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Dog from "./pages/Dog";
import Cat from "./pages/Cat";
import Smallanimal from "./pages/Smallanimal";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderCompletePage from "./pages/OrderCompletePage";
import ContactusPage from "./pages/ContactPage";
import ProductDetailsPage from "./pages/ProductDetails";
import CatProductDetailsPage from "./pages/CatProductDeails";
import SmallanimalProductDetailsPage from "./pages/SmallanimalProductDetails";
import PetServicePage from "./pages/PetServicePage";
import ConsultVetPage from "./pages/ConsultVet";
import ConsultCheckoutPage from "./pages/ConsultCheckoutPage";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Routes>

              {/* Home */}
              <Route
                path="/"
                element={
                  <>
                    <Helmet>
                      <title>Home - My Pet Store</title>
                      <meta name="description" content="Welcome to our Pet Store – Your one-stop shop for pets and accessories." />
                    </Helmet>
                    <Home />
                  </>
                }
              />

              {/* About */}
              <Route
                path="/about"
                element={
                  <>
                    <Helmet>
                      <title>About Us - My Pet Store</title>
                      <meta name="description" content="Learn more about My Pet Store and our mission to care for your pets." />
                    </Helmet>
                    <About />
                  </>
                }
              />

              {/* Dogs */}
              <Route
                path="/dogs"
                element={
                  <>
                    <Helmet>
                      <title>Dogs - My Pet Store</title>
                      <meta name="description" content="Explore our wide range of dog products and accessories." />
                    </Helmet>
                    <Dog />
                  </>
                }
              />

              {/* Cats */}
              <Route
                path="/cats"
                element={
                  <>
                    <Helmet>
                      <title>Cats - My Pet Store</title>
                      <meta name="description" content="Find the best products and accessories for your cats." />
                    </Helmet>
                    <Cat />
                  </>
                }
              />

              {/* Small Pets */}
              <Route
                path="/small-pets"
                element={
                  <>
                    <Helmet>
                      <title>Small Pets - My Pet Store</title>
                      <meta name="description" content="Shop for small pets and accessories, from hamsters to rabbits." />
                    </Helmet>
                    <Smallanimal />
                  </>
                }
              />

              {/* Login */}
              <Route
                path="/login"
                element={
                  <>
                    <Helmet>
                      <title>Login - My Pet Store</title>
                      <meta name="description" content="Login to your account to access your cart, orders, and more." />
                    </Helmet>
                    <LoginPage />
                  </>
                }
              />

              {/* Product Details */}
              <Route
                path="/products/:id"
                element={
                  <>
                    <Helmet>
                      <title>Product Details - My Pet Store</title>
                      <meta name="description" content="View product details and purchase options." />
                    </Helmet>
                    <ProductDetailsPage />
                  </>
                }
              />

              <Route
                path="/catproducts/:id"
                element={
                  <>
                    <Helmet>
                      <title>Cat Product Details - My Pet Store</title>
                      <meta name="description" content="View cat product details and purchase options." />
                    </Helmet>
                    <CatProductDetailsPage />
                  </>
                }
              />

              <Route
                path="/smallanimalproducts/:id"
                element={
                  <>
                    <Helmet>
                      <title>Small Pet Product Details - My Pet Store</title>
                      <meta name="description" content="View small pet product details and purchase options." />
                    </Helmet>
                    <SmallanimalProductDetailsPage />
                  </>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <>
                      <Helmet>
                        <title>Cart - My Pet Store</title>
                        <meta name="description" content="View items in your cart and proceed to checkout." />
                      </Helmet>
                      <CartPage />
                    </>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <>
                      <Helmet>
                        <title>Checkout - My Pet Store</title>
                        <meta name="description" content="Complete your purchase and checkout securely." />
                      </Helmet>
                      <CheckoutPage />
                    </>
                  </ProtectedRoute>
                }
              />

              {/* Order Complete */}
              <Route
                path="/order-complete/:id"
                element={
                  <>
                    <Helmet>
                      <title>Order Complete - My Pet Store</title>
                      <meta name="description" content="Your order has been successfully placed." />
                    </Helmet>
                    <OrderCompletePage />
                  </>
                }
              />

              {/* Contact */}
              <Route
                path="/contact"
                element={
                  <>
                    <Helmet>
                      <title>Contact Us - My Pet Store</title>
                      <meta name="description" content="Get in touch with us for any queries or support." />
                    </Helmet>
                    <ContactusPage />
                  </>
                }
              />

              {/* Services */}
              <Route
                path="/services"
                element={
                  <>
                    <Helmet>
                      <title>Pet Services - My Pet Store</title>
                      <meta name="description" content="Explore our pet services, grooming, and vet consultations." />
                    </Helmet>
                    <PetServicePage />
                  </>
                }
              />

              {/* Consult */}
              <Route
                path="/consult"
                element={
                  <>
                    <Helmet>
                      <title>Consult a Vet - My Pet Store</title>
                      <meta name="description" content="Book a consultation with our certified veterinarians." />
                    </Helmet>
                    <ConsultVetPage />
                  </>
                }
              />

              <Route
                path="/consult-checkout"
                element={
                  <>
                    <Helmet>
                      <title>Consult Checkout - My Pet Store</title>
                      <meta name="description" content="Complete your veterinary consultation booking." />
                    </Helmet>
                    <ConsultCheckoutPage />
                  </>
                }
              />

              {/* Catch All */}
              <Route
                path="*"
                element={
                  <h1 className="text-center mt-20 text-3xl font-bold">
                    404 - Page Not Found
                  </h1>
                }
              />

            </Routes>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
