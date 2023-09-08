import { createSlice } from "@reduxjs/toolkit"

interface InitialVendor{
    userName:string|null
    email:string |null
    accessToken:string|null
    isLoading:boolean
}
const initialState:InitialVendor={
    userName:null,
    email:null,
    accessToken:null,
    isLoading:false
}
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
    }
})

export default vendorSlice.reducer
export const {vendorLogout}=vendorSlice.actions