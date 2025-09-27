import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import PetServiceBanner from "../components/PetServiceBanner";
import PetServices from "../components/PetSection";

function PetServicePage() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <PetServiceBanner />
      <PetServices />
      <Footer />
    </>
  );
}

export default PetServicePage;
