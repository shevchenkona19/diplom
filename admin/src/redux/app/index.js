import { createSlice } from "@reduxjs/toolkit";

const app = createSlice({
	name: "app",
	initialState: {
		isLoading: false,
	},
	reducers: {
		startLoading: (state) => (state.isLoading = true),
		finishLoading: (state) => (state.isLoading = false),
	},
});

export const { startLoading, finishLoading } = app.actions;
export default app.reducer;
