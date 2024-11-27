import { useNavigate } from "react-router-dom";
import { CreateAddressService } from "../../services/address";

const createAddress = async (data: any) => {
    const navigate = useNavigate();

    try {
        const response = await CreateAddressService(data);
        if (response.status === 201) {
            navigate(`/get-quotes/${data.orderId}/checkout/select-delivery`);
        }
    } catch (error) {
        console.error("Error in handleProceed:", error);
    }
};


export { createAddress };