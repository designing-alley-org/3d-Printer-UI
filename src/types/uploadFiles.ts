export interface ModelDimensions {
  height: number;
  width: number;
  length: number;
}

export interface FileData {
  _id: string;
  fileName: string;
  dimensions: ModelDimensions;
  fileUrl: string;
  fileBlob?: Blob;
  file?: File;
  quantity: number;
  unit: string;
}




