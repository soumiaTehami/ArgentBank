import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./User.scss";
import Transaction from "../transaction/transaction";
import { fetchUserProfile, updateUserProfile } from "../Api/api";
import { UserContext } from "../UserContext"; // Import du contexte

const User = () => {
  const { user, setUser } = useContext(UserContext); // Accès au contexte utilisateur
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/sign-in");
        return;
      }

      try {
        const data = await fetchUserProfile(token);
        setUser(data.body); // Met à jour le contexte utilisateur
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user profile. Please log in again.");
        localStorage.removeItem("token");
        navigate("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [navigate, setUser]);

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const updatedData = await updateUserProfile(token, user.firstName, user.lastName);
      setUser(updatedData.body); // Met à jour le contexte utilisateur
      setIsEdit(false); // Retour au mode vue
    } catch (err) {
      console.error(err);
      setError("Failed to update user profile.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <main className="main bg-dark">
      <div className="main-header">
        {isEdit ? (
          <div className="edit-form">
            <h1>Welcome back</h1>
            <div className="form-group-container">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="button-container">
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={toggleIsEdit}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1>
              Welcome back
              <br />
              {user.firstName} {user.lastName}!
            </h1>
            <button className="edit-button" onClick={toggleIsEdit}>
              Edit Name
            </button>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Transaction title={"x3456"} amount={"10,4556"} description={"Available Balance"} />
      <Transaction title={"x6712"} amount={"10,928.42"} description={"Available Balance"} />
      <Transaction title={"x8349"} amount={"184.30"} description={"Current Balance"} />
    </main>
  );
};

export default User;
