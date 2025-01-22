import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./User.scss";
import Transaction from "../transaction/transaction";
import { fetchUserProfile, updateUserProfile } from "../Api/api";
import { UpdateData } from "../../redux/authSlice"; // Import de l'action UpdateData

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupérer les données utilisateur depuis Redux
  const { firstname, lastname, token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [firstName, setFirstName] = useState(firstname || ""); // Initialiser avec les données de Redux
  const [lastName, setLastName] = useState(lastname || ""); // Initialiser avec les données de Redux

  useEffect(() => {
    const getUserData = async () => {
      if (!token) {
        navigate("/sign-in");
        return;
      }

      try {
        const data = await fetchUserProfile(token); // Récupérer les données du profil utilisateur
        dispatch(UpdateData({
          firstname: data.body.firstName,
          lastname: data.body.lastName,
        }));
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
  }, [token, navigate, dispatch]);

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = async () => {
    try {
      // Appeler l'API pour mettre à jour les données
      const updatedData = await updateUserProfile(token, firstName, lastName);
      
      // Mettre à jour Redux avec les nouvelles données
      dispatch(UpdateData({
        firstname: updatedData.body.firstName,
        lastname: updatedData.body.lastName,
      }));

      setIsEdit(false); // Revenir en mode lecture
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
              {firstname} {lastname}!
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
