import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Action, PayloadAction } from "@reduxjs/toolkit";
import {
  VendorOtpVerify,
  vendorSignOut,
} from "../../services/apis/vendorApi/vendorApi";
import { Authcheck, hub, user } from "../../interfaces/userAuth";
import { toast } from "react-toastify";


interface InitialVendor {
  id:string|null
  userName?: string | null;
  email: string | null;
  accessToken: string | null | undefined;
  hubId?:string|null
  isLoading: boolean;
}
const initialState: InitialVendor = {
  id:null,
  userName: null,
  email: null,
  accessToken: null,
  hubId:null,
  isLoading: false,
};
interface hubId{
  _id: string  | undefined;

}
export const vendorLogin: any = createAsyncThunk(
  "vendor/login",
  async (formValue: number) => {
    try {
      const { data }: Authcheck|any = await VendorOtpVerify(formValue);
      if (data.vendor) {
        data.vendor.accessToken = data.accessToken;
      }

      return data.vendor;
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }
);
// export const vendorLogout = createAsyncThunk("vendor/logout", async (hai:string) => {
//     console.log(hai);

//   const response: Authcheck = await vendorSignOut();
//   return response?.data.message;
// });
const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    vendorLogout: (state) => {
      (state.id=null),
      (state.accessToken = null), (state.email = null);
      (state.isLoading = false), (state.userName = null);
    },
    addhubId:(state,action:PayloadAction<hub>)=>{
      state.hubId=action.payload._id
    },
    rmhubId:(state)=>{
      state.hubId=null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(vendorLogin.pending, (state, action) => {
        state.userName = null;
        state.id=null
        state.email = null;
        state.accessToken = null;
        state.isLoading = true;
      })
      .addCase(vendorLogin.fulfilled, (state, action: PayloadAction<user>) => {
        state.id=action.payload._id
        state.userName = action.payload.userName;
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(vendorLogin.rejected, (state, action) => {
        state.id=null
        state.userName = null;
        state.email = null;
        state.accessToken = null;
        state.isLoading = false;
      });
    //   .addCase(vendorLogout.pending, (state, action) => {
    //     state.userName = null;
    //     state.email = null;
    //     state.accessToken = null;
    //     state.isLoading = true;
    //   })
    //   .addCase(vendorLogout.fulfilled, (state, action) => {
    //     state.userName = null;
    //     state.email = null;
    //     state.accessToken = null;
    //     state.isLoading = false;
    //   })
    //   .addCase(vendorLogout.rejected, (state, action) => {
    //     state.userName = null;
    //     state.email = null;
    //     state.accessToken = null;
    //     state.isLoading = false;
    //   });
  },
});
export default vendorSlice.reducer;
export const { vendorLogout,addhubId,rmhubId } = vendorSlice.actions;
