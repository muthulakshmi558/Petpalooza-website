import AboutMission from "../components/AboutMission";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";

function About() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <AboutMission />
      <AboutSection />
      <Footer />
    </>
  );
}

export default About;
