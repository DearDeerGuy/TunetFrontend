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
            const newUser = { ...state, ...action.payload };
            localStorage.setItem("user", JSON.stringify(newUser));
            return newUser;
        },
        clearUser() {
            localStorage.removeItem("user");
            return initialState
        }
    }
})


export const {saveUser, clearUser} = userSlice.actions;
export default userSlice.reducer;