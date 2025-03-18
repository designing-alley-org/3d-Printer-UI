import { toast } from "react-toastify";
import { resetPasswordService } from "../../services/user";

export const changePassword = async (newPassword: string, token: string) => {
    try {
        const response = await resetPasswordService(newPassword, token);
        if(response.status === 200) {
            toast.success(response?.data?.message);
        }
    } catch (error: any) {
        toast.error(error?.response?.data?.message);
    }
}