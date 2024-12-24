import "./Header.scss";
import logo from "../assets/images/argentBankLogo.webp";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <a className="header__logo" href="/index.html">
          <img
            src={logo}
            alt="Argent Bank Logo"
            className="header__logo-image"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div className="header__nav-items">
          <a className="header__nav-item" href="/sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
