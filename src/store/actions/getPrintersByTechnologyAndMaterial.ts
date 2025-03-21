import { getPrintersByTechnologyAndMaterialService } from "../../services/printer";

interface IGetPrintersByTechnologyAndMaterial {
    material: string;
    technology: string;
    setPrinterData: React.Dispatch<any>; 
    setPrinterMessage: React.Dispatch<string>;
}

export const getPrintersByTechnologyAndMaterial = async ({
    material,
    technology,
    setPrinterData,
    setPrinterMessage,
}: IGetPrintersByTechnologyAndMaterial): Promise<void> => {
    try {
        const res = await getPrintersByTechnologyAndMaterialService(technology, material);
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
