import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import DetailPage from './components/DetailPage';
import FavoritesPage from './components/FavoritesPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/character/:id" element={<DetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
