import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import ContactUs from "../components/Contact";

function ContactusPage() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <ContactUs />
      <Footer />
    </>
  );
}

export default ContactusPage;
