export interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

export type Weight = {
  value: number;
  unit: string;
}

export interface FileData {
  _id: string;
  fileName: string;
  dimensions: ModelDimensions;
  fileUrl: string;
  weight?:Weight;
  fileBlob?: Blob;
  file?: File;
  quantity: number;
  unit: string;
  thumbnailUrl?: string;
  uploadProgress?: number;
  isUploading?: boolean;
  isUploaded?: boolean;
}



export interface UploadFileProgress {
  fileId: string;
  progress: number;
  isUploading: boolean;
}


export type UploadFile  = Omit<FileData, '_id' | 'fileBlob' | 'isUploading' | 'isUploaded' | 'uploadProgress' | 'file'> 
export type UpdateFileData = Partial<Omit<FileData, '_id' | 'fileBlob' | 'isUploading' | 'isUploaded' | 'uploadProgress' | 'file'>> & { 
  _id: string
  color?: string;
  material?: string;
  technology?: string;
  printer?: string;
  infill?: number;
 };
