import { getPrintersByTechnologyAndMaterialService } from "../../services/printer";

interface IGetPrintersByTechnologyAndMaterial {
    selectedMat: string;
    selectedTech: string;
    setPrinterData: React.Dispatch<any>; 
    setPrinterMessage: React.Dispatch<string>;
}

export const getPrintersByTechnologyAndMaterial = async ({
    selectedMat,
    selectedTech,
    setPrinterData,
    setPrinterMessage,
}: IGetPrintersByTechnologyAndMaterial): Promise<void> => {
    try {
        const res = await getPrintersByTechnologyAndMaterialService(selectedTech, selectedMat);
        if (res.length === 0) {
            setPrinterMessage("No printers found with the selected technology and material");
        } else {
            setPrinterMessage("");
        }
        setPrinterData(res);
    } catch (err) {
        console.error("Error fetching printer data:", err);
    }
};
