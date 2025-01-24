import api from "../axiosConfig";

// Upload files
const uploadFilesByOrderIdService = async (orderId: string, formData: any) => {
    try {
        const response = await api.put(
            `/update-user-order/${orderId}`,
            formData
        );
        return response;
    } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
    }
};

// Service to call the API for creating an order
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
const getOrderByIdService = async (orderId: string) => {
    try {
      const response = await api.get(`/order-show/${orderId}`);
      return response;
    } catch (error) {
      console.error('Error fetching user order:', error);
      throw error;
    }
  };

const getFilesByOrderIdService = async (orderId: string): Promise<object | undefined> => {
    try {
        const response = await api.get(`/order-show/${orderId}`);
        const files = response.data.message.files.map((file: any) => ({
            _id: file._id,
            fileName: file.fileName.split('-')[0],
            fileUrl: file.fileUrl,
            quantity: file.quantity,
            color: file.color,
            material: file.material || '',
            technology: file.technology || '',
            unit: file.unit,
            printer: file.printer,
            dimensions: file.dimensions,
            infill: file.infill,
        }));

        return files;
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}

const getFileByOrderIdUploadstlService = async (orderId: string) => {
    try {
        if (!orderId) {
            throw new Error("Order ID is required.");
        }
        const response = await api.get(`/order-show/${orderId}`);
        const fetchedFiles = response.data.message.files.map((file: any) => ({
            ...file,
        }));
        return fetchedFiles;
    } catch (error) {
        console.error("Error fetching files:", error);
        throw error;
    }
};

const getWeightByFileIdService = async (
    orderId: string,
    activeFileId: string,
    payload: object
): Promise<number | undefined> => {
    try {
        const response = await api.put(`/process-order/${orderId}/file/${activeFileId}`, payload);
        const weight = response.data?.data?.dimensions?.weight;
        return weight;
    } catch (error) {
        console.error("Error fetching weight by file ID:", error);
        throw error;
    }
};

const scaleTheFileByNewDimensionsService = async (
    orderId: string,
    activeFileId: string,
    payload: object): Promise<number | undefined> => {
    try {
        const response = await api.put(
            `/scale-order/${orderId}/file/${activeFileId}`,
            payload
        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching weight by file ID:", error);
        throw error;
    }
}

const updateFileDataByFileIdService = async (
    orderId: string,
    activeFileId: string,
    payload: object
): Promise<number | undefined> => {
    try {
        const response = await api.put(
            `/update-user-order/${orderId}/${activeFileId}`,
            payload
        );
        return response.data.data;

    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}
const updateUserOrderByOrderIdService = async (orderId: string, data: object) => {
    try {
        const response = await api.put(
            `/update-user-order/${orderId}`,
            data
        );
        return response;
    } catch (error) {
        console.error('Error updating user order:', error);
        throw error;
    }
}

//  getSpecificationDataService
const getSpecificationDataService = async () => {
    try {
        const response = await api.get(`/get-specification`);
        const res = response.data?.data?.[0];
        return res;
    } catch (error) {
        console.error('Error fetching specification:', error);
    }
}

//  getQuotesService
const getQuotesService = async (orderId: string): Promise<any> => {
    try {
        const res = await api.get(`/get-all-quotes/${orderId}`);
        return res.data;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        throw error;
    }
};


const getUserOrderService = async (pagination:number) => {
    try {
        const response = await api.get('/get-user-order',{
            params: {
                page: pagination
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching user order:', error);
        throw error;
    }
}

const getOngoingOrderService = async (filter: any) => {
    try {
        const response = await api.get('/get-user-ongoing-orders', {
            params: {
                filter
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching user order:', error);
        throw error;
    }
}

const getAllQuotesService = async (orderId: string): Promise<any> => {
    try {
        const response = await api.get(`/get-all-quotes/${orderId}`);
        return response;
    } catch (error) {
        console.error('Error fetching quotes:', error);
        throw error;
    }
}

const getAddressService = async () => {
    try {
        const res = await api.get('/get/address');
        return res;
    } catch (error) {
        console.error('Error fetching address:', error);
        throw error;
    }
}

const deleteStlFileByFileIdService = async (orderId: string, fileId: string) => {
    try {
        const res = await api.delete(`/delete-file/${orderId}/file/${fileId}`);
        return res;
    } catch (error) {
        console.error('Error deleting STL file:', error);
        throw error;
    }
}




export { createOrderService, getFilesByOrderIdService, getWeightByFileIdService, getSpecificationDataService, scaleTheFileByNewDimensionsService, updateFileDataByFileIdService, getFileByOrderIdUploadstlService, getQuotesService, uploadFilesByOrderIdService, getAllQuotesService, getAddressService, getUserOrderService, updateUserOrderByOrderIdService,deleteStlFileByFileIdService,getOrderByIdService,getOngoingOrderService };


