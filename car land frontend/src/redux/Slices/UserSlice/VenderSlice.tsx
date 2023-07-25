import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const venderLogin=createAsyncThunk("Vender/venderLogin",async(formValue)=>{
    try {
        
    } catch (error) {
        
    }
})






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

export default VenderSlice.reducer