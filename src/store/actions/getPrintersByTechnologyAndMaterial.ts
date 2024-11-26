import { getPrintersByTechnologyAndMaterialService } from "../../services/printer";

interface IGetPrintersByTechnologyAndMaterial {
    selectedMat: string;
    selectedTech: string;
    setPrinterData: React.Dispatch<any>; 
}

export const getPrintersByTechnologyAndMaterial = async ({
    selectedMat,
    selectedTech,
    setPrinterData,
}: IGetPrintersByTechnologyAndMaterial): Promise<void> => {
    try {
        const res = await getPrintersByTechnologyAndMaterialService(selectedTech, selectedMat);
        setPrinterData(res);
    } catch (err) {
        console.error("Error fetching printer data:", err);
    }
};
