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

export  {
    trackByTrackingNumberService
}