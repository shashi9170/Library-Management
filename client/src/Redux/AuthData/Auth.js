import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: 0,
  name: "",
  adhar: "",
  mobile: "",
  study: "",
  dob: "",
  address: "",
  gender: "",
  image: "",
  flag: false,
};

const AuthSlice = createSlice({
  name: "AuthenticFlag",
  initialState,

  reducers: {
    ResetAuthenticData: (state) => {
      state._id = 0;
      state.name = "";
      state.adhar = "";
      state.mobile = "";
      state.study = "";
      state.dob = "";
      state.address = "";
      state.gender = "";
      state.image = "";
      state.flag = false;
    },

    Authentic: (state, action) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.adhar = action.payload.adhar;
      state.mobile = action.payload.mobile;
      state.study = action.payload.study;
      state.dob = action.payload.dob;
      state.address = action.payload.address;
      state.gender = action.payload.gender;
      state.image = action.payload.image;
      state.flag = true;
    },
  },
});

export const { Authentic ,ResetAuthenticData} = AuthSlice.actions;

export default AuthSlice.reducer;
