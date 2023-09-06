import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

interface Admin {
  userName: string;
  id: string;
  email: string;
  image: string;
}

interface Initial {
  admin: Admin;
  loading: boolean;
}

const initialState: Initial = {
  admin: {
    userName: "",
    id: "",
    email: "",
    image: "",
  },
  loading: false,
};

const adminSlice:Slice<Initial> = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<Admin>) {
      state.admin = action.payload;
    },
  },
});

export default adminSlice.vreducer;
export const { setAdmin } = adminSlice.actions;
