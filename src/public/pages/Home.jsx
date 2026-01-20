
import Hero from "../components/Hero";
import StickerGrid from "../components/StickerGrid";
import Cta from "../components/Cta";
import { getStickers } from "../../data/listSticker";

const Home = () => {
  return (
    <>
      <Hero />
      <StickerGrid getStickers={getStickers} />
      <Cta />
    </>
  );
};

export default Home;
