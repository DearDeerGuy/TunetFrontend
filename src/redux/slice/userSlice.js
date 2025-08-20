import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name:''
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        addUser(state,action){
            state.name=action.payload;
        }
    }
})


export const actions = userSlice.actions;
export default userSlice.reducer;