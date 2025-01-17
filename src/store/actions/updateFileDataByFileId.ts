import { useDispatch } from "react-redux";
import {  updateFileDataByFileIdService } from "../../services/order"
import { addAllFiles } from "../customizeFilesDetails/reducer";
import { UseDispatch } from "react-redux";
interface IUpdateFileDataByFileId {
    orderId: string ,
    activeFile: any,
    activeFileId: string,
}
export const updateFileDataByFileId = async ({orderId, activeFile, activeFileId}: IUpdateFileDataByFileId
) => {
    const dispatch = useDispatch();
    const formData = new FormData();
        formData.append('material', activeFile?.material || '');
        formData.append('color', activeFile?.color || '');
        formData.append('printer', activeFile?.printer || '');
        formData.append('infill', activeFile?.infill || '');
        formData.append('unit', activeFile?.unit || '');
        formData.append('technology', activeFile?.technology || '');
        formData.append('weight', activeFile?.weight || '');
    await updateFileDataByFileIdService(orderId, activeFileId, formData)
        .then((res) => {
            if (!res) {
                res = [];
            }
            dispatch(addAllFiles(res));
            console.log('updateFileDataByFileIdService', res);
        })
        .catch((err) => {
            console.error('Error fetching files:', err);
        })
}
