import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { VendorOtpVerify } from "../../services/apis/vendorApi/vendorApi"
import { user } from "../../interfaces/userAuth"


interface InitialVendor{
    userName:string|null
    email:string |null
    accessToken:string|null|undefined
    isLoading:boolean
}
const initialState:InitialVendor={
    userName:null,
    email:null,
    accessToken:null,
    isLoading:false
}

export const vendorLogin:any=createAsyncThunk('vendor/login',async (formValue:number)=>{
    const response:any=await VendorOtpVerify(formValue)
    console.log(response);
    
    return response.data.vendor
}) 
const vendorSlice=createSlice({
    name:'vendor',
    initialState,
    reducers:{
        vendorLogout:state=>{
            state.userName=null
            state.email=null
            state.accessToken=null
            state.isLoading=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(vendorLogin.pending,(state,action)=>{
            state.userName=null
            state.email=null
            state.accessToken=null
            state.isLoading=true
        }).addCase(vendorLogin.fulfilled,(state,action:PayloadAction<user>)=>{
            state.userName=action.payload.userName
            state.email=action.payload.email
            state.accessToken=action.payload.accessToken
            state.isLoading=false
        }).addCase(vendorLogin.rejected,(state,action)=>{
            state.userName=null
            state.email=null
            state.accessToken=null
            state.isLoading=false
        })

    }
})

export default vendorSlice.reducer
export const {vendorLogout}=vendorSlice.actions