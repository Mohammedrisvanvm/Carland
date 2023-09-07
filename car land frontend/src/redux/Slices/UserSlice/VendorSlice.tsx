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

type initialState={
    vendor:vendor,
    loading:boolean
}

const initialState: initialState = {
    vendor:{
      userName: "",
      id: "",
      email: "",
      image: "",
    },
    loading:false
   
  };

const VenderSlice=createSlice({
    name:"Vendor",
    initialState,
    reducers:{
setVendor(state:any,action:PayloadAction<vendor>){
    state.loading=false
    state.vendor = action.payload;
    },
  

},
    extraReducers:{
        [vendorLogin.pending]:(state,action:PayloadAction<vendor>)=>{
            state.loading=true
        },
        [vendorLogin.fullfilled]:(state,action:PayloadAction<vendor>)=>{
            state.loading=false
            state.vendor = action.payload;
        },
        [vendorLogin.reject]:(state,action:PayloadAction<vendor>)=>{
            state.loading=false
        },
    }
})

export default VenderSlice.vreducer
export const {setVendor}=VenderSlice.actions