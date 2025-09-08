import { getPrintersByTechnologyAndMaterialService } from "../../services/printer";

interface IGetPrintersByTechnologyAndMaterial {
    materialId: string;
    technologyId: string;
    colorId: string;
    setPrinterData: React.Dispatch<any>; 
    setPrinterMessage: React.Dispatch<string>;
}

export const getPrintersByTechnologyAndMaterial = async ({
    materialId,
    technologyId,
    colorId,
    setPrinterData,
    setPrinterMessage,
}: IGetPrintersByTechnologyAndMaterial): Promise<void> => {
    try {
        const res = await getPrintersByTechnologyAndMaterialService(technologyId, materialId, colorId);
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
