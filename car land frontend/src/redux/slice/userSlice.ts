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
  userName?: string | null;
  email: string | null;
  verifyPhone: boolean | null;
  _id?:string|null
  gender: string | null;
  accessToken: string | null | undefined;
  isLoading: boolean;
}

const initialState: InitialUser = {
  userName: null,
  email: null,
  _id:null,
  accessToken: null,
  isLoading: false,
  verifyPhone: null,
  gender: null,
};

export const userGoogleThunk: any = createAsyncThunk(
  "user/googleauth",
  async (formValue: Object) => {
    try {
      const { data }: Authcheck = await userGoogleAuth(formValue);

      if (data?.user) {
        data.user.accessToken = data.accessToken;
      }

      return data?.user;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);
export const userLoginThunk: any = createAsyncThunk(
  "user/login",
  async (formValue: number) => {
    const { data }: Authcheck = await userOtpVerify(formValue);

    if (data?.user) {
      console.log(data.accessToken);

      data.user.accessToken = data.accessToken;
    }

    return data?.user;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.userName = null;
      state.email = null;
      state._id = null;
      state.accessToken = null;
      state.verifyPhone = null;
      state.accessToken = null;
      state.isLoading = false;
    },
    setVerify:(state)=>{
      state.verifyPhone=true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGoogleThunk.pending, (state, action) => {
        state.accessToken = null;
        state.email = null;
        state._id = null;
        state.accessToken = null;
        state.isLoading = true;
      })
      .addCase(
        userGoogleThunk.fulfilled,
        (state, action: PayloadAction<user>) => {
          state.userName = action.payload.userName;
          state.email = action.payload.email;
          state._id=action.payload._id;
          state.isLoading = false;
          state.verifyPhone = action.payload.verified_phonenumber;
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
            state._id=action.payload._id;
            state.isLoading = false;
            state.accessToken = action.payload.accessToken;
          }
        }
      )
      .addCase(userLoginThunk.rejected, (state, action) => {
        state.accessToken = null;
        state.email = null;
        state.accessToken = null;
        state._id=null;
        state.isLoading = false;
      });
  },
});

export default userSlice.reducer;
export const { userLogout,setVerify } = userSlice.actions;
