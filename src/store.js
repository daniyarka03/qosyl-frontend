import {createStore, applyMiddleware, combineReducers} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { userLoginReducer } from './reducers/userReducers';


const middleware = [thunk];


const reducer = combineReducers({
    userLogin: userLoginReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null;


const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage,
        isAuthenticated: !!userInfoFromStorage,
    }
};



//const isAuthenticated = localStorage.getItem("access") ? true : false;

const store = configureStore({
    reducer: reducer,
    initialState: initialState,
    devTools: composeWithDevTools(applyMiddleware(...middleware)),
});

console.log(store.getState())

export default store;
