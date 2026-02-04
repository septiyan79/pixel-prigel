import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Cursor from "./hooks/Cursor";
import useIdleLogout from './hooks/useIdleLogout';

import PubLayout from './public/layouts/pubLayout';
import Home from './public/pages/Home';
import Stickers from './public/pages/Stickers';
import StickerDetail from './public/pages/StickerDetail';
import OurStory from "./public/pages/OurStory";
import Marketplace from "./public/pages/Marketplace";
import SocialMedia from "./public/pages/SocMed";

import AdmLayout from "./admin/layouts/AdmLayout"
import AdmDashboard from "./admin/pages/AdmDashboard";
import AdmProduct from "./admin/pages/AdmProduct";
import AdmProductCreate from './admin/pages/AdmProductCreate';
import AdmProductList from './admin/pages/AdmProductList';
import AdmProductDetail from './admin/pages/AdmProductDetail';

import Login from "./auth/pages/Login";
import RequireAuth from './auth/guards/requireAuth';
import RequireRole from './auth/guards/RequireRole';
import RequireGuest from "./auth/guards/RequireGuest";

const App = () => {
  useIdleLogout();

  return (
    <BrowserRouter>
      <Cursor />
      <Toaster position='top-center' />

      <Routes>
        {/* AUTH */}
        <Route element={<RequireGuest />}>
          <Route path="/login" element={<Login />} />
        </Route>
        {/* PUBLIC */}
        <Route element={<PubLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/stickers" element={<Stickers />} />
          <Route path="/stickers/:productId" element={<StickerDetail />} />
          <Route path="/story" element={<OurStory />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/socialMedia" element={<SocialMedia />} />
        </Route>

        {/* ADMIN */}
        <Route element={<RequireAuth />}>
          <Route element={<RequireRole allowed={["admin"]} />}>
            <Route path="/admin" element={<AdmLayout />}>
              <Route path="dashboard" element={<AdmDashboard />} />

              <Route path="product" element={<AdmProduct />} >
                <Route index element={<AdmProductList />} />
                <Route path="list" element={<AdmProductList />} />
                <Route path="create" element={<AdmProductCreate />} />
                <Route path=":slug" element={<AdmProductDetail />} />
              </Route>
            </Route>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;


