import { getPrinterByIdService } from "../../services/printer";

export const getPrinterById = async (printerId: string, setPrinterName: any) => {
    try {
        const response = await getPrinterByIdService(printerId);
        setPrinterName(response.data?.data?.name || '');
    } catch (error) {
        console.error('Error fetching user printer:', error);
        throw error;
    }
}