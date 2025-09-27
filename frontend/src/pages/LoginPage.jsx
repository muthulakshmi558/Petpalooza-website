import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb"; // ✅ import
import Navbar from "../components/Navbar";
import LoginRegister from "../components/LoginRegister";

function LoginPage() {
  return (
    <>
      <Navbar />
      <Breadcrumb />   {/* ✅ Auto breadcrumb here */}
      <LoginRegister />
      <Footer />
    </>
  );
}

export default LoginPage;
