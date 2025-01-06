import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Utilisation de Redux si vous stockez le token dans l'état global

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token); // Accéder au token depuis Redux (ou utiliser localStorage)

  if (!token) {
    // Si pas de token, rediriger vers la page de connexion
    return <Navigate to="/login" />;
  }

  return children; // Si connecté, afficher la page protégée
};

export default ProtectedRoute;
