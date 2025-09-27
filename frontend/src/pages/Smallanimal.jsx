import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import SmallanimalPage from "../components/SmallanimalPage";

function Smallanimal() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <SmallanimalPage />
      <Footer />
    </>
  );
}

export default Smallanimal;
