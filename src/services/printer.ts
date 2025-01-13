import api from "../axiosConfig";

export const getPrintersByTechnologyAndMaterialService = async (
    selectedTech: string,
    selectedMat: string
): Promise<any[]> => {
    try {
        let response = await api.get(
            `/filter?technology=${selectedTech}&materials=${selectedMat}`
        );
        // Here 0 = inactive and 1 = active
        response.data.data = response.data.data.filter((printer: any) => printer.status === 1);
        return response.data.data || []; 
    } catch (error) {
        console.error("Error fetching printer data:", error);
        throw error; 
    }
};


export const getPrinterByIdService = async (printerId: string) => {
    try {
        const response = await api.get(`/printer-show/${printerId}`);
        return response;
    } catch (error) {
        console.error('Error fetching user printer:', error);
        throw error;
    }
}
