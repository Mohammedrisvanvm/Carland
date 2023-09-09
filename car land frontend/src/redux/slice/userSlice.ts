import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Authcheck, user } from "../../interfaces/userAuth";
import { toast } from "react-toastify";
import {
  userGoogleAuth,
  userLogin,
  userOtpVerify,
} from "../../services/apis/userApi/userApi";

interface InitialUser {
  [x: string]: any;
  userName: string | null;
  email: string | null;
  accessToken: string | null | undefined;
  isLoading: boolean;
}

const initialState: InitialUser = {
  userName: null,
  email: null,
  accessToken: null,
  isLoading: false,
};

export const userGoogleThunk: any = createAsyncThunk(
  "user/googleauth",
  async (formValue: Object) => {
    try {
      const response: Authcheck | null = await userGoogleAuth(formValue);
      return response.data.user;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);
export const userLoginThunk: any = createAsyncThunk(
  "user/login",
  async (formValue: number) => {
    const response: Authcheck = await userOtpVerify(formValue);

    return response.data.user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userName = null;
      state.email = null;
      state.accessToken = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGoogleThunk.pending, (state, action) => {
        state.accessToken = null;
        state.email = null;
        state.accessToken = null;
        state.isLoading = true;
      })
      .addCase(
        userGoogleThunk.fulfilled,
        (state, action: PayloadAction<user>) => {
          state.userName = action.payload.userName;
          state.email = action.payload.email;
          state.isLoading = false;
          state.accessToken = action.payload.accessToken;
        }
      )
      .addCase(userGoogleThunk.rejected, (state, action) => {
        state.accessToken = null;
        state.email = null;
        state.accessToken = null;
        state.isLoading = false;
      })
      .addCase(userLoginThunk.pending, (state, action) => {
        state.accessToken = null;
        state.email = null;
        state.accessToken = null;
        state.isLoading = true;
      })
      .addCase(
        userLoginThunk.fulfilled,
        (state, action: PayloadAction<any>) => {
          if (action.payload) {
            state.userName = action.payload.userName;
            state.email = action.payload.email;
            state.isLoading = false;
            state.accessToken = action.payload.accessToken;
          }
        }
      )
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.accessToken = null;
        state.email = null;
        state.accessToken = null;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
export const { userLogout } = userSlice.actions;
