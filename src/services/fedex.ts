import api from "../axiosConfig"

const trackByTrackingNumberService = async (trackingNumber: string) => {
    try {
        const response = await api.get(`/track-shipment/${trackingNumber}`);
        return response.data;
    } catch (error) {
        console.error("Error tracking by tracking number:", error);
        throw error;
    }
}

const returnRequestService = async (shipmentId: string, formData: FormData) => {
    try {
        const response = await api.post(`/return-request/${shipmentId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
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

