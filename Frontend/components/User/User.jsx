import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.scss";
import Transaction from "../transaction/transaction";
import { fetchUserProfile, updateUserProfile } from "../Api/api";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
        setUserData(data.body);
        setFirstName(data.body.firstName);
        setLastName(data.body.lastName);
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
  }, [navigate]);

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      const updatedData = await updateUserProfile(token, firstName, lastName);
      setUserData(updatedData.body);
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
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
              {userData.firstName} {userData.lastName}!
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
