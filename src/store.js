import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";

const initialState = {};

const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    initialState: initialState,
    devTools: composeWithDevTools(applyMiddleware(...middleware)),
});

export default store;
