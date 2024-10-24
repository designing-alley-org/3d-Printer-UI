/* eslint-disable @typescript-eslint/no-explicit-any */
// registerActions.ts
import { Dispatch } from "redux";
import axios from "axios";
import {  RegisterActionTypes } from "../types";
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./action_types";

export const register = (username: string, password: string) => async (dispatch: Dispatch<RegisterActionTypes>) => {
    dispatch({ type: REGISTER_REQUEST });
    
    try {
        await axios.post("/api/register", { username, password });
        dispatch({ type: REGISTER_SUCCESS });
    } catch (error: any) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response?.data?.message || "Registration failed",
        });
    }
};
