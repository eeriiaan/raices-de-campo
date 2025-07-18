import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Experiencias from './pages/Experiencias';
import Detalle from './pages/Detalle';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Carrito from './pages/Carrito';
import NotFound from './pages/NotFound';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experiencias" element={<Experiencias />} />
        <Route path="/detalle/:id" element={<Detalle />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
