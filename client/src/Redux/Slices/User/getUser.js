import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
//action

export const fetchUser = createAsyncThunk('fetchUser',async(id)=>{
    try {
        const apiLink= `https://job-portal-backend-z4qx.onrender.com/api-v1/user/${id}`;
        const {data} = await axios.get(apiLink);
        return data;
    } catch (error) {
        return error.message;
    }
})


// slice

const userSlice =createSlice({
    name:"userSlice",
    initialState:{
        isLoading:false,
        data:null,
        error:null
    },
    extraReducers:builder=>{
        builder.addCase(fetchUser.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.data=null;
            state.error = action.error;
        })
    }
})


export default userSlice.reducer;