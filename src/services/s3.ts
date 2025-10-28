import axios from 'axios';
import api from '../axiosConfig';
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
    await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
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
    const response = await api.delete('/api/v1/s3/delete-object', {
      data: { key },
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
 * @param folder The folder in which to upload the file
 * @returns { success: boolean, key: string, url: string }
 */
export const getSignedUrl = async (
  filename: string,
  folder: 'stl' | 'stlImage' | 'image' | 'document',
  contentType: string
): Promise<{
  success: boolean;
  key: string;
  url: string;
  storeUrl: string;
}> => {
  try {
    const response = await api.post('/api/v1/s3/get-put-object-url', {
      filename,
      folder,
      contentType,
    });

    return {
      success: true,
      key: response.data.data.key,
      url: response.data.data.url,
      storeUrl: response.data.data.storeUrl,
    };
  } catch (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }
};
