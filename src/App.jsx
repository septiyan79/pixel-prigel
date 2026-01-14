import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Stickers from './pages/Stickers';
import OurStory from "./pages/OurStory";
import Marketplace from "./pages/Marketplace";

import Cursor from "./components/Cursor";

const App = () => {

  return (
    <BrowserRouter>
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stickers" element={<Stickers />} />
        <Route path="/story" element={<OurStory />} />
        <Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


