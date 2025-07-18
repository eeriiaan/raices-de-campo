import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
// Importa Helmet de react-helmet-async si lo necesitas en este contexto, aunque AuthContext
// usualmente no usa Helmet directamente. Si este import no es necesario, se puede remover.
// Por ahora, lo corregimos a react-helmet-async para resolver el error de importación.
import { Helmet } from 'react-helmet-async'; // CORREGIDO: de 'react-helmet' a 'react-helmet-async'

const AuthContext = createContext();

// Este UID DEBES REEMPLAZARLO con el UID del NUEVO USUARIO que crearás en Firebase
const ADMIN_UIDS = [
  '08jUtqV1k1XmMLkz8YIv2SuEU1i1', // Este es el UID que Firebase te ha dejado
];

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      // --- LOGS DE DEPURACIÓN AÑADIDOS ---
      console.log("Auth State Changed - User:", user);
      if (user) {
        console.log("User UID:", user.uid);
        console.log("Admin UIDs configured:", ADMIN_UIDS);
        console.log("Is user UID in ADMIN_UIDS?", ADMIN_UIDS.includes(user.uid));
      }
      // --- FIN DE LOGS DE DEPURACIÓN ---
    });
    return unsubscribe;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      toast.info('Sesión cerrada exitosamente.', { position: 'bottom-right' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
      toast.error('Error al cerrar sesión. Intenta de nuevo.', { position: 'bottom-right' });
    }
  };

  const isAdmin = currentUser && ADMIN_UIDS.includes(currentUser.uid);
  // --- LOG DE DEPURACIÓN AÑADIDO ---
  console.log("isAdmin calculated:", isAdmin);
  // --- FIN DE LOG DE DEPURACIÓN ---

  const contextValue = {
    currentUser,
    loading,
    logout,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
