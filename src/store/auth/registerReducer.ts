// registerReducer.ts
import { RegisterState, RegisterActionTypes, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from "../types";

const initialState: RegisterState = {
    loading: false,
    success: false,
    error: null,
};

export const registerReducer = (state = initialState, action: RegisterActionTypes): RegisterState => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
