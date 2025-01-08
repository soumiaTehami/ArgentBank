import { Link } from "react-router-dom"; // Importer useNavigate pour la redirection

import "./Header.scss";
import logo from "../assets/images/argentBankLogo.webp";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  

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
          
        </div>
      </nav>
    </header>
  );
};

export default Header;
