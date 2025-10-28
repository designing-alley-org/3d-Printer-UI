import { IPrinter } from './printer';
import { Material } from './uploadFiles';

export interface ModelGeometry {
  attributes: {
    position: {
      array: Float32Array | number[];
      count: number;
    };
  };
  index?: {
    array: Uint32Array | Uint16Array | number[];
    count: number;
  } | null;
}

export interface ModelProperties {
  volume_mm3: number;
  triangleCount: number;
  dimensions: { x: number; y: number; z: number };
}

export interface EstimateOptions {
  modelGeometry: ModelGeometry;
  printer: IPrinter;
  material: Material;
  infillPercent?: number;
  scale?: number;
}

export interface EstimateResult {
  weight_g: number;
  totalTime_s: number;
  formattedTime: string;
  layers: number;
  costs: {
    material: number;
    energy: number;
    operational: number;
    labor: number;
    total: number;
  };
}
