import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
//action

export const fetchUserMe = createAsyncThunk('fetchUserMe',async()=>{
    try {
        const apiLink= "https://job-portal-backend-z4qx.onrender.com/api-v1/user/me";
        const {data} = await axios.get(apiLink);
        return data;
    } catch (error) {
        return error.message;
    }
})


// slice

const userMeSilce =createSlice({
    name:"userMe",
    initialState:{
        isLoading:false,
        data:null,
        error:null
    },
    extraReducers:builder=>{
        builder.addCase(fetchUserMe.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchUserMe.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchUserMe.rejected,(state,action)=>{
            state.isLoading = false;
            state.data=null;
            state.error = action.error;
        })
    }
})


export default userMeSilce.reducer;