
import { Link } from "react-router-dom";
import "./Error.scss";

const Error = () => {
  return (
    <div className="error-page">
      <h1 className="error-page__title">404</h1>
      <p className="error-page__message">Oops! La page que vous demandez n’existe pas</p>
      <Link to="/" className="error-page__link">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default Error;
