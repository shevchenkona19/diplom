import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get, post } from "../../utils/api/index";

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
		token: "",
		isLogin: false,
		userId: -1,
	},
	reducers: {
		setLogin(state, action) {
			state.token = action.payload.token;
			state.isLogin = action.payload.isLogin;
			state.userId = action.payload.userId || -1;
		},
	},
	extraReducers: {
		[login.fulfilled]: (state, action) => {
			state.isLogin = true;
			state.token = action.payload.token;
			state.userId = action.payload.userId;
		},
		[register.fulfilled]: (state, action) => {
			state.isLogin = true;
			state.token = action.payload.token;
			state.userId = action.payload.userId;
		},
	},
});

const { actions, reducer } = auth;
export const { setLogin } = actions;
export { login, register };
export default reducer;
