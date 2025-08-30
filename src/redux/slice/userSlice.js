import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id:null,
    token:'',
    name:'',
    email:'',
    dateOfBirth:null,
    avatar:null,
    adminLvl:0,
    tariffId:null,
    tariffEndDate:null,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        saveUser(state,action){
            return { ...state, ...action.payload };
        },
        clearUser() {
            return initialState
        }
    }
})


export const {saveUser, clearUser} = userSlice.actions;
export default userSlice.reducer;