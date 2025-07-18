import { dimensionLabel } from "../../pages/UploadStlTab/UploadStlCardFileStyle"
import { getFilesByOrderIdService, getFileByOrderIdUploadstlService } from "../../services/order"
import { addAllFiles, FileDetail } from "../customizeFilesDetails/reducer"

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
            dispatch(addAllFiles(res as FileDetail[]));
        })
        .catch((err) => {
            console.error('Error fetching files:', err);
        })
}


// Function to Get Files and Set State
export const getFilesByOrderIdForUploadstl = async (
    orderId: string,
) => {
    try {
        const fetchedFiles = await getFileByOrderIdUploadstlService(orderId);
        if (!fetchedFiles || fetchedFiles.length === 0) {
            console.warn("No files found for the provided order ID.");
            return;
        }
        // Todo : check file data unit if it mm then no change if inch then convert to mm and update and

        const updatedFiles = fetchedFiles.map((file: { dimensions: number[], unit: string }) => {
            if (file.unit === "inch") {
                // Conversion logic: 1 inch = 25.4 mm
                const convertedFile = {
                    ...file,
                    dimensions: {
                        ...file.dimensions,
                        height: file.dimensions.height * 25.4,
                        length: file.dimensions.length * 25.4,
                        width: file.dimensions.width * 25.4,
                    },
                    unit: "mm", 
                };
                return convertedFile;
            }
            return file; 
        });
        return updatedFiles;
        
    } catch (err) {
        console.error("Error in getFilesByOrderIdForUploadstl:", err);
    }
};