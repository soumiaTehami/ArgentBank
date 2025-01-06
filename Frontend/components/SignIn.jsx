import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
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

  // Gestion des changements dans les champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password,rememberMe } = formData;
    console.log(formData.username);

    

    if (!username || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email:username, password:password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await response.json();
      console.log("Response data:", data);

      // Enregistrer le token dans Redux
      dispatch(login(data.body.token));
      console.log('userconnected');
      
      

      // Stocker "Remember Me" dans localStorage si activé
      if (rememberMe) {
        localStorage.setItem("rememberMe", JSON.stringify({ username }));
      }

      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // Récupérer le username enregistré si "Remember Me" était activé
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
