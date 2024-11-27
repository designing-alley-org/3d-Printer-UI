import { getFilesByOrderIdService, getFileByOrderIdUploadstlService } from "../../services/order"
import { addAllFiles } from "../customizeFilesDetails/reducer"

interface IGetFilesByOrderId {
    orderId: string,
    setFetchFiles: any,
    dispatch: any
}
export const getFilesByOrderId = ({ orderId, setFetchFiles, dispatch }: IGetFilesByOrderId
) => {
    getFilesByOrderIdService(orderId)
        .then((res) => {
            if (!res) {
                res = [];
            }
            setFetchFiles(res)
            dispatch(addAllFiles(res));
        })
        .catch((err) => {
            console.error('Error fetching files:', err);
        })
}


// Function to Get Files and Set State
export const getFilesByOrderIdForUploadstl = async (
    orderId: string,
    setFiles: (files: any[]) => void
) => {
    try {
        const fetchedFiles = await getFileByOrderIdUploadstlService(orderId);
        if (!fetchedFiles || fetchedFiles.length === 0) {
            console.warn("No files found for the provided order ID.");
            return;
        }
        setFiles(fetchedFiles);
    } catch (err) {
        console.error("Error in getFilesByOrderIdForUploadstl:", err);
    }
};