import HomeBanner from '../components/HomeBanner'
import HomeShop from '../components/HomeShop'
import HomeGallery from "../components/HomeGallery"
import HomeDiscountSection from '../components/HomeDiscountSection'
import HomePromoBar from '../components/HomePromoBar'
import HomeServiceCards from '../components/HomeServiceCards'
import Footer from '../components/Footer'
import Navbar  from '../components/Navbar'

function Home() {

  return (
    <>
      <Navbar />
      <HomeBanner />
      <HomeShop />
      <HomeGallery />
      <HomeDiscountSection />
      <HomePromoBar />
      <HomeServiceCards />
      <Footer />
    </>
  )
}

export default Home
