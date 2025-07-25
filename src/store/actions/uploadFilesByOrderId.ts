import { updateFileDataByFileIdService, uploadFilesByOrderIdService } from "../../services/order";
import { FileData } from "../../types/uploadFiles";
import { saveFile } from "../../utils/indexedDB";


interface IUploadFilesByOrderId {
    orderId: string;
    files: FileData[];
    setFiles: (files: FileData[]) => void;
    setActiveTabs?: (tabs: number[]) => void;
    navigate: (path: string) => void;
    setIsSaving: (isSaving: boolean) => void;
}

interface UploadResponse {
    status: number;
    data: {
        data: {
            _id: string;
        };
    };
}

const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/;
const SUCCESS_STATUS = 200;

/**
 * Saves files to IndexedDB and returns updated file data
 */
const saveFilesToIndexedDB = async (files: FileData[]): Promise<FileData[]> => {
    return Promise.all(
        files.map(async (file) => {
            const fileUrl = `${file.id}`;
            await saveFile(fileUrl, file.file);
            return { ...file, fileUrl };
        })
    );
};

/**
 * Updates file quantities for existing files in the backend
 */
const updateExistingFileQuantities = async (
    orderId: string, 
    files: FileData[]
): Promise<void> => {
    const existingFiles = files.filter(file => MONGO_ID_REGEX.test(file._id));
    
    const updatePromises = existingFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("quantity", file.quantity.toString());

        try {
            await updateFileDataByFileIdService(orderId, file._id, formData);
        } catch (error) {
            console.error(`Failed to update file with ID: ${file._id}`, error);
            throw error;
        }
    });

    await Promise.all(updatePromises);
};

/**
 * Prepares FormData for file upload
 */
const prepareUploadFormData = (files: FileData[]): FormData => {
    const formData = new FormData();
    
    files.forEach((file) => {
        formData.append("files", file.file);
        formData.append("quantity", file.quantity.toString());
        formData.append("dimensions", JSON.stringify(file.dimensions));
    });

    return formData;
};

/**
 * Uploads new files to the backend
 */
const uploadNewFiles = async (
    orderId: string,
    files: FileData[]
): Promise<UploadResponse> => {
    const newFiles = files.filter(file => file.file);
    
    if (!newFiles.length) {
        throw new Error("No new files to upload");
    }

    const formData = prepareUploadFormData(newFiles);
    const response = await uploadFilesByOrderIdService(orderId, formData);

    if (response.status !== SUCCESS_STATUS) {
        throw new Error("Upload failed or received an invalid response");
    }

    return response;
};

/**
 * Handles the complete file upload workflow
 */
export const uploadFilesByOrderId = async ({
    orderId,
    files,
    setFiles,
    navigate,
    setIsSaving,
}: IUploadFilesByOrderId): Promise<void> => {
    if (!files.length) {
        console.warn("No files to upload");
        return;
    }

    try {
        setIsSaving(true);

        // Step 1: Save files to IndexedDB
        const updatedFiles = await saveFilesToIndexedDB(files);
        setFiles(updatedFiles);

        // Step 2: Update quantities for existing files
        await updateExistingFileQuantities(orderId, updatedFiles);

        // Step 3: Upload new files
        try {
            const response = await uploadNewFiles(orderId, updatedFiles);
            console.log("consolesdfknajksdfkhabsdfkjahjsvs")
            setFiles([]);
            console.log('redirect path', `/get-quotes/${orderId}/customize`);

            navigate(`/get-quotes/${orderId}/customize`);

        } catch (uploadError) {
            console.error("Error during file upload:", uploadError);
            alert("Failed to upload files. Please try again.");
            throw uploadError;
        }

    } catch (error) {
        console.error("Error processing upload action:", error);
        alert("Failed to proceed. Please try again.");
        throw error;
    } finally {
        setIsSaving(false);
    }
};