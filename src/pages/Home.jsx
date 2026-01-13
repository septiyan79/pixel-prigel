import { useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StickerGrid from "../components/StickerGrid";
import Footer from "../components/Footer";
import { dummyStickers } from "../data/dummyStickers";
import useCursor from "../hooks/useCursor";

const Home = () => {
  const cursorRef = useRef(null);
  useCursor(cursorRef);

  return (
    <div className="bg-[#FFFBF7] min-h-screen">
      <Navbar />
      <Hero />
      <StickerGrid stickers={dummyStickers} />
      <Footer />

      {/* Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 bg-orange-500 rounded-full pointer-events-none -ml-3 -mt-3"
      />
    </div>
  );
};

export default Home;
