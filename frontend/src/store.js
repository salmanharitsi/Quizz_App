import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import quizSlice from "./slices/quizSlice";
import highScoreSlice from "./slices/highScoreSlice";
import timerSlice from "./slices/timerSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        highscore: highScoreSlice,
        quiz: quizSlice,
        timer: timerSlice
    }
})