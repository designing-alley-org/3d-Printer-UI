import { updateFileDataByFileIdService, uploadFilesByOrderIdService } from "../../services/order";
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

        // Update file quantities for existing files in the backend
        const updateFileQuantity = updatedFiles.filter((file) => /^[0-9a-fA-F]{24}$/.test(file._id));
        for (const file of updateFileQuantity) {
            const formData = new FormData();
            formData.append("quantity", file.quantity.toString());

            try {
                await updateFileDataByFileIdService(orderId, file._id, formData);
            } catch (err) {
                console.error(`Failed to update file with ID: ${file._id}`, err);
            }
        }

        // Filter files to upload and prepare the upload request
        const filesToUpload = updatedFiles.filter((file) => file.file);
                const formData = new FormData();
            filesToUpload.forEach((file) => {
                formData.append("files", file.file);
                formData.append("quantity", file.quantity.toString());
                formData.append("dimensions", JSON.stringify(file.dimensions));
            });

            try {
                const response = await uploadFilesByOrderIdService(orderId, formData);

                if (response.status === 200) {
                    console.log("Files uploaded successfully!", response);
                    setFiles([]);
                    setActiveTabs([0, 1]);
                    navigate(`${response.data.data._id}/customize`);
                } else {
                    console.warn("Upload failed or received an invalid response.");
                }
            } catch (err) {
                console.error("Error during file upload:", err);
                alert("Failed to upload files. Please try again.");
            }
        
    } catch (error) {
        console.error("Error processing upload action:", error);
        alert("Failed to proceed. Please try again.");
    } finally {
        setIsSaving(false);
    }
};
