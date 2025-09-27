import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import OrderComplete from "../components/OrderComplete";

function OrderCompletePage() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <OrderComplete />
      <Footer />
    </>
  );
}

export default OrderCompletePage;
