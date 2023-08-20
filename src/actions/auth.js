import axios from "axios";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT
} from "../actions/types";

export const checkAuthenticated = () => async (dispatch) => {
    if(localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userInfo')['access']}`,
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')});

        try {
            const res = await axios.post(`http://127.0.0.1:8000/api/users/login`, body, config);

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

//Error in this code
export const load_user = () => async (dispatch) => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('userInfo')['access']}`,
                'Accept': 'application/json'
            }
        }

        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/users/login`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                userLogin: res.data
            });

            console.log('USER_LOADED_SUCCESS')

        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL

            });
            console.log(err)

        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
        console.log('Last access error')
    }
};

export const login = (email, password) => async (dispatch) => {
    const config ={
        headers: {
            "Content-Type":"application/json"
        }
    };

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post(`http://127.0.0.1:8000/api/users/login`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            userLogin: res.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
}

export const logout = () => (dispatch) => {
  dispatch({
        type: LOGOUT
  });
};