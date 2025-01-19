import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Header.scss";
import { UpdateData, logout } from "../../redux/authSlice";
import logo from "../../assets/images/argentBankLogo.webp";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { fetchUserProfile } from "../Api/api";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  
  // Récupération des informations utilisateur depuis Redux
  const { firstname, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUserData = async () => {
      if (!token) {
        return; // Pas de token, ne rien faire
      }

      try {
        const data = await fetchUserProfile(token); // Appel API pour récupérer le profil utilisateur
        dispatch(
          UpdateData({
            firstname: data.body.firstName,
            lastname: data.body.lastName,
          })
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };

    getUserData();
  }, [token, dispatch]);

  const handleSignOut = () => {
    dispatch(logout()); // Réinitialise l'état dans Redux
    window.location.href = "/"; // Redirection vers la page d'accueil
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__logo" to="/">
          <img
            src={logo}
            alt="Argent Bank Logo"
            className="header__logo-image"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>

        <div className="header__nav-items">
          {firstname ? (
            <>
              <Link className="header__nav-item" to="/profile">
                <i className="fa fa-user-circle"></i> {firstname}
              </Link>
              <Link
                className="header__nav-item"
                to="/"
                onClick={handleSignOut}
              >
                <i className="fa fa-sign-out"></i> Sign Out
              </Link>
            </>
          ) : (
            <Link className="header__nav-item" to="/login">
              <i className="fa fa-user-circle"></i> Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
