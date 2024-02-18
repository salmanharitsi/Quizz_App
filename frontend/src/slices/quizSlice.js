import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";

export const getQuiz = createAsyncThunk(
	"user/quiz",
	async ({ number, category, difficulty, type }) => {

		let categoryApi =
			category === "Any Category" ? "" : `&category=${category}`;
		let difficultyApi =
			difficulty === "Any Difficulty" ? "" : `&difficulty=${difficulty}`;
		let typeApi = type === "Any Type" ? "" : `&type=${type}`;

		const response = await axios.get(
			`https://opentdb.com/api.php?amount=${number}${categoryApi}${difficultyApi}${typeApi}`
		);

		return response.data;
	}
);

const quizEntity = createEntityAdapter({
	selectId: (quiz) => quiz.id,
});

const quizSlice = createSlice({
	name: "quiz",
	initialState: quizEntity.getInitialState,
	extraReducers: (builder) => {
		builder.addCase(getQuiz.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const highScoreSelectors = quizEntity.getSelectors(
	(state) => state.quiz
);
export default quizSlice.reducer;