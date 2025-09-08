import api from "../axiosConfig"
import { updateWeight } from "../store/customizeFilesDetails/reducer";
import {  FileData, UpdateFileData, UploadFile } from "../types/uploadFiles";
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

const updateFile = async (fileId: string, fileData: UpdateFileData) => {
    try {
        // This api for specific customization of file like changing the file
        const response = await api.put(`/api/v1/files/${fileId}`, {  ...fileData });
        return returnResponse(response);
    } catch (error) {
        console.error('Error updating file:', error);
        throw error;
    }
};

const updateFilesQuantity = async (files: { id: string; quantity: number }[]) => {
    try {
        const response = await api.patch(`/api/v1/files/quantity`, { files });
        return returnResponse(response);
    } catch (error) {
        console.error('Error updating files quantity:', error);
        throw error;
    }
};

const scaleFile = async (fileId: string, dimensions: { new_length: number; new_width: number; new_height: number; unit: string }) => {
    try {
        const response = await api.put(`/api/v1/files/scale/${fileId}`, { ...dimensions });
        return returnResponse(response);
    } catch (error) {
        console.error('Error scaling file:', error);
        throw error;
    }
}


const getFileWeight = async (fileId: string, dispatch: any) => {
    try {
        const response = await api.put(`/api/v1/files/process/${fileId}`);
        const { weight } = returnResponse(response);
        dispatch(updateWeight({ id: fileId, weight: weight }));
        return returnResponse(response);
    } catch (error) {
        console.error('Error fetching file weight:', error);
        throw error;
    }
}


export {
    createFile,
    deleteFile,
    getAllFilesByOrderId,
    updateFile,
    updateFilesQuantity,
    scaleFile,
    getFileWeight
}