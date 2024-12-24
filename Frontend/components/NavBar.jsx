
import "./NavBar.scss";
import logo from "../assets/images/argentBankLogo.webp";
import '@fortawesome/fontawesome-free/css/all.min.css';

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <a className="nav-bar-logo" href="./index.html">
        <img
          className="nav-bar-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </a>
      <div className="nav-bar-links">
        <a className="nav-bar-item" href="./user.html">
          <i className="fa fa-user-circle"></i>
          Tony
        </a>
        <a className="nav-bar-item" href="./index.html">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
