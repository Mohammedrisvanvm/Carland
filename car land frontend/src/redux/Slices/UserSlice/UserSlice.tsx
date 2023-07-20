import { createSlice } from "@reduxjs/toolkit";

type User = {
  userName: string;
  id: string;
  email: string;
  image: string;
  token: string;
};
const initialState: User = {
  userName: "",
  id: "",
  email: "",
  image: "",
  token: "",
};

const UserSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.userName = action.payload.userName;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.image = action.payload?.image;
      state.token = action.payload.token;
    },
  },
});

export const { setUserDetails } = UserSlice.actions;

export default UserSlice.reducer;
