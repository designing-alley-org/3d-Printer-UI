import { scaleTheFileByNewDimensionsService } from "../../services/order";

interface IScaleTheFileByNewDimensions {
    orderId: string;
    activeFileId: string;
    updateLength: number;
    updateWidth: number;
    updateHeight: number;
    selectUnit: string;
}

export const scaleTheFileByNewDimensions = async ({
    orderId,
    updateLength,
    updateWidth,
    activeFileId,
    updateHeight,
    selectUnit,
}: IScaleTheFileByNewDimensions): Promise<void> => {
    const payload = {
        new_length: updateLength,
        new_width: updateWidth,
        new_height: updateHeight,
        unit: selectUnit,
      };

    try {
        const response = await scaleTheFileByNewDimensionsService(orderId, activeFileId, payload);
        if (response === undefined) {
            console.warn("Weight data is missing");
            return;
        }
    } catch (err) {
        console.error("Error in getWeightByFileId:", err);
    }
};
