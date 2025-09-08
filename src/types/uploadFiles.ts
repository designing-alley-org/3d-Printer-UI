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

export type FileDataDB = Omit<FileData, 'fileBlob' | 'file' | 'isUploading' | 'isUploaded' | 'uploadProgress'> & {
  materialId: Material;
  colorId: Color;
  technologyId: Technology;
  printerId: any;
  infill: number;
  createdAt: string;
  updatedAt: string;
}




export interface Material {
    _id: string;
    name: string;
    code: string;
    density: number;
    unit: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface Color {
    _id: string;
    name: string;
    hexCode: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface Technology {
    _id: string;
    name: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}



export interface UploadFileProgress {
  fileId: string;
  progress: number;
  isUploading: boolean;
}


export type UploadFile  = Omit<FileData, '_id' | 'fileBlob' | 'isUploading' | 'isUploaded' | 'uploadProgress' | 'file'> 
export type UpdateFileData = Partial<Omit<FileData, '_id' | 'fileBlob' | 'isUploading' | 'isUploaded' | 'uploadProgress' | 'file'>> & { 
  _id: string
  colorId?: string;
  materialId?: string;
  technologyId?: string;
  printerId?: string;
  infill?: number;
 };
