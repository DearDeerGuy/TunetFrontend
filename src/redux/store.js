import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slice/userSlice';
import userToLocalStorage from "./middleware/userToLocalStorage";

const store = configureStore({
    reducer: {
        User:userReducer
    },
    middleware:(getDefaultMiddleware)=>[...getDefaultMiddleware(),userToLocalStorage]
})

export default store;