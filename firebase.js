import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDlTJybdB8amadGc79td_9vqKVMYR9d-wM",
  authDomain: "raices-de-campo-auth.firebaseapp.com",
  projectId: "raices-de-campo-auth",
  storageBucket: "raices-de-campo-auth.firebasestorage.app",
  messagingSenderId: "749969112765",
  appId: "1:749969112765:web:afacea35317a82f41601d4",
  measurementId: "G-7950V4KWLH"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
