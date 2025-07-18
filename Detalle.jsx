import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 
import { FaWhatsapp } from 'react-icons/fa';

const API_URL = 'https://6862fff988359a373e93af74.mockapi.io/experiencias';

export default function Detalle() {
  const { id } = useParams();
  const [experiencia, setExperiencia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiencia = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setExperiencia(data);
      } catch (err) {
        console.error("Error fetching experiencia:", err);
        setError("No se pudo cargar la experiencia. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiencia();
  }, [id]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <h2>Cargando detalle de experiencia...</h2>
        <div className="spinner-border text-primary mt-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5 text-center">
        <h2 className="text-danger">Error: {error}</h2>
        <p>Por favor, verifica tu conexión a internet o la URL de MockAPI.</p>
      </div>
    );
  }

  if (!experiencia) {
    return <div className="container mt-5 text-center"><h2>Experiencia no encontrada 😢</h2></div>;
  }

  return (
    <>
      <Helmet>
        <title>{experiencia.titulo} - Raíces de Campo</title>
        <meta name="description" content={experiencia.descripcion ? experiencia.descripcion.slice(0, 160) : `Detalles de la experiencia ${experiencia.titulo} en Raíces de Campo.`} />
        <meta name="keywords" content={`${experiencia.titulo}, experiencia rural, campo, Argentina`} />
      </Helmet>
      <div className="container my-5 card p-4 shadow-lg rounded-xl">
        <h1 className="mb-4">{experiencia.titulo}</h1>
        <img src={experiencia.imagen} alt={experiencia.titulo} className="img-fluid rounded my-3 shadow-sm" style={{ maxHeight: '450px', objectFit: 'cover' }} />
        <p className="lead mt-3">{experiencia.descripcion}</p>
        {experiencia.price && <p className="h4 text-primary"><strong>Precio: ${experiencia.price.toLocaleString('es-AR')}</strong></p>}
        <a href="https://wa.me/5490000000000" target="_blank" rel="noopener noreferrer" className="d-inline-block mt-4">
          <button className="btn btn-success btn-lg d-flex align-items-center shadow-sm">
            <FaWhatsapp className="me-2" /> Reservar esta experiencia
          </button>
        </a>
      </div>
    </>
  );
}
