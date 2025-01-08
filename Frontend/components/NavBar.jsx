import  { useEffect, useState } from "react";
import "./NavBar.scss";
import logo from "../assets/images/argentBankLogo.webp";
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavBar = () => {
  const [userName, setUserName] = useState(""); // État pour le nom de l'utilisateur

  useEffect(() => {
    // Simulation de récupération des données utilisateur depuis le localStorage ou API
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return; // Si pas de token, ne rien afficher
      }

      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserName(data.body.firstName); // Mettre à jour le nom de l'utilisateur
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="nav-bar">
      <a className="nav-bar-logo" href="/">
        <img
          className="nav-bar-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div className="nav-bar-links">
        <a className="nav-bar-item" href="/profile">
          <i className="fa fa-user-circle"></i>
          {userName || "User"} {/* Affiche "User" par défaut si pas de nom */}
        </a>
        <a
          className="nav-bar-item"
          href="/sign-in"
          onClick={() => localStorage.removeItem("token")}
        >
          <i className="fa fa-sign-out"></i>
          Sign Out
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
