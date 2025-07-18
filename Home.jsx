import React from 'react';
import { Helmet } from 'react-helmet-async'; // <-- CORREGIDO AQUÍ
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Raíces de Campo - Turismo Rural Auténtico</title>
        <meta name="description" content="Descubrí la magia del turismo rural en Argentina. Experiencias únicas, naturaleza y tradición te esperan." />
        <meta name="keywords" content="turismo rural, campo, Argentina, experiencias, naturaleza, tradición, estancia" />
      </Helmet>
      {/* Sección Hero */}
      <div className="jumbotron jumbotron-fluid bg-light text-center py-5" style={{
        backgroundImage: 'url(https://placehold.co/1200x600/6B8E23/FFFFFF?text=Paisaje+Rural)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff',
        textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: '0 0 15px 15px',
        marginBottom: '3rem'
      }}>
        <div className="container">
          <h1 className="display-4 fw-bold">Bienvenidos a Raíces de Campo</h1>
          <p className="lead mt-3">Descubrí la magia del turismo rural y conectá con la naturaleza.</p>
          <Link to="/experiencias" className="btn btn-primary btn-lg mt-4 shadow-lg">
            Explorar Experiencias
          </Link>
        </div>
      </div>

      {/* Sección de Contenido Adicional (puedes expandir esto) */}
      <div className="container my-5 text-center">
        <h2 className="mb-4">Nuestra Misión</h2>
        <p className="lead">
          Conectamos a las personas con la esencia del campo argentino, ofreciendo experiencias auténticas que celebran la tradición, la naturaleza y la hospitalidad rural.
        </p>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm rounded-xl">
              <img src="https://placehold.co/400x250/A52A2A/FFFFFF?text=Tradición" className="card-img-top rounded-top" alt="Tradición" />
              <div className="card-body">
                <h5 className="card-title">Tradición Viva</h5>
                <p className="card-text">Sumérgete en las costumbres y el legado de nuestras raíces.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm rounded-xl">
              <img src="https://placehold.co/400x250/228B22/FFFFFF?text=Naturaleza" className="card-img-top rounded-top" alt="Naturaleza" />
              <div className="card-body">
                <h5 className="card-title">Naturaleza Pura</h5>
                <p className="card-text">Explora paisajes inigualables y la biodiversidad del campo.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow-sm rounded-xl">
              <img src="https://placehold.co/400x250/DAA520/FFFFFF?text=Hospitalidad" className="card-img-top rounded-top" alt="Hospitalidad" />
              <div className="card-body">
                <h5 className="card-title">Hospitalidad Genuina</h5>
                <p className="card-text">Disfruta de la calidez y el trato amable de nuestra gente.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
