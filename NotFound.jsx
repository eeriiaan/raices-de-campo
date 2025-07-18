import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // CAMBIO AQUÍ: de 'react-helmet' a 'react-helmet-async'

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Página No Encontrada</title>
        <meta name="description" content="Lo sentimos, la página que estás buscando no existe en Raíces de Campo." />
      </Helmet>
      <div className="container my-5 text-center py-5">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-4">Página No Encontrada</h2>
        <p className="lead">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <Link to="/" className="btn btn-primary mt-4">
          Volver al Inicio
        </Link>
      </div>
    </>
  );
}
