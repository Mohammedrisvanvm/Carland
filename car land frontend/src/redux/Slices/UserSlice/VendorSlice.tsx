import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import {  VendorOtpVerify } from "../../../services/apis/vendorApi/vendorApi";

export const vendorLogin :object | number | any =createAsyncThunk("Vender/venderLogin",async(formValue:number):Promise<any>=>{
    try {
       console.log(formValue);
       
        
        let response: any = await VendorOtpVerify(formValue);
     console.log(response);
     
      return response.data.user; 
    } catch (error:any) {
        toast.error(error.response.data.message);
    }
})


type vendor={
    userName: string,
    id: string
    email: string,
    image?:string,
}

type adminStore={
    Vendor:vendor|null,
    loading:boolean
}

const initialState: adminStore = {
    Vendor:{
      userName: "",
      id: "",
      email: "",
      image: "",
    },
    loading:false
   
  };

const vendorReducer=createSlice({
    name:"Vendor",
    initialState,
    reducers:{
        signout: (state,action) => {
            state.Vendor =null
        },
},
    extraReducers:(builder)=>{
        builder.addCase(vendorLogin.pending,(state,action)=>{
            state.loading=true
        }).addCase(vendorLogin.fullfilled,(state,action:PayloadAction<vendor>)=>{
            state.loading=false,
            state.Vendor=action.payload
        }).addCase(vendorLogin.rejected,(state,action)=>{
            state.loading=false
        });
    }
})

export default vendorReducer.vreducer
export const {signout}=vendorReducer.actions