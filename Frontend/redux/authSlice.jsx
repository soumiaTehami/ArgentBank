import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null, // Charger le token depuis localStorage si disponible
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // Sauvegarder le token dans localStorage
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token"); // Supprimer le token de localStorage lors de la déconnexion
    },
  },
});

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
