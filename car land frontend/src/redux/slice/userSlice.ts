import { createSlice } from "@reduxjs/toolkit"

interface InitialUser{
    userName:string|null
    email:string |null
    accessToken:string|null
    isLoading:boolean
}


const initialState:InitialUser={
    userName:null,
    email:null,
    accessToken:null,
    isLoading:false
}




const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
userLogout:state=>{
    state.userName=null
    state.email=null
    state.accessToken=null
    state.isLoading=false
}
}
    
})

export default userSlice.reducer
export const {userLogout}=userSlice.actions