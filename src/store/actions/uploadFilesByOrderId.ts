import { uploadFilesByOrderIdService } from "../../services/order";
import { saveFile } from "../../utils/indexedDB";

interface IUploadFilesByOrderId {
    orderId: string;
    files: any[];
    setFiles: (files: any[]) => void;
    setActiveTabs: (tabs: number[]) => void;
    navigate: (path: string) => void;
    setIsSaving: (isSaving: boolean) => void;
}

export const uploadFilesByOrderId = async ({
    orderId,
    files,
    setFiles,
    setActiveTabs,
    navigate,
    setIsSaving,
}: IUploadFilesByOrderId): Promise<void> => {
    try {
        setIsSaving(true);

        // Save each file to IndexedDB
        const updatedFiles = await Promise.all(
            files.map(async (file) => {
                const fileUrl = `${file.id}`; 
                await saveFile(fileUrl, file.file); 
                return { ...file, fileUrl }; 
            })
        );

        setFiles(updatedFiles); 

        // Prepare FormData for API upload
        const formData = new FormData();
        updatedFiles.forEach((file) => {
            formData.append("files", file.file);
            formData.append("quantity", file.quantity.toString());
            formData.append("dimensions", JSON.stringify(file.dimensions));
        });

        const response = await uploadFilesByOrderIdService(orderId, formData);

        if (response.status === 200) {
            setFiles([]);
            setActiveTabs([0, 1]); 
            navigate(`${response.data.data._id}/customize`); 
        } else {
            console.warn("Upload failed or invalid response.");
        }
    } catch (error) {
        console.error("Error processing upload action:", error);
        alert("Failed to proceed. Please try again.");
    } finally {
        setIsSaving(false);
    }
};
