import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const auth = createSlice({
	name: "app",
	initialState: {
		isLoading: false,
		selectedEvent: {},
	},
	reducers: {
		setLoading(state, action) {
			state.isLoading = action.payload.isLoading;
		},
		selectEvent(state, action) {
			state.selectedEvent = action.payload;
		},
	},
});

const { actions, reducer } = auth;
export const { setLoading, selectEvent } = actions;
export default reducer;
