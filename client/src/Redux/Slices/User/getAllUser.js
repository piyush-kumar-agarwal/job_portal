import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
//action
export const fetchAllUser = createAsyncThunk('fetchAllUser',async()=>{
    try {
        const apiLink= "https://job-portal-backend-z4qx.onrender.com/api-v1/user/all";
        const {data} = await axios.get(apiLink);
        return data;
    } catch (error) {
        return error.message;
    }
})


// slice

const allUser =createSlice({
    name:"allUser",
    initialState:{
        isLoading:false,
        data:null,
        error:null
    },
    extraReducers:builder=>{
        builder.addCase(fetchAllUser.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchAllUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchAllUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.data=null;
            state.error = action.error;
        })
    }
})


export default allUser.reducer;