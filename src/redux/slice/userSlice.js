import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:null,
    token:'',
    name:'',
    email:'',
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