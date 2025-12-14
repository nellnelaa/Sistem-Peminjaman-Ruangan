import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(), 
  token: localStorage.getItem("token") || null,
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

      if (action.payload) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("user");
      }
    },
    setToken: (state, action) => {
      if (action.payload) {
        const createdAt = new Date().getTime(); 
        localStorage.setItem("token", action.payload);
        localStorage.setItem("token_created_at", createdAt.toString());
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("token_created_at");
      }
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const isTokenExpired = () => {
  const createdAt = localStorage.getItem("token_created_at");
  if (!createdAt) return true;

  const now = new Date().getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000; 

  return now - parseInt(createdAt, 10) > twentyFourHours;
};

export const { setToken, setUser, logout } = authSlice.actions;

export default authSlice.reducer;
