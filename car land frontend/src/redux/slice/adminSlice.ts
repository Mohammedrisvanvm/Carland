import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface InitialAdmin {
  userName?: string | null;
  email?: string | null;
  accessToken?: string | null;
  isLoading?: boolean;
}
const initialState: InitialAdmin = {
  userName: null,
  email: null,
  accessToken: null,
  isLoading: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogout: (state) => {
      state.userName = null;
      state.email = null;
      state.accessToken = null;
      state.isLoading = false;
    },
    setAdmin(state, action: PayloadAction<InitialAdmin>) {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
      state.isLoading = false;
    },
  },
});

export default adminSlice.reducer;
export const { adminLogout, setAdmin } = adminSlice.actions;
