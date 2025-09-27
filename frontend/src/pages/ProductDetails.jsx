import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import ProductDetail from "../components/ProductDetail";

function ProductDetailsPage() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <ProductDetail />
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
