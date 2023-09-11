import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Action, PayloadAction } from "@reduxjs/toolkit";
import {
  VendorOtpVerify,
  vendorSignOut,
} from "../../services/apis/vendorApi/vendorApi";
import { Authcheck, user } from "../../interfaces/userAuth";
import { toast } from "react-toastify";

interface InitialVendor {
  userName?: string | null;
  email: string | null;
  accessToken: string | null | undefined;
  isLoading: boolean;
}
const initialState: InitialVendor = {
  userName: null,
  email: null,
  accessToken: null,
  isLoading: false,
};

export const vendorLogin: any = createAsyncThunk(
  "vendor/login",
  async (formValue: number) => {
    try {
      const { data }: Authcheck = await VendorOtpVerify(formValue);
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
      (state.accessToken = null), (state.email = null);
      (state.isLoading = false), (state.userName = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(vendorLogin.pending, (state, action) => {
        state.userName = null;
        state.email = null;
        state.accessToken = null;
        state.isLoading = true;
      })
      .addCase(vendorLogin.fulfilled, (state, action: PayloadAction<user>) => {
        state.userName = action.payload.userName;
        state.email = action.payload.email;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
      })
      .addCase(vendorLogin.rejected, (state, action) => {
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
export const { vendorLogout } = vendorSlice.actions;
