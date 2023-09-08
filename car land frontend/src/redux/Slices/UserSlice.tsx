import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  userGoogleAuth,
  userLogin,
} from "../../services/apis/userApi/userApi";
import { toast } from "react-toastify";
import { Authcheck, user } from "../../interfaces/userAuth";
import { useNavigate } from "react-router";

type UserState = {
  loading: boolean;
  user: user | null;
};
const Navigate=useNavigate()
export const userLoginThunk = createAsyncThunk(
  "User/login",
  async (formValue: object): Promise<any> => {
    try {
      let response: any = await userLogin(formValue);
Navigate('/')
      return response.data.user;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);

export const userGoogleThunk = createAsyncThunk(
  "User/googleAuth",
  async (formValue: object): Promise<any> => {
    try {
      let response: Authcheck | null = await userGoogleAuth(formValue);
      console.log(response.data.user);

      toast.success(response.data.message);
      return response.data.user;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);

const initialUserState: UserState = {
  user: {
    _id: "",
    userName: "",
    email: "",
    password: "",
    googleId: "",
    image: "",
    ban: false,
    verified_email: false,
  },
  loading: false,
};
const userReducer = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    signout: (state) => {
      state.user = null;
    },
    setGoogleAuth: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
    },
    setUser: (state, action: PayloadAction<user>) => {
      state.user = action.payload;      state.loading = false;
    },
    login: (state, action: PayloadAction<user>) => {
      state.user = action.payload
           state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userGoogleThunk.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        userGoogleThunk.fulfilled,
        (state, action: PayloadAction<user>) => {
          state.loading = false;
          state.user = action.payload;        }
      )
      .addCase(userGoogleThunk.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setGoogleAuth, setUser } = userReducer.actions;
export default userReducer.vreducer;
