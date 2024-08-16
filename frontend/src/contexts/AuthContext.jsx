import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const initialState = JSON.parse(localStorage.getItem("authUser")) || null;
const initialStateAdmin = (initialState && initialState.isAdmin) || false;
const initialStateUser = (initialState && initialState.user) || null;
const initialStateLoggedIn = (initialState && initialState.isLoggedIn) || false;

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(initialStateAdmin);
  const [user, setUser] = useState(initialStateUser);
  const [isLoggedIn, setIsLoggedIn] = useState(initialStateLoggedIn);
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();

  // Función para iniciar sesión
  const handleLogin = async (email) => {
    // Lógica de autenticación, verificar las credenciales del usuario en backend
    // Si la autenticación es exitosa, establece el estado de user, isLoggedIn, etc.
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/findByEmail/${email}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("yoda")}`,
          },
        }
      );
      const parsedUser = {
        email: data.email,
        idUser: data.idUsers,
        name: data.name,
        lastName: data.lastname,
      };
      const isAdmin = data.roles.idRoles === 2;
      setUser(parsedUser);
      setIsAdmin(isAdmin);
      setIsLoggedIn(true);
      localStorage.setItem(
        "authUser",
        JSON.stringify({ user: parsedUser, isAdmin, isLoggedIn: true })
      );
    } catch (err) {}
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Aquí puedes realizar la lógica para cerrar sesión, por ejemplo, limpiar el estado del usuario, restablecer isLoggedIn a false, etc.
    sessionStorage.removeItem("yoda");
    localStorage.removeItem("authUser");
    setIsAdmin(false);
    setUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        isBooking,
        setIsBooking,
        user,
        isLoggedIn,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
