import api from "../axiosConfig";

export const getPrintersByTechnologyAndMaterialService = async (
    selectedTech: string,
    selectedMat: string,
    selectedColor: string
): Promise<any[]> => {
    try {
        let response = await api.get(
            `/filter?technologyId=${selectedTech}&materialsId=${selectedMat}&colorsId=${selectedColor}`
        );
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

export const getAllPrintersService = async () => {
    try {
        const response = await api.get('/printers');
        return response;
    } catch (error) {
        console.error('Error fetching all printers:', error);
        throw error;
    }
}
