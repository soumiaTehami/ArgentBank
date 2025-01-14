// src/api.js

const API_BASE_URL = "http://localhost:3001/api/v1";

// Récupère les informations du profil utilisateur
export const fetchUserProfile = async (token) => {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  return response.json();
};

// Met à jour les informations du profil utilisateur
export const updateUserProfile = async (token, firstName, lastName) => {
  const response = await fetch(`${API_BASE_URL}/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  });

  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }

  return response.json();
};
// src/api.js


// Fonction pour se connecter
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Login failed");
  }

  return response.json();
};



