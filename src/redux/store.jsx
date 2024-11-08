import { configureStore } from "@reduxjs/toolkit";
import dramaReducer from './dramaSlice';
export const store = configureStore({
    reducer :{
       dramas:dramaReducer, 
    }
})