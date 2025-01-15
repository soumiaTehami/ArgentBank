import { createSlice } from "@reduxjs/toolkit";

// Fonction utilitaire pour gérer le token dans localStorage
const saveTokenToLocalStorage = (token) => {
  if (token) {
    localStorage.setItem("token", token);
  }
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem("token");
};

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token") || null;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: getTokenFromLocalStorage(), // Charger le token depuis localStorage si disponible
  },
  reducers: {
    /**
     * Action de connexion : sauvegarde le token dans Redux et localStorage
     * @param {object} state
     * @param {object} action
     */
    login: (state, action) => {
      state.token = action.payload;
      saveTokenToLocalStorage(action.payload); // Sauvegarder le token dans localStorage
    },
    /**
     * Action de déconnexion : supprime le token de Redux et localStorage
     * @param {object} state
     */
    logout: (state) => {
      state.token = null;
      removeTokenFromLocalStorage(); // Supprimer le token de localStorage lors de la déconnexion
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
