import { updateUserService } from "../../services/user";

export interface User {
    email?: string;
    name?: string;
    phone_no?: string;
}
export const updateUser = async (userData: User) => {
    
        try {
            const response = await updateUserService(userData);
            return response;         
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    };