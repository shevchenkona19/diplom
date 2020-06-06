import { configureStore } from "@reduxjs/toolkit";
import app from "./app";
import auth from "./auth";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistAppConfig = {
	key: "app",
	storage,
};

const persistAuthConfig = {
	key: "auth",
	storage,
};

export default () => {
	const store = configureStore({
		reducer: {
			app: persistReducer(persistAppConfig, app),
			auth: persistReducer(persistAuthConfig, auth),
		},
	});
	const persistor = persistStore(store);
	return { store, persistor };
};
