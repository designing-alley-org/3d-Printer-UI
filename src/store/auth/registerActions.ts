/* eslint-disable @typescript-eslint/no-explicit-any */
// registerActions.ts
import { Dispatch } from "redux";
import { RegisterActionTypes } from "../types";
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./action_types";
import api from "../../axiosConfig";
import { NavigateFunction } from "react-router-dom";  // Import NavigateFunction

export const register = (username: string, email: string, password: string, navigate: NavigateFunction) => async (dispatch: Dispatch<RegisterActionTypes>) => {
    dispatch({ type: REGISTER_REQUEST });
    
    try {
        await api.post("/register", { name: username, email, password });
        dispatch({ type: REGISTER_SUCCESS });
        
        // Use navigate to redirect after successful registration
        navigate("/login"); // Redirect to the login page or wherever needed
        
    } catch (error: any) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response?.data?.message || "Registration failed",
        });
    }
};
