import { updateFileDataByFileIdService } from "../../services/order"

interface IUpdateFileDataByFileId {
    orderId: string,
    activeFile: any,
    activeFileId: string,
    dispatch: React.Dispatch<any>
}
export const updateFileDataByFileId = async ({orderId, activeFile, activeFileId, dispatch}: IUpdateFileDataByFileId
) => {
    try {
        const payload = {
            material: activeFile?.material || '',
            color: activeFile?.color || '',
            printer: activeFile?.printer || '',
            infill: activeFile?.infill || '',
            unit: activeFile?.unit || '',
            technology: activeFile?.technology || '',
            weight: activeFile?.weight || '',
        };
        const res = await updateFileDataByFileIdService(orderId, activeFileId, payload);
        
    } catch (err) {
        console.error('Error fetching files:', err);
    }
}

