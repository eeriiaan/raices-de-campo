import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const API_URL = 'https://6862fff988359a373e93af74.mockapi.io/experiencias';

export default function Admin() {
  const { currentUser, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    imagen: '',
    price: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (!authLoading) {
      if (!currentUser || !isAdmin) {
        toast.error("No tienes permisos para acceder a esta página.", { position: 'bottom-right' });
        navigate('/');
      } else {
        fetchExperiencias();
      }
    }
  }, [currentUser, isAdmin, authLoading, navigate]);

  const fetchExperiencias = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setExperiencias(data);
    } catch (err) {
      console.error("Error al cargar experiencias:", err);
      setError("No se pudieron cargar las experiencias de administración.");
      toast.error("Error al cargar experiencias de administración.", { position: 'bottom-right' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !isAdmin) {
      toast.error("No tienes permisos para realizar esta acción.", { position: 'bottom-right' });
      return;
    }

    try {
      let response;
      if (editingId) {
        response = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Error al actualizar la experiencia.');
        toast.success("Experiencia actualizada exitosamente.", { position: 'bottom-right' });
      } else {
        response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Error al agregar la experiencia.');
        toast.success("Experiencia agregada exitosamente.", { position: 'bottom-right' });
      }
      setFormData({ titulo: '', descripcion: '', imagen: '', price: '' });
      setEditingId(null);
      fetchExperiencias();
    } catch (err) {
      console.error("Error en la operación:", err);
      toast.error(err.message || "Error al guardar la experiencia.", { position: 'bottom-right' });
    }
  };

  const handleEdit = (experience) => {
    if (!currentUser || !isAdmin) {
      toast.error("No tienes permisos para realizar esta acción.", { position: 'bottom-right' });
      return;
    }
    setFormData(experience);
    setEditingId(experience.id);
  };

  const handleDelete = async (id) => {
    if (!currentUser || !isAdmin) {
      toast.error("No tienes permisos para realizar esta acción.", { position: 'bottom-right' });
      return;
    }

    if (!window.confirm('¿Estás seguro de que quieres eliminar esta experiencia? Esta acción es irreversible.')) {
      toast.info('Eliminación cancelada.', { position: 'bottom-right' });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error al eliminar la experiencia.');
      toast.success("Experiencia eliminada exitosamente.", { position: 'bottom-right' });
      fetchExperiencias();
    } catch (err) {
      console.error("Error al eliminar:", err);
      toast.error(err.message || "Error al eliminar la experiencia.", { position: 'bottom-right' });
    }
  };

  if (authLoading) {
    return (
      <div className="container my-5 text-center">
        <h2>Verificando permisos...</h2>
        <div className="spinner-border text-primary mt-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
    return null;
  }

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <h2>Cargando administración...</h2>
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
        <p>Por favor, verifica tu conexión o la configuración de MockAPI.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Administración - Raíces de Campo</title>
        <meta name="description" content="Panel de administración para gestionar las experiencias rurales de Raíces de Campo." />
        <meta name="keywords" content="administración, panel, experiencias, CRUD, Raíces de Campo" />
      </Helmet>
      <div className="container my-5">
        <h1 className="mb-4">Administración de Experiencias</h1>

        <div className="card shadow-lg p-4 mb-5 rounded-xl">
          <h3 className="mb-4">{editingId ? 'Editar Experiencia' : 'Agregar Nueva Experiencia'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">Título</label>
              <input type="text" className="form-control rounded-pill" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="descripcion" className="form-label">Descripción</label>
              <textarea className="form-control rounded" id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} rows="3" required></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">URL de Imagen</label>
              <input type="url" className="form-control rounded-pill" id="imagen" name="imagen" value={formData.imagen} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Precio</label>
              <input type="number" className="form-control rounded-pill" id="price" name="price" value={formData.price} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary me-2 d-flex align-items-center shadow-sm">
              {editingId ? <><FaSave className="me-1" /> Actualizar Experiencia</> : <><FaPlus className="me-1" /> Agregar Experiencia</>}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary d-flex align-items-center mt-2 shadow-sm" onClick={() => { setEditingId(null); setFormData({ titulo: '', descripcion: '', imagen: '', price: '' }); }}>
                <FaTimes className="me-1" /> Cancelar Edición
              </button>
            )}
          </form>
        </div>

        <h3 className="mb-4">Experiencias Existentes</h3>
        {experiencias.length === 0 ? (
          <p>No hay experiencias para administrar. ¡Agrega una!</p>
        ) : (
          <div className="table-responsive rounded-xl shadow-sm">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {experiencias.map((exp) => (
                  <tr key={exp.id}>
                    <td>{exp.id}</td>
                    <td>{exp.titulo}</td>
                    <td>${exp.price ? exp.price.toLocaleString('es-AR') : 'N/A'}</td>
                    <td>
                      <button className="btn btn-info btn-sm me-2 d-flex align-items-center shadow-sm" onClick={() => handleEdit(exp)}>
                        <FaEdit className="me-1" /> Editar
                      </button>
                      <button className="btn btn-danger btn-sm d-flex align-items-center mt-1 shadow-sm" onClick={() => handleDelete(exp.id)}>
                        <FaTrash className="me-1" /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
