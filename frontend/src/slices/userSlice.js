import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

import axios from 'axios'

export const userSignUp = createAsyncThunk("user/signup", async ({firstname, lastname, email, password}) => {
    const response = await axios.post("http://localhost:5000/api/user/signup", {firstname, lastname, email, password})
    return response.data
})

export const userSignIn = createAsyncThunk("user/signin", async ({email, password}) => {
    const response = await axios.post("http://localhost:5000/api/user/signin", {email, password})
    return response.data
})

export const isValidate = createAsyncThunk("user/auth", async() => {
    const token = localStorage.getItem('QUIZ_USER_TOKEN')
    const response = await axios.post("http://localhost:5000/api/user/auth", 
    {}, {
        headers: {
            "x-access-token": token
        }
    })
    return response.data
})


const userEntity = createEntityAdapter({
    selectId: (user) => user._id
})

const userSlice = createSlice({
    name: "user",
    initialState: userEntity.getInitialState,
    extraReducers: (builder) => {
        builder
            .addCase(userSignUp.fulfilled, (state, action) => {
                userEntity.setOne(state, action.payload);
            })
            .addCase(userSignIn.fulfilled, (state, action) => {
                userEntity.setOne(state, action.payload);
            })
            .addCase(isValidate.fulfilled, (state, action) => {
                userEntity.setOne(state, action.payload)
            })
    }
})

export const userSelectors = userEntity.getSelectors((state) => state.user)
export default userSlice.reducer