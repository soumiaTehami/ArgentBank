import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { loginUser } from "../Api/api"; // Import de la fonction API
import "./SignIn.scss";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, rememberMe } = formData;

    if (!username || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    try {
      // Appel à la fonction API
      const data = await loginUser(username, password);

      // Enregistrer le token dans Redux
      dispatch(login(data.body.token));
      
      

      // Stocker "Remember Me" dans localStorage si activé
      if (rememberMe) {
        localStorage.setItem("rememberMe", JSON.stringify({ username }));
      }

      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    if (remembered) {
      setFormData((prev) => ({
        ...prev,
        username: JSON.parse(remembered).username,
        rememberMe: true,
      }));
    }
  }, []);

  return (
    <div className="sign-in-page">
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default SignIn;
