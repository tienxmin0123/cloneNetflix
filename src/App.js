import "./assets/css/_index.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HeroSlider from "./components/heroSlider/HeroSlider";

function App() {
  return (
    <div className="app">
      <Header />
      <HeroSlider />
      <Footer />
    </div>
  );
}

export default App;
