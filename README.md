# Raíces de Campo - Turismo Rural Auténtico

Este proyecto es una aplicación web de turismo rural desarrollada con React, Vite, Firebase para autenticación y MockAPI para la gestión de experiencias. Permite a los usuarios explorar experiencias rurales, agregarlas a un carrito de compras y, para los administradores, gestionar el catálogo de experiencias.

## Características

* **Autenticación de Usuarios:** Registro, inicio de sesión y cierre de sesión con Firebase Authentication (Email/Contraseña).
* **Panel de Administración:** Acceso restringido para usuarios administradores (UID configurado en `src/context/AuthContext.jsx`).
* **Gestión de Experiencias (CRUD):** Los administradores pueden crear, leer, actualizar y eliminar experiencias de turismo rural.
* **Catálogo de Experiencias:** Visualización de experiencias con detalles, búsqueda por título/descripción y paginación.
* **Carrusel de Experiencias Destacadas:** Un carrusel interactivo en la página principal de experiencias.
* **Carrito de Compras:** Funcionalidad para añadir experiencias al carrito, removerlas y vaciarlo.
* **Notificaciones:** Uso de `react-toastify` para mensajes de usuario.
* **Rutas:** Navegación con `react-router-dom`.
* **SEO:** Optimización básica con `react-helmet-async`.
* **Estilos:** Diseño responsivo utilizando Bootstrap 5 y CSS personalizado.

## Tecnologías Utilizadas

* **React 18**
* **Vite** (para el entorno de desarrollo y build)
* **Firebase:** Authentication (para gestión de usuarios)
* **MockAPI:** `https://6862fff988359a373e93af74.mockapi.io/experiencias` (para datos de experiencias)
* **React Router DOM v6**
* **React Toastify**
* **React Icons**
* **React Helmet Async**
* **Bootstrap 5**

## Instalación y Ejecución
Contraseña administrador

nuevo.admin@raices.com
admin123!
