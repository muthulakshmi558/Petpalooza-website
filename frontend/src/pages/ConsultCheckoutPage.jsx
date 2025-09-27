import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import ConsultCheckout from "../components/ConsultCheckout";
import ClientReviews from "../components/ClientReviews";

function ConsultCheckoutPage() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <ConsultCheckout />
      <ClientReviews />
      <Footer />
    </>
  );
}

export default ConsultCheckoutPage;
