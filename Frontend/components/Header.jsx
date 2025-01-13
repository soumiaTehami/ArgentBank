import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.scss";
import logo from "../assets/images/argentBankLogo.webp";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { fetchUserProfile } from "./api"; // Import de la fonction API

const Header = () => {
  const [userName, setUserName] = useState(""); // État pour le nom de l'utilisateur

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return; // Si pas de token, ne rien afficher
      }

      try {
        const data = await fetchUserProfile(token); // Appel à la fonction API
        setUserName(data.body.firstName); // Mettre à jour le nom de l'utilisateur
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUserName(""); // Réinitialise le nom de l'utilisateur après déconnexion
    window.location.href = "/";
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
          {userName ? (
            <>
              <Link className="header__nav-item" to="/profile">
                <i className="fa fa-user-circle"></i> {userName}
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
