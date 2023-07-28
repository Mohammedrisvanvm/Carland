import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../../services/apis/userApi/userApi";
import { toast } from "react-toastify";

interface Initial {
  user:{
    userName: string;
    id: string;
    email: string;
    image: string;
  }
  loading:boolean
}
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
const initialState: Initial = {
  user:{
    userName: "",
    id: "",
    email: "",
    image: "",
  },
  loading:false
 
};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setGoogleAuth: (state, action) => {
      state.user = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [login.reject]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { setGoogleAuth, setUser } = UserSlice.actions;

export default UserSlice.vreducer;
