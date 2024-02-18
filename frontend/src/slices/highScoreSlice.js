import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

import axios from 'axios'

export const getHighScore = createAsyncThunk("user/highscore", async () => {
    const token = localStorage.getItem("QUIZ_USER_TOKEN")

    const response = await axios.post("http://localhost:5000/api/user/highscore", {}, 
    {
        headers: {
            "x-access-token": token,
        },
    })
    return response.data
})

const highScoreEntity = createEntityAdapter({
    selectId: (user) => user._id
})

const highScoreSlice = createSlice({
    name: "highscore",
    initialState: highScoreEntity.getInitialState,
    extraReducers: (builder) => {
        builder
            .addCase(getHighScore.fulfilled, (state, action) => {
                highScoreEntity.setOne(state, action.payload);
            })
    }
})

export const highScoreSelectors = highScoreEntity.getSelectors((state) => state.highscore)
export default highScoreSlice.reducer