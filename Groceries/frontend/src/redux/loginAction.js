import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  firstname: "",
  lastname: "",
  email: "",
  profileImage: "",
};

const loginData = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state._id = action.payload.data._id;
      state.firstname = action.payload.data.firstname;
      state.lastname = action.payload.data.lastname;
      state.email = action.payload.data.email;
      state.profileImage = action.payload.data.profileImage;
    },
    logoutAction: (state) => {
      state._id = "";
      state.firstname = "";
      state.lastname = "";
      state.email = "";
      state.profileImage = "";
    },
  },
});

export const { loginAction, logoutAction } = loginData.actions;

export default loginData.reducer;
