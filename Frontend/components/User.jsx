import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.scss";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Récupérez le token stocké

      if (!token) {
        // Redirigez vers la page de connexion si le token est absent
        navigate("/sign-in");
        return;
      }

      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "POST", // POST selon l'API
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserData(data.body); // Stockez les données de l'utilisateur
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user profile. Please log in again.");
        localStorage.removeItem("token"); // Nettoyez le token
        navigate("/sign-in"); // Redirection
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (loading) {
    return <p>Loading...</p>; // Indicateur de chargement
  }

  if (error) {
    return <p className="error-message">{error}</p>; // Message d'erreur
  }

  return (
    <main className="main bg-dark">
      <div className="main-header">
        <h1>
          Welcome back
          <br />
          {userData.firstName} {userData.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;
