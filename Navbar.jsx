import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

import { FaShoppingCart, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

export default function Navbar() {
  const { getTotalItems } = useCart();
  const { currentUser, logout, isAdmin } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4 shadow-sm">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Raíces de Campo" height="40" className="rounded" />
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav ms-auto d-flex gap-3 align-items-center">
          {/* Añadido onClick para depuración */}
          <Link className="nav-link" to="/experiencias" onClick={() => console.log('Clic en Experiencias detectado!')}>Experiencias</Link>
          <Link className="nav-link" to="/contacto">Contacto</Link>
          <Link className="nav-link position-relative d-flex align-items-center" to="/carrito">
            <FaShoppingCart className="me-1" /> Carrito
            {getTotalItems() > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalItems()}
                <span className="visually-hidden">items en el carrito</span>
              </span>
            )}
          </Link>

          {isAdmin && (
            <Link className="nav-link d-flex align-items-center" to="/admin">
              <FaCog className="me-1" /> Admin
            </Link>
          )}

          {currentUser ? (
            <>
              <span className="nav-link text-dark d-flex align-items-center">
                <FaUser className="me-1" /> Hola, {currentUser.email}
              </span>
              <button className="btn btn-outline-danger btn-sm d-flex align-items-center" onClick={handleLogout}>
                <FaSignOutAlt className="me-1" /> Cerrar Sesión
              </button>
            </>
          ) : (
            <Link className="nav-link d-flex align-items-center" to="/login">
              <FaUser className="me-1" /> Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
