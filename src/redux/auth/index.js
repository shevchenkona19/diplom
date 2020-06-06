import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../../utils/api";

const login = createAsyncThunk("login", async (creds, thunkApi) => {
	const resp = await post("/user/login", creds);
	if (resp.data.success === false) {
		return thunkApi.rejectWithValue(resp.data.error);
	} else return resp.data;
});

const register = createAsyncThunk("register", async (creds, thunkApi) => {
	const resp = await post("/user/register", creds);
	if (resp.data.success === false) {
		return thunkApi.rejectWithValue(resp.data.error);
	} else return resp.data;
});

const auth = createSlice({
	name: "auth",
	initialState: {
		isLogin: true,
		isError: false,
		errorMsg: "",
		isLoading: false,
		token: "",
	},
	reducers: {
		logout: (state) => {
			state.isLogin = false;
			state.token = "";
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setLogin: (state, action) => {
			state.token = action.payload.token;
			state.isLogin = action.payload.isLogin;
		},
	},
	extraReducers: {
		[login.pending](state) {
			state.isError = false;
			state.isLoading = true;
			state.errorMsg = "";
		},
		[login.rejected](state, action) {
			state.isError = true;
			state.errorMsg = action.payload;
			state.isLoading = false;
		},
		[login.fulfilled](state, action) {
			state.isLogin = true;
			state.isLoading = false;
			state.token = action.payload.token;
		},
		[register.pending](state) {
			state.isError = false;
			state.errorMsg = "";
			state.isLoading = true;
		},
		[register.fulfilled](state, action) {
			state.isLoading = false;
			state.isLogin = true;
			state.token = action.payload.token;
		},
		[register.rejected](state, action) {
			state.isLoading = false;
			state.isError = true;
			state.errorMsg = action.payload;
		},
	},
});

const { actions, reducer } = auth;
export const { logout, setLoading, setLogin } = actions;
export { register, login };
export default reducer;
