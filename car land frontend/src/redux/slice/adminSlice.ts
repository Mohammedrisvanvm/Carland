import { createSlice } from "@reduxjs/toolkit"

interface InitialAdmin{
    userName:string|null
    email:string |null
    accessToken:string|null
    isLoading:boolean
}
const initialState:InitialAdmin={
    userName:null,
    email:null,
    accessToken:null,
    isLoading:false
}

const adminSlice=createSlice({
    name:'admin',
    initialState,
    reducers:{
        adminLogout:state=>{
            state.userName=null
            state.email=null
            state.accessToken=null
            state.isLoading=false
        }
    }
})

export default adminSlice.reducer
export const {adminLogout}=adminSlice.actions