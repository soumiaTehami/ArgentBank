import { Link, useNavigate } from "react-router-dom"; // Importer useNavigate pour la redirection
import { useDispatch } from "react-redux"; // Importer useDispatch pour la gestion du store Redux
import { logout } from "../redux/authSlice"; // Importer l'action logout
import "./Header.scss";
import logo from "../assets/images/argentBankLogo.webp";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  const dispatch = useDispatch(); // Initialiser le dispatch pour Redux
  const navigate = useNavigate(); // Initialiser le navigate pour la redirection

  const handleLogout = () => {
    dispatch(logout()); // Appeler l'action logout pour réinitialiser l'état global
    navigate("/"); // Rediriger vers la page de connexion
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
          <Link className="header__nav-item" to="/login">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
          <button onClick={handleLogout} className="header__nav-item">
            <i className="fa fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
