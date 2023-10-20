import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
} from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    };

    const { data } = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/users/login/`,
      { email: email, password: password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error)
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/users/register/`,
        {
          "name": name,
          "email": email,
          "password": password,
          "hobbies": "",
          "speciality": "",
          "study_place": "",
          "avatar": `images/students_club/defaultAvatar.png`,
        },
        config
    );



    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
    })

    localStorage.setItem("userInfo", JSON.stringify(data));
    window.location.replace("/profile");

  } catch (error) {
    console.log(error)
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
          error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};
