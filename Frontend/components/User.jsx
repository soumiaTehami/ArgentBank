import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.scss";
import Transaction from "./transaction";

const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEdit,setisEdit]=useState(false);
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
const toggeleIsEdit=()=>{
  setisEdit(!isEdit);
}
  if (loading) {
    return <p>Loading...</p>; // Indicateur de chargement
  }

  if (error) {
    return <p className="error-message">{error}</p>; // Message d'erreur
  }

  return (
    <main className="main bg-dark">
      <div className="main-header">
        { 
          isEdit==true? ( <button className="edit-button" onClick={toggeleIsEdit} >cancel</button>):(
      
        <div>

        <h1>
          Welcome back
          <br />
          {userData.firstName} {userData.lastName}!
        </h1>
        <button className="edit-button" onClick={toggeleIsEdit} >Edit Name</button>
        </div>)
          }
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Transaction title={'x3456'}  amount={'10,4556'} description={'Available Balance'}/>
      <Transaction title={'x6712'}  amount={'10,928.42'} description={'Available Balance'}/>
      <Transaction title={'x8349'}  amount={'184.30'} description={'Current Balance'}/>
      
      
    </main>
  );
};

export default User;
