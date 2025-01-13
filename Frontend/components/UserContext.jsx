import  { createContext, useState } from "react";

// Créez le contexte
export const UserContext = createContext();

// Composant fournisseur
// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
