import api from "../axiosConfig"
import {  UploadFile } from "../types/uploadFiles";
import { returnResponse } from "../utils/function";



const createFile = async (orderId: string, fileData: UploadFile) => {
    try {
        const response = await api.post(`/api/v1/files/${orderId}/files`, fileData);
        return returnResponse(response);
    } catch (error) {
        console.error('Error creating file:', error);
        throw error;
    }
};

const deleteFile = async (fileId: string, orderId: string | undefined) => {
    try {
        const response = await api.delete(`/api/v1/files/${fileId}/${orderId}`);
        return returnResponse(response);
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error;
    }
};

const getAllFilesByOrderId = async (orderId: string) => {
    try {
        const response = await api.get(`/api/v1/files/${orderId}/files`);
        return returnResponse(response);
    } catch (error) {
        console.error('Error fetching files:', error);
        throw error;
    }
};

const updateFile = async (fileId: string, orderId: string, status: string, fileData: FormData) => {
    try {
        //   const { orderId, status, fileId } = req.query;
        // const updatedData = req.body;
        const response = await api.post(`/api/v1/files/${fileId}`, { orderId, status, ...fileData });
        return returnResponse(response);
    } catch (error) {
        console.error('Error updating file:', error);
        throw error;
    }
};

const updateFilesQuantity = async (files: { id: string; quantity: number }[], orderId:string) => {
    try {
        const response = await api.patch(`/api/v1/files/quantity`, { files });
        return returnResponse(response);
    } catch (error) {
        console.error('Error updating files quantity:', error);
        throw error;
    }
};

export {
    createFile,
    deleteFile,
    getAllFilesByOrderId,
    updateFile,
    updateFilesQuantity 
}