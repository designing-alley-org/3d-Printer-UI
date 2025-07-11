import toast from "react-hot-toast";
import { sendPasswordResetService } from "../../services/user";

export const sendResetLink = async (email: string) => {
    try {
        const res = await sendPasswordResetService(email);
        if(res.data.message){
            toast.success(res.data.message);
        }
    } catch (error: any) {
        toast.error(error.response.data.message);
    }
};



