import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import api from '../axiosConfig';
import { UpdateFileData, UploadFile } from '../types/uploadFiles';
import { returnResponse } from '../utils/function';
import * as THREE from 'three';

interface stlDownloadAndParseProps {
  url: string;
  setIsDownloading: React.Dispatch<React.SetStateAction<boolean>>;
  setDownloadProgress: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setStlGeometry: React.Dispatch<
    React.SetStateAction<THREE.BufferGeometry | null>
  >;
}

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
    const response = await api.put(`/api/v1/files/${fileId}`, { ...fileData });
    return returnResponse(response);
  } catch (error) {
    console.error('Error updating file:', error);
    throw error;
  }
};

const updateFilesQuantity = async (
  files: { id: string; quantity: number }[]
) => {
  try {
    const response = await api.patch(`/api/v1/files/quantity`, { files });
    return returnResponse(response);
  } catch (error) {
    console.error('Error updating files quantity:', error);
    throw error;
  }
};

const scaleFile = async (
  fileId: string,
  dimensions: {
    new_length: number;
    new_width: number;
    new_height: number;
    unit: string;
  }
) => {
  try {
    const response = await api.put(`/api/v1/files/scale/${fileId}`, {
      ...dimensions,
    });
    return returnResponse(response);
  } catch (error) {
    console.error('Error scaling file:', error);
    throw error;
  }
};

const getFileWeight = async (fileId: string, dispatch: any) => {
  try {
    const response = await api.put(`/api/v1/files/process/${fileId}`);
    const { weight } = returnResponse(response);
    return returnResponse(response);
  } catch (error) {
    console.error('Error fetching file weight:', error);
    throw error;
  }
};

const stlFileDownloadAndParse = async ({
  url,
  setIsDownloading,
  setDownloadProgress,
  setError,
  setStlGeometry,
}: stlDownloadAndParseProps) => {
  try {
    setIsDownloading(true);
    setDownloadProgress(0);
    setError(null);
    setStlGeometry(null); // Clear previous geometry

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch STL file: ${response.status} ${response.statusText}`);
    }

    const contentLength = response.headers.get('content-length');
    const total = contentLength ? parseInt(contentLength, 10) : 0;

    if (!response.body) {
      throw new Error('Response body is null');
    }

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let receivedLength = 0;
    let lastProgressUpdate = 0;
    console.log('Starting STL download and parse...');

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      receivedLength += value.length;

      if (total > 0) {
        const progress = Math.round((receivedLength / total) * 90); // Reserve 10% for parsing
        // Update progress only if it changed by at least 1% to avoid too many re-renders
        if (progress > lastProgressUpdate) {
          setDownloadProgress(progress);
          lastProgressUpdate = progress;
        }
      } else {
        // If no content-length, show indeterminate progress
        setDownloadProgress(50);
        console.warn('Content-Length header is missing; cannot compute download progress.');
      }
    }

    // Set download to 90% before parsing
    setDownloadProgress(90);

    // Combine chunks into single array buffer
    const arrayBuffer = new ArrayBuffer(receivedLength);
    const uint8Array = new Uint8Array(arrayBuffer);
    let position = 0;
    for (const chunk of chunks) {
      uint8Array.set(chunk, position);
      position += chunk.length;
    }

    // Update progress to 95% before STL parsing
    setDownloadProgress(95);

    // Parse the STL data
    const stlLoader = new STLLoader();
    const geometry = stlLoader.parse(arrayBuffer);

    if (!geometry) {
      throw new Error('Failed to parse STL file - invalid geometry');
    }

    // Set progress to 100% after successful parsing
    setDownloadProgress(100);
    setStlGeometry(geometry);
    console.log('STL file downloaded and parsed successfully.');

  } catch (error) {
    console.error('Error downloading/parsing STL file:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    setError(errorMessage);
    setDownloadProgress(0); // Reset progress on error
    setStlGeometry(null);
  } finally {
    // Keep isDownloading true until progress reaches 100% or error occurs
    setIsDownloading(false);
  }
};

export {
  createFile,
  deleteFile,
  getAllFilesByOrderId,
  updateFile,
  updateFilesQuantity,
  scaleFile,
  getFileWeight,
  stlFileDownloadAndParse,
};
