export interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

export type Weight = {
  value: number;
  unit: string;
};

export type Pricing = {
  electricityCost_gbp_per_kwh: number;
  printerOperationalCost_gbp_per_hour: number;
  laborCost_gbp_per_hour: number;
  postProcessingTime_min: number;
  taxRate_percent: number;
};

export type DeliveryWeight = {
  weight: number;
  unit: string;
};

export interface DeliveryService {
  total_weight: DeliveryWeight;
  service_type: string;
  service_price: number;
}

export interface FileData {
  _id: string;
  fileName: string;
  dimensions: ModelDimensions;
  fileUrl: string;
  weight?: Weight;
  fileBlob?: Blob;
  file?: File;
  quantity: number;
  unit: string;
  thumbnailUrl?: string;
  uploadProgress?: number;
  isUploading?: boolean;
  isUploaded?: boolean;
}

export type FileDataDB = Omit<
  FileData,
  'fileBlob' | 'file' | 'isUploading' | 'isUploaded' | 'uploadProgress'
> & {
  materialId?: string;
  colorId?: string;
  technologyId?: string;
  printerId?: string;
  infill?: number;
  createdAt: string;
  updatedAt: string;
  _id: string;
  isCustomized?: boolean;
};

export type FileDataOrder = FileDataDB & {
  material: Material;
  color: Color;
  technology: Technology;
  printer: {
    _id: string;
    name: string;
  };
};

export interface Material {
  _id: string;
  name: string;
  code: string;
  density: number;
  cost_gbp_per_kg: number;
  extrusionTemp_C: number;
  bedTemp_C: number;
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

export type UploadFile = Omit<
  FileData,
  '_id' | 'fileBlob' | 'isUploading' | 'isUploaded' | 'uploadProgress' | 'file'
>;
export type UpdateFileData = Partial<
  Omit<
    FileData,
    | '_id'
    | 'fileBlob'
    | 'isUploading'
    | 'isUploaded'
    | 'uploadProgress'
    | 'file'
  >
> & {
  colorId?: string;
  materialId?: string;
  technologyId?: string;
  printerId?: string;
  infill?: number;
  weight?: Weight;
};
