import api from "../axiosConfig";

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
            weight: file.weight,
            unit: file.unit,
            printer: file.printer,
            dimensions: file.dimensions,
        }));

        return files;
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}

const getFileByOrderIdUploadstlService = async (orderId: string)  => {
    try {
        if (orderId) {
          const response = await api.get(`/order-show/${orderId}`);
          const fetchedFiles = response.data.message.files.map(
            (file: any) => ({
              ...file,
            })
          );
            return fetchedFiles;
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      } 
}

const getWeightByFileIdService = async (
    orderId: string,
    activeFileId: string,
    payload: object
): Promise<number | undefined> => {
    try {
        console.log("activeFileId:", activeFileId);
        console.log("orderId:", orderId);
        console.log("payload:", payload);

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
    formData: object
): Promise<number | undefined> => {
    try {
        const response = await api.put(
            `/update-user-order/${orderId}/${activeFileId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        if (response.status === 200) {
            return response.data.data;
        }

    } catch (error) {
        console.error('Error updating data:', error);
    }
}

const getSpecificationDataService = async () => {
    try {
        const response = await api.get(`/get-specification`);
        const res = response.data?.data?.[0];
        return res;
    } catch (error) {
        console.error('Error fetching specification:', error);
    }
}


export { getFilesByOrderIdService, getWeightByFileIdService, getSpecificationDataService, scaleTheFileByNewDimensionsService, updateFileDataByFileIdService,getFileByOrderIdUploadstlService };


