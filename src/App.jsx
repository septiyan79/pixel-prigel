import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Stickers from './pages/Stickers';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stickers" element={<Stickers />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


