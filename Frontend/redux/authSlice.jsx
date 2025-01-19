import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null, // Charger le token depuis localStorage si disponible
    firstname:null,
    lastname:null,
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
    UpdateData:(state,action)=> {
      state.firstname=action.payload.firstname;
      state.lastname=action.payload.lastname;
      console.log(action.payload);
      
   
    },

  },
});

export const { login, logout,UpdateData } = authSlice.actions;
export const authReducer = authSlice.reducer;
