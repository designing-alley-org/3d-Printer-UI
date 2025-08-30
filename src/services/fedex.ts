import toast from "react-hot-toast";
import api from "../axiosConfig"

const trackByTrackingNumberService = async (trackingNumber: string, setTrackingError: (error: any) => void) => {
    try {
        const response = await api.get(`/track-shipment/${trackingNumber}`);
        return response.data;
    } catch (error: any) {
        console.error("Error tracking by tracking number:", error);
        setTrackingError(error.response.data.message);
        throw error;
    }
}

const returnRequestService = async (shipmentId: string, formData: FormData, setOrdersData: (data: any) => void, returnOrderId: string) => {
    try {
        const response = await api.post(`/return-request/${shipmentId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        toast.success("Return request submitted successfully!");
        setOrdersData((prevData: any) => {
            if (prevData) {
                return {
                    ...prevData,
                    orders: prevData.orders.map((order: any) =>
                        order._id === returnOrderId ? { ...order, returnCreated: {
                            created: true,
                            status:'return_requested'
                        } } : order
                    ),
                };
            }
            return prevData;
        });
        return response.data;
    } catch (error) {
        console.error("Error with return request:", error);
        throw error;
    }
}

export  {
    trackByTrackingNumberService,
    returnRequestService
}

