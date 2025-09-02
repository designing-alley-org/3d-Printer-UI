import api from "../axiosConfig"
/**
 * Uploads a file to a specified URL with progress tracking
 * @param file The file to upload
 * @param url The URL to upload to
 * @param setProgress Function to update progress percentage
 */
export const uploadFromS3 = async (
    file: File,
    url: string, 
    setProgress: (progress: number) => void
): Promise<void> => {
    try {
        await api.put(url, file, {
            headers: {
                'Content-Type': file.type,
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentCompleted);
                }
            },
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

/**
 * Deletes a file from S3 using its key
 * @param key The S3 object key to delete
 */
export const deleteFromS3 = async (key: string) => {
    try {
        const response = await api.delete('/api/s3/delete', { 
            data: { key } 
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        throw error;
    }
};

/**
 * Gets a signed URL from S3 for file upload
 * @param filename The name of the file to be uploaded
 * @param fileType The MIME type of the file
 * @returns The signed URL for uploading
 */
export const getSignedUrl = async (
    filename: string,
    fileType: string
): Promise<string> => {
    try {
        const response = await api.post('/api/s3/signedUrl', {
            filename,
            fileType
        });
        return response.data.url;
    } catch (error) {
        console.error('Error getting signed URL:', error);
        throw error;
    }
};