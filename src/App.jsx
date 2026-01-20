import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './public/pages/Home';
import Stickers from './public/pages/Stickers';
import StickerDetail from './public/pages/StickerDetail';
import OurStory from "./public/pages/OurStory";
import Marketplace from "./public/pages/Marketplace";
import SocialMedia from "./public/pages/SocMed";

import AdmLayout from "./admin/layouts/AdmLayout"
import AdmDashboard from "./admin/pages/AdmDashboard";

import Cursor from "./public/components/Cursor";

import PubLayout from './public/layouts/pubLayout';

const App = () => {

  return (
    <BrowserRouter>
      <Cursor />
      <Routes>
        <Route element={<PubLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/stickers" element={<Stickers />} />
          <Route path="/stickers/:productId" element={<StickerDetail />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/socialMedia" element={<SocialMedia />} />
        </Route>
        
        <Route element={<AdmLayout />}>
          <Route path="/admin/dashboard" element={<AdmDashboard />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;


