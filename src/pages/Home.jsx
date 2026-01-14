import { useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StickerGrid from "../components/StickerGrid";
import Footer from "../components/Footer";
import Cta from "../components/Cta";
import { stickers } from "../data/dummyStickers";
import useCursor from "../hooks/useCursor";

const Home = () => {
  const cursorRef = useRef(null);
  useCursor(cursorRef);

  return (
    <div className="min-h-screen bg-[#FFFBF7] text-gray-900 selection:bg-orange-200">
      <Navbar />
      <Hero />
      <StickerGrid stickers={stickers} />
      <Cta />
      <Footer />

      {/* --- KURSOR ORANGE --- */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 bg-orange-500 rounded-full pointer-events-none z-9999 transition-transform duration-75 ease-out -ml-3 -mt-3"
      />
    </div>
  );
};

export default Home;
