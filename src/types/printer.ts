import { Color, Material, Technology } from './uploadFiles';

export type BuildVolume = {
  x: number;
  y: number;
  z: number;
};

export type LayerResolution = {
  min: number;
  max: number;
};

export type isActive = 'active' | 'inactive';

export interface IPrinter {
  _id: string; // usually _id mapped to string

  name: string;
  imageURL?: string;
  buildVolume_mm: BuildVolume;

  specifications: Record<string, any>;
  //
  // nozzleDiameter_mm: number;
  // defaultLayerHeight_mm: number;
  // maxPrintSpeed_mm_s: number;
  // maxVolumetricFlow_mm3s: number;
  // powerConsumption_watts: number;
  // heatingTime_min: number;
  // maxAcceleration_mm_s2: number;
  // maxBedHeat?: number;
  // heatSinkSize?: number;

  createdBy: string; // User ID

  isActive?: isActive;
  materials?: Material[];
  colors?: Color[];
  technologies?: Technology;
  createdAt?: Date;
  updatedAt?: Date;
}
