import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import ConsultVet from "../components/ConsultBanner";
import ConsultVetSection from "../components/ConsultSection";

function ConsultVetPage() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <ConsultVet />
      <ConsultVetSection />
      <Footer />
    </>
  );
}

export default ConsultVetPage;
