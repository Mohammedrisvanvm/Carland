import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'
import { VendorAuth } from "../../../services/apis/vendorApi/venderApi";

export const venderLogin :object | number | any =createAsyncThunk("Vender/venderLogin",async(formValue:object):Promise<any>=>{
    try {
        console.log(formValue);
        
        let response: any = await VendorAuth(formValue);
     
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

    },
    extraReducers:{
        [venderLogin.pending]:(state:any,action:any)=>{
            state.loading=true
        },
        [venderLogin.fullfilled]:(state:any,action:any)=>{
            state.loading=false
            state.user = action.payload;
        },
        [venderLogin.reject]:(state:any,action:any)=>{
            state.loading=false
        },
    }
})

export default VenderSlice.vreducer