import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-5 shadow-lg"> {/* Añadida sombra */}
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase text-dark">Raíces de Campo</h5> {/* Texto oscuro */}
            <p className="text-muted"> {/* Texto más suave */}
              Descubrí la auténtica vida rural argentina. Experiencias únicas, naturaleza y tradición.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase text-dark">Enlaces Útiles</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/experiencias" className="text-muted">Experiencias</a>
              </li>
              <li>
                <a href="/contacto" className="text-muted">Contacto</a>
              </li>
              <li>
                <a href="/carrito" className="text-muted">Carrito</a>
              </li>
              <li>
                <a href="/login" className="text-muted">Login</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase text-dark">Redes Sociales</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-muted">Facebook</a>
              </li>
              <li>
                <a href="#!" className="text-muted">Instagram</a>
              </li>
              <li>
                <a href="#!" className="text-muted">WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3 text-white" style={{ backgroundColor: '#212529' }}> {/* Fondo más oscuro y texto blanco */}
        © 2024 Raíces de Campo. Todos los derechos reservados.
      </div>
    </footer>
  );
}
