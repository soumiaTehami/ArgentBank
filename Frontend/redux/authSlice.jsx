import { createSlice } from "@reduxjs/toolkit";

export  const authReducer=createSlice({
    name:'auth',
    initialState:{
        token:null,
    }
});
