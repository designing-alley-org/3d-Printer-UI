import { Dispatch } from "redux";
import { RegisterActionTypes } from "../types";
import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./action_types";
import api from "../../axiosConfig";
import { NavigateFunction } from "react-router-dom";  
import { toast } from "react-toastify";


export const register = (username: string, email: string, password: string, navigate: NavigateFunction) => async (dispatch: Dispatch<RegisterActionTypes>) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const response =  api.post(`/register`, { name: username, email, password });
        await toast.promise(response, { pending: "Registering...", success: "Registration successful" });
        dispatch({ type: REGISTER_SUCCESS });
        navigate("/login"); // Redirect to login page
        
    } catch (error: any) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response?.data?.message || "Registration failed",
        });
    }
};
