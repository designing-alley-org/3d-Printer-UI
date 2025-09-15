import { Color, Material, Technology } from './uploadFiles';

export type ImageURL = {
  url?: string;
  key?: string;
};

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

// 🔹 Main Printer type
export interface IPrinter {
  _id: string; // usually _id mapped to string

  name: string;
  imageURL?: ImageURL;
  model: string;

  buildVolume: BuildVolume;
  layerResolution: LayerResolution;

  materialIds: string[]; // could expand into IMaterial[]
  technologyIds: string[]; // could expand into ITechnology[]
  colorIds: string[]; // could expand into IColor[]

  nozzleSize: number;
  printSpeed: number;

  extruders: string; // or "Direct" | "Bowden" if you want enum typing

  maxBedHeat?: number;
  heatSinkSize?: number;

  createdBy: string; // User ID

  isActive?: isActive;
  materials: Material[];
  colors: Color[];
  technologies: Technology[];
  createdAt?: Date;
  updatedAt?: Date;
}
