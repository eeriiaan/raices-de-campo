import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async'; // <-- CORREGIDO AQUÍ

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Registro exitoso. ¡Bienvenido!', { position: 'bottom-right' });
      navigate('/');
    } catch (error) {
      console.error("Error al registrar:", error.message);
      toast.error(`Error al registrar: ${error.message}`, { position: 'bottom-right' });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Inicio de sesión exitoso. ¡Bienvenido de nuevo!', { position: 'bottom-right' });
      navigate('/');
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      toast.error(`Error al iniciar sesión: ${error.message}`, { position: 'bottom-right' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión / Registrarse - Raíces de Campo</title>
        <meta name="description" content="Inicia sesión o regístrate para acceder a tu cuenta y gestionar tus experiencias rurales en Raíces de Campo." />
        <meta name="keywords" content="login, registro, iniciar sesión, cuenta, usuario, Raíces de Campo" />
      </Helmet>
      <div className="container my-5">
        <h1 className="mb-4 text-center">Acceder / Registrarse</h1>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-lg rounded-xl">
              <form>
                <div className="mb-3">
                  <label htmlFor="emailInput" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-pill"
                    id="emailInput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control rounded-pill"
                    id="passwordInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-primary btn-lg rounded-pill shadow-sm" onClick={handleLogin}>
                    Iniciar Sesión
                  </button>
                  <button type="submit" className="btn btn-secondary btn-lg rounded-pill shadow-sm mt-2" onClick={handleRegister}>
                    Registrarse
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
