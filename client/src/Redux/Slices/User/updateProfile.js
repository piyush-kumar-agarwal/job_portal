import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
//action

export const fetchUpadetUser = createAsyncThunk('fetchUpadetUser',async(updateData)=>{
    try {
        const apiLink= `https://job-portal-backend-z4qx.onrender.com/api-v1/user/${updateData.id}`;
        const {data} = await axios.put(apiLink,updateData);
        return data;
    } catch (error) {
        return error.message;
    }
})


// slice

const upadetUser =createSlice({
    name:"upadetUser",
    initialState:{
        isLoading:false,
        data:null,
        error:null
    },
    extraReducers:builder=>{
        builder.addCase(fetchUpadetUser.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchUpadetUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchUpadetUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.data=null;
            state.error = action.error;
        })
    }
})


export default upadetUser.reducer;