import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
      toast.warn("El carrito ha sido vaciado.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.info('Vaciado de carrito cancelado.', { position: 'bottom-right' });
    }
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
        <h1 className="mb-4">Tu Carrito de Experiencias</h1>

        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="lead">Tu carrito está vacío. ¡Explora nuestras experiencias y añade algunas!</p>
            <Link to="/experiencias" className="btn btn-primary mt-3 d-flex align-items-center justify-content-center mx-auto" style={{ maxWidth: '250px' }}>
              <FaSearch className="me-2" /> Explorar Experiencias
            </Link>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-striped">
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
                          className="btn btn-danger btn-sm d-flex align-items-center"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <FaTrash className="me-1" /> Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-end align-items-center mt-4">
              <h3 className="me-3">Total: ${getTotalPrice().toLocaleString('es-AR')}</h3>
              <button className="btn btn-warning d-flex align-items-center" onClick={handleClearCart}>
                <FaShoppingCart className="me-1" /> Vaciar Carrito
              </button>
            </div>

            <div className="text-center mt-5">
              <Link to="/experiencias" className="btn btn-outline-secondary me-2 d-flex align-items-center justify-content-center mx-auto my-2" style={{ maxWidth: '200px' }}>
                <FaArrowLeft className="me-1" /> Seguir Comprando
              </Link>
              <button className="btn btn-success d-flex align-items-center justify-content-center mx-auto my-2" style={{ maxWidth: '200px' }} onClick={handleCheckout}>
                <FaCheckCircle className="me-1" /> Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
