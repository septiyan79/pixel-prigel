import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Stickers from './pages/Stickers';
import StickerDetail from './pages/StickerDetail';
import OurStory from "./pages/OurStory";
import Marketplace from "./pages/Marketplace";
import SocialMedia from "./pages/SocMed";

import AdmDashboard from "./admin/pages/AdmDashboard";


import Cursor from "./components/Cursor";

const App = () => {

  return (
    <BrowserRouter>
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stickers" element={<Stickers />} />
        <Route path="/stickers/:productId" element={<StickerDetail />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/socialMedia" element={<SocialMedia />} />

        <Route path="/admin" element={<AdmDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


