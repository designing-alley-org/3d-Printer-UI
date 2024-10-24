/* eslint-disable @typescript-eslint/no-explicit-any */
// authActions.ts
import { Dispatch } from "redux";
import axios from "axios";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "./action_types";
import { AuthActionTypes } from "../types";

export const login = (username: string, password: string) => async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: LOGIN_REQUEST });
    
    try {
        const response = await axios.post(`api/v1/login`, { username, password });
        const user = response.data;
        dispatch({
            type: LOGIN_SUCCESS,
            payload: user,
        });
    } catch (error: any) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response?.data?.message || "Login failed",
        });
    }
};
