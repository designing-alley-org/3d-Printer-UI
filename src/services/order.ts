import toast from "react-hot-toast";
import api from "../axiosConfig";
import { getSignedUrl, uploadFromS3, deleteFromS3 } from "./s3";
import { createFile } from "./filesService";
import { FileData } from "../types/uploadFiles";
import { returnError, returnResponse } from "../utils/function";
import { addDataSpec } from "../store/customizeFilesDetails/SpecificationReducer";

// New Api 

const createOrderService = async () => {
    try {
        const response = await api.post(`/create-order`);
        return response;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

// Service to call the API for getting order by ID
const getOrderService = async (orderId: string) => {
    try {
      const response = await api.get(`/order-show/${orderId}`);
      return response;
    } catch (error) {
      console.error('Error fetching user order:', error);
      throw error;
    }
  };

const getAllOrdersService = async ({ page, limit, orderId, status }: { page?: number, limit?: number, orderId?: string, status?: string } = {}) => {
    try {
        const params: any = {};
        
        if (page !== undefined) params.page = page;
        if (limit !== undefined) params.limit = limit;
        if (orderId) params.orderId = orderId;
        if (status) params.status = status;

        const response = await api.get('/get-all-orders', { params });
        return response;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};


const downloadFileFromS3Service = async (s3Url: string, setProgress: (progress: number) => void, setIsDownloading: (isDownloading: boolean) => void): Promise<void> => {
    try {
        setIsDownloading(true);
        setProgress(0);

        // Start fetch request to S3
        const response = await fetch(s3Url);

        if (!response.ok) {
            throw new Error(`Failed to download from S3. Status: ${response.status}`);
        }
        
        // Get the total size of the file
        const contentLength = response.headers.get('Content-Length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;
        
        // Create a reader from the response body
        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error('Failed to get response reader from S3');
        }
        
        // Track downloaded bytes
        let receivedBytes = 0;
        const chunks: Uint8Array[] = [];
        
        // Read the data chunks and track progress
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
                break;
            }
            
            chunks.push(value);
            receivedBytes += value.length;
            
            // Update progress
            if (total > 0) {
                const progress = Math.round((receivedBytes / total) * 100);
                setProgress(progress);
            }
        }
        
        // Concatenate the chunks into a single Uint8Array
        const allChunks = new Uint8Array(receivedBytes);
        let position = 0;
        for (const chunk of chunks) {
            allChunks.set(chunk, position);
            position += chunk.length;
        }
        
        // Create a blob from the data
        const blob = new Blob([allChunks]);
        
        // Extract filename from S3 URL and clean it
        const extractFilenameFromS3Url = (url: string): string => {
            try {
                const urlObj = new URL(url);
                const pathname = urlObj.pathname;
                // Get the last part of the path (filename)
                let filename = pathname.split('/').pop() || 'download';
                
                // Remove AWS-specific prefixes and suffixes, keep only the meaningful part
                // Remove timestamps, UUIDs, and other AWS artifacts
                filename = filename.replace(/^\d+-/, ''); // Remove leading timestamp
                filename = filename.replace(/-[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi, ''); // Remove UUIDs
                filename = filename.replace(/^[a-f0-9]{32}-/, ''); // Remove MD5 hashes
                filename = filename.replace(/\.[^.]+$/, ''); // Remove current extension
                
                // Ensure .stl extension
                return `${filename}.stl`;
            } catch (error) {
                console.error('Error extracting filename from URL:', error);
                return 'download.stl';
            }
        };
        
        const filename = extractFilenameFromS3Url(s3Url);
        
        // Create download link and trigger download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        toast.success(`File "${filename}" downloaded successfully!`);
    } catch (error) {
        toast.error('Something went wrong while downloading the file.');
        console.error('Error downloading file from S3:', error);
        throw error;
    } finally {
        setIsDownloading(false);
        setProgress(0);
    }
};
 
const uploadFilesService = async (
    orderId: string,
    stlFile: File,
    stlImage: File,
    dimensions: { length: number; width: number; height: number },
    quantity: number,
    setProgress: (progress: number) => void,
    unit: string,
    setFiles: React.Dispatch<React.SetStateAction<FileData[]>>,
    localFileId: string
) => {
    let stlFileKey: string | null = null;
    let imageFileKey: string | null = null;

    try {
        // Set initial progress
        setProgress(0);
        // Get signed URLs for both STL file and image
        const [stlSignedUrl, imageSignedUrl] = await Promise.all([

            // content type
            getSignedUrl(stlFile.name , 'stl', stlFile.type),
            getSignedUrl(stlImage.name, 'stlImage', stlImage.type)
        ]);

        setProgress(10);


        // Extract URLs and keys from the returned objects
        // getSignedUrl returns { success: boolean, key: string, url: string }
        stlFileKey = stlSignedUrl.key;
        imageFileKey = imageSignedUrl.key;
        
        // Get the actual URLs from the returned objects
        const stlUploadUrl = stlSignedUrl.url;
        const imageUploadUrl = imageSignedUrl.url;


        // Upload both files to S3 with progress tracking
        let stlProgress = 0;
        let imageProgress = 0;

        const updateCombinedProgress = () => {
            const combinedProgress = 10 + ((stlProgress + imageProgress) / 2) * 0.7; // 70% for uploads
            setProgress(Math.round(combinedProgress));
        };

        await Promise.all([
            uploadFromS3(stlFile, stlUploadUrl, (progress) => {
                stlProgress = progress;
                updateCombinedProgress();
            }),
            uploadFromS3(stlImage, imageUploadUrl, (progress) => {
                imageProgress = progress;
                updateCombinedProgress();
            })
        ]);

        setProgress(80);

       
        // Prepare file data for order update
        const fileData = {
            fileName: stlFile.name,
            fileUrl: stlSignedUrl.storeUrl,
            thumbnailUrl: imageSignedUrl.storeUrl,
            dimensions: dimensions,
            quantity: quantity,
            unit: unit
        };

        // Update order with file data
        const response = await createFile(orderId, fileData as any);
        setFiles(prev => 
            prev.map(file =>
                file._id === localFileId ? { ...file, _id: response._id, fileUrl: response.fileUrl, thumbnailUrl: response.thumbnailUrl } : file
            )
        );

        setProgress(100);
        
        return response;
    } catch (error) {
        console.error('Error uploading files:', error);
        
        // Cleanup S3 files if they were uploaded but DB update failed
        const cleanupPromises: Promise<any>[] = [];
        
        if (stlFileKey) {
            cleanupPromises.push(
                deleteFromS3(stlFileKey).catch(deleteError => 
                    console.error('Error deleting STL file from S3:', deleteError)
                )
            );
        }
        
        if (imageFileKey) {
            cleanupPromises.push(
                deleteFromS3(imageFileKey).catch(deleteError => 
                    console.error('Error deleting image file from S3:', deleteError)
                )
            );
        }
        
        // Wait for cleanup to complete (but don't throw if cleanup fails)
        if (cleanupPromises.length > 0) {
            try {
                await Promise.all(cleanupPromises);
                console.log('S3 cleanup completed successfully');
            } catch (cleanupError) {
                console.error('Some S3 cleanup operations failed:', cleanupError);
            }
        }
        
        toast.error('Failed to upload files. Please try again.');
        throw error;
    }
};

const updateTotalWeightService = async (orderId: string, navigate: any) => {
    try {
        const response = await api.patch(`/update-total-weight/${orderId}`);
        navigate(`/get-quotes/${orderId}/price`);
        return response;
    } catch (error) {
        toast.error(returnError(error));
        throw error;
    }
}

const updateOrderService = async (orderId: string, data: object) => {
    try {
        const response = await api.put(
            `/update-order/${orderId}`,
            data
        );
        return returnResponse(response);
    } catch (error: any) {
        toast.error(returnError(error));
        throw error;
    }
}

const getOrderSummaryService = async (orderId: string, setIsLoading: (loading: boolean) => void, setError: (error: string | null) => void) => {
    try {
        const response = await api.get(`/order-summary/${orderId}`);
        return returnResponse(response);
    } catch (error) {
        setError(returnError(error));
        throw error;
    } finally {
        setIsLoading(false);
    }
}

const getCMT_DataService = async (dispatch: any) => {
    try {
        const response = await api.get(`/api/v1/cmt`);
        dispatch(addDataSpec(returnResponse(response)));
        return returnResponse(response);
    } catch (error) {
        toast.error(returnError(error));
        console.error('Error fetching CMT data:', error);
        throw error;
    }
}

// /get-user-order-ids
const getUserOrderIdsService = async () => {
    try {
        const response = await api.get('/get-user-order-ids');
        return returnResponse(response);
    } catch (error) {
        throw error;
    }
}

const getCheckoutDetailsService = async (orderId: string) => {
    try {
        const response = await api.get(`/checkout-details/${orderId}`);
        return returnResponse(response);
    } catch (error) {
        throw error;
    }
}

export { 
    createOrderService, 
    getOrderService, 
    getAllOrdersService, 
    downloadFileFromS3Service, 
    uploadFilesService, 
    updateTotalWeightService,
    updateOrderService,
    getOrderSummaryService,
    getCMT_DataService,
    getUserOrderIdsService,
    getCheckoutDetailsService
};
