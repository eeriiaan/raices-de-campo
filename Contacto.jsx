
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contacto() {
  return (
    <>
      <Helmet>
        <title>Contacto - Raíces de Campo</title>
        <meta name="description" content="Contacta con Raíces de Campo para consultas, reservas o más información sobre nuestras experiencias rurales." />
        <meta name="keywords" content="contacto, Raíces de Campo, turismo rural, consulta, reserva" />
      </Helmet>
      <div className="container my-5">
        <h1 className="text-center mb-4">Contactanos</h1>
        <p className="lead text-center mb-5">
          ¿Tenés alguna pregunta o querés reservar una experiencia? ¡No dudes en contactarnos!
        </p>

        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card p-4 shadow-lg rounded-xl">
              <h3 className="mb-4 text-center">Envíanos un Mensaje</h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="nombreInput" className="form-label">Nombre</label>
                  <input type="text" className="form-control rounded-pill" id="nombreInput" placeholder="Tu nombre" />
                </div>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Email</label>
                  <input type="email" className="form-control rounded-pill" id="emailInput" placeholder="tu.email@ejemplo.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="mensajeTextarea" className="form-label">Mensaje</label>
                  <textarea className="form-control rounded" id="mensajeTextarea" rows="5" placeholder="Escribe tu mensaje aquí"></textarea>
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg rounded-pill shadow-sm">Enviar Mensaje</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-5 text-center">
          <h3 className="mb-4">Nuestra Información de Contacto</h3>
          <div className="row justify-content-center">
            <div className="col-md-4 mb-3">
              <div className="card p-3 h-100 shadow-sm rounded-xl">
                <FaPhone className="text-primary fs-2 mb-2 mx-auto" />
                <p className="mb-0"><strong>Teléfono:</strong> +54 9 11 0000-0000</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3 h-100 shadow-sm rounded-xl">
                <FaEnvelope className="text-primary fs-2 mb-2 mx-auto" />
                <p className="mb-0"><strong>Email:</strong> info@raicesdecampo.com</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card p-3 h-100 shadow-sm rounded-xl">
                <FaMapMarkerAlt className="text-primary fs-2 mb-2 mx-auto" />
                <p className="mb-0"><strong>Dirección:</strong> Ruta Provincial S/N, Campo Grande, Argentina</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
