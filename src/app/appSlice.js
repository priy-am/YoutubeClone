import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name:"app",
    initialState:{
        open: true,
        video:[],
        category:"All",
        serachSuggestion:[],
        input:""
    },
    reducers:{
        toggleSidebar:(state)=>{
            state.open = !state.open;
        },
        setHomevideo:(state,action)=>{
            state.video = action.payload;
        },
        addCategory:(state, action)=>{
            state.category = action.payload;
        },
        completeLine:(state, action)=>{
            state.serachSuggestion = action.payload;
        },
        setinput:(state, action)=>{
            state.input = action.payload;
        }
    }
})

export const {toggleSidebar, setHomevideo, addCategory, completeLine, setinput} = appSlice.actions

export default appSlice.reducer