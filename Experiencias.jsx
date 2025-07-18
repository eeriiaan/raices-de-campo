import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FaPlusCircle, FaInfoCircle, FaSearch } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const API_URL = 'https://6862fff988359a373e93af74.mockapi.io/experiencias';

export default function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExperiencias, setFilteredExperiencias] = useState([]);

  const [featuredExperiencias, setFeaturedExperiencias] = useState([]);

  const [current_page, setCurrentPage] = useState(1);
  const [items_per_page] = useState(6);

  const { addItem } = useCart();

  useEffect(() => {
    const fetchExperiencias = async () => {
      console.log("Iniciando fetch de experiencias..."); // LOG DEPURACIÓN
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_URL);

        if (!response.ok) {
          console.error("Error en la respuesta HTTP:", response.status, response.statusText); // LOG DEPURACIÓN
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Datos recibidos de la API:", data); // LOG DEPURACIÓN
        setExperiencias(data);
        setFilteredExperiencias(data);
        setCurrentPage(1);

        if (data.length > 0) {
          const shuffled = [...data].sort(() => 0.5 - Math.random());
          setFeaturedExperiencias(shuffled.slice(0, Math.min(3, shuffled.length)));
        }

      } catch (err) {
        console.error("Error fetching experiencias:", err); // LOG DEPURACIÓN
        setError("No se pudieron cargar las experiencias. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
        console.log("Fetch de experiencias finalizado. Loading:", false); // LOG DEPURACIÓN
      }
    };

    fetchExperiencias();
  }, []);

  useEffect(() => {
    const results = experiencias.filter(exp =>
      exp.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExperiencias(results);
    setCurrentPage(1);
    console.log("Experiencias filtradas actualizadas. Cantidad:", results.length); // LOG DEPURACIÓN
  }, [searchTerm, experiencias]);

  const lastItemIndex = current_page * items_per_page;
  const firstItemIndex = lastItemIndex - items_per_page;
  const currentItems = filteredExperiencias.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(filteredExperiencias.length / items_per_page);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddToCart = (experience) => {
    addItem(experience);
    toast.success(`"${experience.titulo}" agregado al carrito!`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  console.log("Estado actual: Loading:", loading, "Error:", error, "Filtered Experiencias Length:", filteredExperiencias.length); // LOG DEPURACIÓN

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
        <h2 className="text-primary mb-3">Cargando experiencias...</h2>
        <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Esto puede tardar un momento si la API está inactiva.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
        <h2 className="text-danger mb-3">Error al cargar: {error}</h2>
        <p className="text-muted">Por favor, verifica tu conexión a internet o la URL de MockAPI.</p>
        <button className="btn btn-primary mt-3" onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Experiencias Rurales - Raíces de Campo</title>
        <meta name="description" content="Explora nuestras diversas experiencias de turismo rural: cabalgatas, talleres, visitas a granjas y más. ¡Aventuras en el campo argentino!" />
        <meta name="keywords" content="experiencias rurales, actividades campo, turismo aventura, Argentina, cabalgatas, talleres, granja" />
      </Helmet>
      <div className="container my-5 p-4 bg-white rounded-xl shadow-lg"> {/* Fondo blanco para el contenido */}
        <h1 className="mb-4 text-center">Explorá nuestras experiencias rurales</h1>

        <div className="mb-4">
          <input
            type="text"
            className="form-control rounded-pill px-4 py-2 shadow-sm"
            placeholder="Buscar experiencias por título o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredExperiencias.length === 0 && !loading && !error ? (
          <div className="text-center p-5 border rounded-xl bg-light">
            <h2 className="text-muted">No se encontraron experiencias que coincidan con tu búsqueda.</h2>
            <p className="text-muted">Intenta con otro término o revisa la ortografía.</p>
            <button className="btn btn-outline-primary mt-3" onClick={() => setSearchTerm('')}>Mostrar todas las experiencias</button>
          </div>
        ) : (
          <>
            {featuredExperiencias.length > 0 && (
              <div id="featuredExperiencesCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
                <h2 className="text-center mb-4">Experiencias Destacadas</h2>
                <div className="carousel-indicators">
                  {featuredExperiencias.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      data-bs-target="#featuredExperiencesCarousel"
                      data-bs-slide-to={index}
                      className={index === 0 ? 'active' : ''}
                      aria-current={index === 0 ? 'true' : 'false'}
                      aria-label={`Slide ${index + 1}`}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner rounded shadow-lg">
                  {featuredExperiencias.map((exp, index) => (
                    <div key={exp.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img src={exp.imagen} className="d-block w-100 carousel-img" alt={exp.titulo} />
                      <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded p-3">
                        <h5>{exp.titulo}</h5>
                        <p>{exp.descripcion ? exp.descripcion.slice(0, 100) + '...' : ''}</p>
                        {exp.price && <p><strong>Precio: ${exp.price.toLocaleString('es-AR')}</strong></p>}
                        <Link to={`/detalle/${exp.id}`} className="btn btn-info btn-sm mt-2">
                          Ver Detalles
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#featuredExperiencesCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Anterior</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#featuredExperiencesCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Siguiente</span>
                </button>
              </div>
            )}

            <div className="row">
              {currentItems.map((exp) => (
                <div className="col-md-4 mb-4" key={exp.id}>
                  <div className="card h-100 shadow-sm">
                    <img src={exp.imagen} className="card-img-top" alt={exp.titulo} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{exp.titulo}</h5>
                      <p className="card-text">{exp.descripcion ? exp.descripcion.slice(0, 100) + '...' : ''}</p>
                      {exp.price && <p className="card-text"><strong>Precio: ${exp.price.toLocaleString('es-AR')}</strong></p>}
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <Link to={`/detalle/${exp.id}`} className="btn btn-outline-primary d-flex align-items-center">
                          <FaInfoCircle className="me-1" /> Ver más
                        </Link>
                        <button
                          className="btn btn-success d-flex align-items-center"
                          onClick={() => handleAddToCart(exp)}
                        >
                          <FaPlusCircle className="me-1" /> Agregar al Carrito
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${current_page === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(current_page - 1)}>
                      Anterior
                    </button>
                  </li>
                  {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${current_page === number ? 'active' : ''}`}>
                      <button onClick={() => paginate(number)} className="page-link">
                        {number}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${current_page === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => paginate(current_page + 1)}>
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </>
  );
}
