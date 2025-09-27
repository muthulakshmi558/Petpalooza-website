import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import SmallanimalProductDetail from "../components/SmallanimalProductDetails";

function SmallanimalProductDetailsPage() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <SmallanimalProductDetail />
      <Footer />
    </>
  );
}

export default SmallanimalProductDetailsPage;
