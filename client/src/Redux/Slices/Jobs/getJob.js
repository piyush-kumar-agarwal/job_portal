import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
/// action

export const fetchJob = createAsyncThunk('fetchJob',async(jobId)=>{
    try {
        const apiLink = `https://job-portal-backend-z4qx.onrender.com/api-v1/job/${jobId}`;
        const {data} = await axios.get(apiLink);
        return data
    } catch (error) {
        return error.message;
    }
})



// slice

const getJob = createSlice({
    name:'getJob',
    initialState:{
        isLoading:false,
        data:null,
        error:null
    },
    extraReducers:builder=>{
        builder.addCase(fetchJob.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchJob.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchJob.rejected,(state,action)=>{
            state.error = action.error;
            state.data = null;
            state.isLoading = false;
        })
    }
})


export default getJob.reducer;