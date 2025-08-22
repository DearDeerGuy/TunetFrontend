import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:null,
    token:'',
    name:'',
    email:'',
    dateOfBirth:'',
    avatar:null,
    admin_lvl:0,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        saveUser(state,action){
            return action.payload;
        },
        clearUser() {
            return initialState
        }
    }
})


export const {saveUser, clearUser} = userSlice.actions;
export default userSlice.reducer;