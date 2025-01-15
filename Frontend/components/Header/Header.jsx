import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.scss";
import logo from "../../assets/images/argentBankLogo.webp";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { UserContext } from "../UserContext"; // Import du contexte

const Header = () => {
  const { user } = useContext(UserContext); // Accès au contexte utilisateur

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Link className="header__logo" to="/">
          <img src={logo} alt="Argent Bank Logo" className="header__logo-image" />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        
        <div className="header__nav-items">
          {user.firstName ? (
            <>
              <Link className="header__nav-item" to="/profile">
                <i className="fa fa-user-circle"></i> {user.firstName}
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
