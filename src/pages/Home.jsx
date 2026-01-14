import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StickerGrid from "../components/StickerGrid";
import Footer from "../components/Footer";
import Cta from "../components/Cta";
import { stickers } from "../data/dummyStickers";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFFBF7] text-gray-900 selection:bg-orange-200">
      <Navbar />
      <Hero />
      <StickerGrid stickers={stickers} />
      <Cta />
      <Footer />
    </div>
  );
};

export default Home;
