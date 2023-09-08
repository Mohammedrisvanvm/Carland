import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  id: string;
  email: string;
  loading?: boolean;
}

const initialState: Admin = {
  id: "",
  email: "",
  loading: false,
};

const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<Admin>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.loading = false;
    },
  },
});

export const { setAdmin } = adminReducer.actions;
export default adminReducer.vreducer;
