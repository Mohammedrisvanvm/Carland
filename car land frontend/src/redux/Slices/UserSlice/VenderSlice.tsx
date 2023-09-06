import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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


const vender={
    userName: "",
    id: "",
    email: "",
    image: "",
}



const VenderSlice=createSlice({
    name:"Vender",
    initialState:{
        vender,
        loading:false
    },
    reducers:{
vendorLogin(state:any,action:any){
    state.loading=false
    state.user = action.payload;
    },
},
    extraReducers:{
        [vendorLogin.pending]:(state:any,action:any)=>{
            state.loading=true
        },
        [vendorLogin.fullfilled]:(state:any,action:any)=>{
            state.loading=false
            state.user = action.payload;
        },
        [vendorLogin.reject]:(state:any,action:any)=>{
            state.loading=false
        },
    }
})

export default VenderSlice.caseReducers