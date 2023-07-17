import { createSlice } from "@reduxjs/toolkit";

type User={
    firstName :string ,
    id: string ,
    email: string,
    image: string,
    token: string
}
const initialState:User={
firstName:'',
id: '' ,
email: '',
image: '',
token:''
}


const UserSlice= createSlice({
    name:"Users",
    initialState,
    reducers:{
        setUserDetails : (state , action) =>{
            state.firstName = action.payload.name;
            state.id = action.payload.id
            state.email = action.payload.email
            state.image = action.payload?.image
            state.token = action.payload.token
          },
    }
})


export const {setUserDetails}=UserSlice.actions

export default UserSlice.reducer
