import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Experiencias from './pages/Experiencias.jsx';
import Detalle from './pages/Detalle.jsx';
import Contacto from './pages/Contacto.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import Carrito from './pages/Carrito.jsx';
import NotFound from './pages/NotFound.jsx';
import { ToastContainer } from 'react-toastify';

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
      {/* Añadido 'limit={1}' para evitar toasts duplicados */}
      <ToastContainer limit={1} /> 
    </BrowserRouter>
  );
}

export default App;
