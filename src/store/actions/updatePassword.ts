import { updatePasswordService } from "../../services/user";



export const updatePassword = async (old_password:string, new_password:string) => {
    try {
        const response = await updatePasswordService( old_password, new_password );
        return response.data;
    } catch (error) {
        throw error;
    }
};

