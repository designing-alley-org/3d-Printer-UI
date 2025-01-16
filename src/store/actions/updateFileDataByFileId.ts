import {  updateFileDataByFileIdService } from "../../services/order"

interface IUpdateFileDataByFileId {
    orderId: string ,
    activeFile: any,
    activeFileId: string,
}
export const updateFileDataByFileId = ({orderId, activeFile, activeFileId}: IUpdateFileDataByFileId
) => {
    console.log('updateFileDataByFileId',  activeFile, activeFileId)
    const formData = new FormData();
        formData.append('material', activeFile?.material || '');
        formData.append('color', activeFile?.color || '');
        formData.append('printer', activeFile?.printer || '');
        formData.append('infill', activeFile?.infill || '');
        formData.append('unit', activeFile?.unit || '');
        formData.append('technology', activeFile?.technology || '');
        formData.append('weight', activeFile?.weight || '');
    updateFileDataByFileIdService(orderId, activeFileId, formData)
        .then((res) => {
            if (!res) {
                res = [];
            }
        })
        .catch((err) => {
            console.error('Error fetching files:', err);
        })
}
