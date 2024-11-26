import api from "../axiosConfig";

export const getPrintersByTechnologyAndMaterialService = async (
    selectedTech: string,
    selectedMat: string
): Promise<any[]> => {
    try {
        const response = await api.get(
            `/filter?technology=${selectedTech}&materials=${selectedMat}`
        );
        console.log("response", response);
        return response.data.data || []; 
    } catch (error) {
        console.error("Error fetching printer data:", error);
        throw error; 
    }
};
