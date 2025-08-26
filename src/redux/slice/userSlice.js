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
            const user = action.payload;
            state.id = user?.id ?? state.id;
            state.token = user?.token ?? state.token;
            state.name = user?.name ?? state.name;
            state.email = user?.email ?? state.email;
            state.dateOfBirth = user?.dateOfBirth ?? state.dateOfBirth;
            state.avatar = user?.avatar ?? state.avatar;
            state.adminLvl = user?.adminLvl ?? state.adminLvl;
            state.tariffId = user?.tariffId ?? state.tariffId;
            state.tariffEndDate = user?.tariffEndDate ?? state.tariffEndDate;
        },
        clearUser() {
            return initialState
        }
    }
})


export const {saveUser, clearUser} = userSlice.actions;
export default userSlice.reducer;