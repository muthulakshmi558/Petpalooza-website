import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import Checkout from "../components/Checkout";

function CheckoutPage() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <Checkout />
      <Footer />
    </>
  );
}

export default CheckoutPage;
