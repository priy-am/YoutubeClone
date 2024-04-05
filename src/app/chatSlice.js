import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name:"chat",
    initialState:{
        message: [],
    },
    reducers:{
        setMessage:(state,actions)=>{
            state.message.push(actions.payload)
        }
    }
})

export const {setMessage} = chatSlice.actions

export default chatSlice.reducer