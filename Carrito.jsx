import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { FaTrash, FaShoppingCart, FaArrowLeft, FaCheckCircle, FaSearch } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

export default function Carrito() {
  const { cartItems, removeItem, clearCart, getTotalPrice } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    removeItem(id);
    toast.info("Ítem removido del carrito.", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleClearCart = () => {
    // ¡IMPORTANTE! Reemplazado window.confirm por un mensaje de toast para evitar bloqueos en algunos entornos.
    // Para una experiencia de usuario más robusta, se podría implementar un modal personalizado.
    toast.info(
      <div>
        <p>¿Estás seguro de que quieres vaciar el carrito?</p>
        <button 
          className="btn btn-sm btn-danger d-flex align-items-center justify-content-center me-2" // Añadido d-flex, align-items-center, justify-content-center
          onClick={() => {
            clearCart();
            toast.dismiss(); // Cierra el toast actual
            toast.warn("El carrito ha sido vaciado.", {
              position: "bottom-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }}
        >
          <FaShoppingCart className="me-0 me-md-1" /> {/* Icono siempre visible, margen responsivo */}
          <span className="d-none d-md-inline">Sí, Vaciar</span> {/* Texto oculto en XS, visible en MD+ */}
        </button>
        <button 
          className="btn btn-sm btn-secondary d-flex align-items-center justify-content-center" // Añadido d-flex, align-items-center, justify-content-center
          onClick={() => toast.dismiss()} // Cierra el toast actual
        >
          <FaTimes className="me-0 me-md-1" /> {/* Icono siempre visible, margen responsivo */}
          <span className="d-none d-md-inline">No, Cancelar</span> {/* Texto oculto en XS, visible en MD+ */}
        </button>
      </div>,
      {
        position: "top-center",
        autoClose: false, // No cerrar automáticamente para que el usuario pueda interactuar
        closeOnClick: false,
        draggable: false,
        closeButton: false, // Ocultar el botón de cerrar por defecto
      }
    );
  };

  const handleCheckout = () => {
    if (!currentUser) {
      toast.info('Debes iniciar sesión para finalizar tu compra.', { position: 'bottom-right' });
      navigate('/login');
    } else {
      toast.success('¡Compra finalizada con éxito! (Simulado)', { position: 'bottom-right' });
      clearCart();
    }
  };

  return (
    <>
      <Helmet>
        <title>Mi Carrito - Raíces de Campo</title>
        <meta name="description" content="Revisa los ítems en tu carrito de compras de Raíces de Campo. Finaliza tu compra o sigue explorando experiencias rurales." />
        <meta name="keywords" content="carrito, compras, experiencias, Raíces de Campo, checkout" />
      </Helmet>
      <div className="container my-5">
        <h1 className="mb-4 text-center">Tu carrito de experiencias</h1> {/* Título del carrito centrado */}

        {cartItems.length === 0 ? (
          <div className="text-center p-5 border rounded-xl shadow-sm">
            <p className="lead">Tu carrito está vacío. ¡Explora nuestras experiencias y añade algunas!</p>
            <Link to="/experiencias" className="btn btn-primary mt-3 d-flex align-items-center justify-content-center mx-auto shadow-sm" style={{ maxWidth: '250px' }}>
              <FaSearch className="me-2" /> Explorar Experiencias
            </Link>
          </div>
        ) : (
          <>
            <div className="table-responsive rounded-xl shadow-sm">
              {/* Añadida clase table-sm para hacer la tabla más compacta en móviles */}
              <table className="table table-striped table-sm"> 
                <thead>
                  <tr>
                    <th scope="col">Experiencia</th>
                    <th scope="col">Precio Unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.titulo}</td>
                      <td>${item.price ? item.price.toLocaleString('es-AR') : 'N/A'}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price ? (item.price * item.quantity).toLocaleString('es-AR') : 'N/A'}</td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm d-flex align-items-center justify-content-center shadow-sm"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FaTrash className="me-0 me-md-1" /> {/* Sin margen en XS, con margen en MD+ */}
                          <span className="d-none d-md-inline">Remover</span> {/* Oculta texto en XS, muestra en MD+ */}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ajustes para el total y los botones inferiores */}
            <div className="d-flex flex-column flex-md-row justify-content-md-end align-items-center mt-4 p-3 bg-light rounded-xl shadow-sm gap-3">
              <h3 className="me-md-3 mb-0 text-center text-md-start">Total: <span className="text-primary">${getTotalPrice().toLocaleString('es-AR')}</span></h3>
              <button className="btn btn-warning d-flex align-items-center justify-content-center w-100 w-md-auto shadow-sm" onClick={handleClearCart}>
                <FaShoppingCart className="me-1" /> Vaciar Carrito
              </button>
            </div>

            <div className="text-center mt-5 p-4 border rounded-xl shadow-sm d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
              <Link to="/experiencias" className="btn btn-outline-secondary d-flex align-items-center justify-content-center w-100 w-md-auto shadow-sm">
                <FaArrowLeft className="me-1" /> Seguir Comprando
              </Link>
              <button className="btn btn-success d-flex align-items-center justify-content-center w-100 w-md-auto shadow-sm" onClick={handleCheckout}>
                <FaCheckCircle className="me-1" /> Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
