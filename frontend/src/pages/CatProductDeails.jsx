import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import CatProductDetail from "../components/CatProductDetails";

function CatProductDetailsPage() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <CatProductDetail />
      <Footer />
    </>
  );
}

export default CatProductDetailsPage;
