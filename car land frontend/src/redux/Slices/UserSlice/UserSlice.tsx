import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../../services/apis/userApi/userApi";

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
        console.log(formValue);
        
      let response: any =await userLogin(formValue);
      console.log(response,1111);
      return response.data.user
    } catch (error) {
    console.log(error);
    
    }
  }
);
const user: User = {
  userName: "",
  id: "",
  email: "",
  image: "",
}

const UserSlice = createSlice({
  name: "User",
  initialState: {
    user,
    loading: false,
  },
  reducers: {},
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

// export const { setUserDetails } = UserSlice.actions;

export default UserSlice.reducer;
