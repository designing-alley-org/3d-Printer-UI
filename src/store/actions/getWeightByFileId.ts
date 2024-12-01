import { getWeightByFileIdService } from "../../services/order";
import { updateWeight } from "../customizeFilesDetails/reducer";

interface IGetWeightByFileId {
    orderId: string;
    setWeight: React.Dispatch<React.SetStateAction<number | null>>;
    dispatch: React.Dispatch<any>; 
    activeFileId: string;
    selectedMat: string;
    materialMass: number;
}

export const getWeightByFileId = async ({
    orderId,
    setWeight,
    activeFileId,
    selectedMat,
    materialMass,
    dispatch,
}: IGetWeightByFileId): Promise<void> => {
    const payload = {
        material_name: selectedMat,
        material_mass: materialMass,
    };

    try {
        const weight = await getWeightByFileIdService(orderId, activeFileId, payload);
        if (weight === undefined) {
            console.warn("Weight data is missing");
            return;
        }
        setWeight(weight);
        dispatch(updateWeight({ id: activeFileId, weight: weight }));
    } catch (err) {
        console.error("Error in getWeightByFileId:", err);
    }
};
