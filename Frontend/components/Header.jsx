
import "./Header.scss";
import logo from "../assets/images/argentBankLogo.webp";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Header = () => {
    return (
      <header className="header">
        <div className="header__logo">
          <img src={logo} alt="Argent Bank Logo" />
          
        </div>
        <nav className="header__nav">
          <a href="/sign-in">
            <i className="fas fa-user-circle"></i> Sign In
          </a>
        </nav>
      </header>
    );
  };

export default Header;
