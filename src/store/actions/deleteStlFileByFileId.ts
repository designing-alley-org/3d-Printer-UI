import { deleteStlFileByFileIdService } from "../../services/order";


export const deleteStlFileByFileId = async (orderId: string, fileId: string): Promise<void> => {
    try {
        await deleteStlFileByFileIdService(orderId, fileId);
    } catch (error) {
        console.error("Error removing file:", error);
    }
}