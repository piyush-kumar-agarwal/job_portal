import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios  from "axios";
//action

export const fetchLoginUser = createAsyncThunk('fetchLoginUser',async(userData)=>{
    try {
        console.log(userData,"api time")
        const apiLink = "https://job-portal-backend-z4qx.onrender.com/api-v1/user/login";
        const {data} = await axios.post(apiLink,userData);
        return data;
    } catch (error) {
        return error.message;
    }
})


/// sclice 
const userLoginSlice = createSlice({
    name:'userLogin',
    initialState:{
        isLoading:false,
        data:null,
        error:null
    },
    extraReducers:builder=>{
        builder.addCase(fetchLoginUser.pending,(state)=>{
            state.isLoading = true;
        })
        builder.addCase(fetchLoginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.data = action.payload;
            state.error = null;
        })
        builder.addCase(fetchLoginUser.rejected,(state,action)=>{
            state.error = action.error;
            state.data = null;
            state.isLoading = false;
        })
    }
})


export default userLoginSlice.reducer;