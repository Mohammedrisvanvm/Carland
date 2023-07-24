import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../../services/apis/userApi/userApi";
import { toast } from "react-toastify";

type User = {
  userName: string;
  id: string;
  email: string;
  image: string;
};
export const login: object | number | any = createAsyncThunk(
  "User/login",
  async (formValue: object): Promise<any> => {
    try {


      let response: any = await userLogin(formValue);
     
      return response.data.user;
    } catch (error: any) {
      toast.error(error.response.data.message);
     
    }
  }
);
const user: User = {
  userName: "",
  id: "",
  email: "",
  image: "",
};

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user,
    loading: false,
  },
  reducers: {
    setGoogleAuth: (state, action) => {
      state.user = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state: any, action: any) => {
      state.loading = true;
    },
    [login.fulfilled]: (state: any, action: any) => {
      state.loading = false;
      state.user = action.payload;
    },
    [login.reject]: (state: any, action: any) => {
      state.loading = false;
    },
  },
});

export const { setGoogleAuth,setUser } = UserSlice.actions;

export default UserSlice.reducer;
