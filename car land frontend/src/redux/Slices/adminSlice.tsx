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
  name: "Admin",
  initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<Admin>) {
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.loading = false;
    },
  },
});

export default adminReducer.vreducer;
export const { setAdmin } = adminReducer.actions;
