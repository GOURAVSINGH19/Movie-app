import { createSlice } from "@reduxjs/toolkit";

const initialState={
    info:null
}


const movieSlice =createSlice({
    name:"movieslice",
    initialState,
    reducers:{
        loadmovie:(state,action)=>{
            state.info=action.payload
        },
        removemovie:(state,action)=>{
            state.info=null;
        }
    },
})

export const {loadmovie,removemovie}=movieSlice.actions;
export default movieSlice.reducer;