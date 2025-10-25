import { IPrinter } from '../types/printer';
import {
  EstimateOptions,
  EstimateResult,
  ModelGeometry,
  ModelProperties,
} from '../types/PrinterEstimator';
import { Material, Pricing } from '../types/uploadFiles';

// Base estimator class
export abstract class BasePrintEstimator {
  protected printerProfile: IPrinter;
  protected material: Material;
  protected pricing: Pricing;

  constructor(printerProfile: IPrinter, material: Material, pricing: Pricing) {
    this.printerProfile = printerProfile;
    this.material = material;
    this.pricing = pricing;
  }

  protected _getModelProperties(geometry: ModelGeometry): ModelProperties {
    return {
      volume_mm3: this._calculateVolumeFromGeometry(geometry),
      triangleCount: geometry.attributes.position.count / 3,
      dimensions: this._calculateBoundingBox(geometry),
    };
  }

  public async getEstimates({
    modelGeometry,
    printer,
    material,
    infillPercent = 20,
    scale = 1.0,
  }: EstimateOptions): Promise<EstimateResult> {

    console.log('Scale Factor:', scale);
    console.log('Infill Percent:', infillPercent);
    console.log('Printer:', printer);
    console.log('Material:', material);

    if (!modelGeometry?.attributes?.position?.array) {
      throw new Error('Valid model geometry with position attributes is required.');
    }

    const modelData = this._getModelProperties(modelGeometry);
    const scaledVolume_mm3 = modelData.volume_mm3 * Math.pow(scale, 3);
    
    const scaledDimensions = {
      x: modelData.dimensions.x * scale,
      y: modelData.dimensions.y * scale,
      z: modelData.dimensions.z * scale,
    };

    const estimates = this._calculateEstimates({
      modelData,
      scaledVolume_mm3,
      scaledDimensions,
      printer,
      material,
      infillPercent,
      scale,
    });

    return {
      ...estimates,
      formattedTime: getEstimatedTime(estimates.totalTime_s),
    };
  }

  // Abstract method - each technology implements its own
  protected abstract _calculateEstimates(params: {
    modelData: ModelProperties;
    scaledVolume_mm3: number;
    scaledDimensions: { x: number; y: number; z: number };
    printer: IPrinter;
    material: Material;
    infillPercent: number;
    scale: number;
  }): Omit<EstimateResult, 'formattedTime'>;

  // Shared geometry calculations
  protected _calculateBoundingBox(geometry: ModelGeometry): {
    x: number;
    y: number;
    z: number;
  } {
    const positions = geometry.attributes.position.array;
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i], y = positions[i + 1], z = positions[i + 2];
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      minZ = Math.min(minZ, z); maxZ = Math.max(maxZ, z);
    }
    return { x: maxX - minX, y: maxY - minY, z: maxZ - minZ };
  }

  protected _signedTetraVolume(
    p0x: number, p0y: number, p0z: number,
    p1x: number, p1y: number, p1z: number,
    p2x: number, p2y: number, p2z: number
  ): number {
    return (
      (-p2x * p1y * p0z + p1x * p2y * p0z + p2x * p0y * p1z -
        p0x * p2y * p1z - p1x * p0y * p2z + p0x * p1y * p2z) / 6.0
    );
  }

  protected _calculateVolumeFromGeometry(geometry: ModelGeometry): number {
    const posArray = geometry.attributes.position.array;
    let totalSignedVolume = 0;

    if (geometry.index?.array) {
      const index = geometry.index.array;
      for (let i = 0; i < index.length; i += 3) {
        const i0 = index[i] * 3, i1 = index[i + 1] * 3, i2 = index[i + 2] * 3;
        totalSignedVolume += this._signedTetraVolume(
          posArray[i0], posArray[i0 + 1], posArray[i0 + 2],
          posArray[i1], posArray[i1 + 1], posArray[i1 + 2],
          posArray[i2], posArray[i2 + 1], posArray[i2 + 2]
        );
      }
    } else {
      for (let i = 0; i < posArray.length; i += 9) {
        totalSignedVolume += this._signedTetraVolume(
          posArray[i], posArray[i + 1], posArray[i + 2],
          posArray[i + 3], posArray[i + 4], posArray[i + 5],
          posArray[i + 6], posArray[i + 7], posArray[i + 8]
        );
      }
    }
    return Math.abs(totalSignedVolume);
  }

  protected _calculateBaseCosts(
    weight_g: number,
    totalTime_hr: number
  ): EstimateResult['costs'] {
    const materialCost_gbp = (weight_g / 1000) * this.material.cost_gbp_per_kg;
    const energyCost_gbp =
      (this.printerProfile?.specifications?.powerConsumption_watts / 1000) *
      totalTime_hr *
      this.pricing.electricityCost_gbp_per_kwh;
    const operationalCost_gbp =
      totalTime_hr * this.pricing?.printerOperationalCost_gbp_per_hour;
    const laborCost_gbp =
      (this.pricing.postProcessingTime_min / 60) * this.pricing.laborCost_gbp_per_hour;

    return {
      material: materialCost_gbp,
      energy: energyCost_gbp,
      operational: operationalCost_gbp,
      labor: laborCost_gbp,
      total: materialCost_gbp + energyCost_gbp + operationalCost_gbp + laborCost_gbp,
    };
  }
}

// FDM (Fused Deposition Modeling) Estimator
// ONLY FDM uses infill parameter
export class FDMEstimator extends BasePrintEstimator {
  protected _calculateEstimates({
    modelData,
    scaledVolume_mm3,
    scaledDimensions,
    printer,
    material,
    infillPercent, // ← USED HERE
  }: {
    modelData: ModelProperties;
    scaledVolume_mm3: number;
    scaledDimensions: { x: number; y: number; z: number };
    printer: IPrinter;
    material: Material;
    infillPercent: number;
    scale: number;
  }): Omit<EstimateResult, 'formattedTime'> {
    // Calculate shell thickness (typically 2-4 perimeters)
    const perimeterCount = 3;
    const shellThickness_mm = perimeterCount * printer?.specifications?.nozzleDiameter_mm;
    
    // Estimate shell volume based on surface area approximation
    const surfaceArea_mm2 = this._estimateSurfaceArea(scaledDimensions);
    const shellVolume_mm3 = surfaceArea_mm2 * shellThickness_mm;
    
    // Interior volume for infill
    const interiorVolume_mm3 = Math.max(0, scaledVolume_mm3 - shellVolume_mm3);
    const infillVolume_mm3 = interiorVolume_mm3 * (infillPercent / 100);
    
    // Total material volume (shell + infill)
    const materialVolume_mm3 = shellVolume_mm3 + infillVolume_mm3;
    const weight_g = materialVolume_mm3 * (material.density / 1000);

    console.log('FDM Calculation:', {
      scaledVolume_mm3,
      shellVolume_mm3,
      interiorVolume_mm3,
      infillPercent,
      infillVolume_mm3,
      materialVolume_mm3,
      weight_g
    });

    // Calculate layers
    const layers = Math.ceil(scaledDimensions.z / printer?.specifications?.defaultLayerHeight_mm);

    // Estimate print time
    const extrusionLength_mm =
      materialVolume_mm3 / (printer?.specifications?.nozzleDiameter_mm * printer?.specifications?.defaultLayerHeight_mm);

    // Adjust speed based on model complexity
    const complexityFactor = Math.max(0.5, Math.min(1.0, 5000 / modelData.triangleCount));
    const effectiveSpeed_mm_s = printer?.specifications?.maxPrintSpeed_mm_s * complexityFactor * 0.65;

    const printTime_s = extrusionLength_mm / effectiveSpeed_mm_s;
    const volumetricLimitTime_s = materialVolume_mm3 / printer?.specifications?.maxVolumetricFlow_mm3s;
    const actualPrintTime_s = Math.max(printTime_s, volumetricLimitTime_s);

    // Add overhead times
    const totalTime_s =
      actualPrintTime_s +
      (printer?.specifications?.heatingTime_min || 0) * 60 +
      Math.min(600, actualPrintTime_s * 0.08) + // Travel/retraction overhead
      180; // Startup/cooldown

    const totalTime_hr = totalTime_s / 3600;
    const costs = this._calculateBaseCosts(weight_g, totalTime_hr);

    return { weight_g, totalTime_s, layers, costs };
  }

  private _estimateSurfaceArea(dimensions: { x: number; y: number; z: number }): number {
    // Rough approximation: rectangular prism surface area
    const { x, y, z } = dimensions;
    return 2 * (x * y + y * z + z * x);
  }
}

// SLA (Stereolithography) Estimator
// Prints SOLID parts - no infill
export class SLAEstimator extends BasePrintEstimator {
  protected _calculateEstimates({
    scaledVolume_mm3,
    scaledDimensions,
    printer,
    material,
    // infillPercent is IGNORED for SLA
  }: {
    modelData: ModelProperties;
    scaledVolume_mm3: number;
    scaledDimensions: { x: number; y: number; z: number };
    printer: IPrinter;
    material: Material;
    infillPercent: number;
    scale: number;
  }): Omit<EstimateResult, 'formattedTime'> {
    // SLA prints are ALWAYS solid (100% material usage)
    const weight_g = scaledVolume_mm3 * (material.density / 1000);

    console.log('SLA Calculation (solid print):', {
      scaledVolume_mm3,
      weight_g,
      note: 'Infill parameter ignored - SLA prints are solid'
    });

    // Calculate layers
    const layers = Math.ceil(scaledDimensions.z / printer?.specifications?.layerThickness_mm);

    // Layer exposure time + peel time + positioning
    const timePerLayer_s = printer?.specifications?.exposureTime_s + 6; // ~6s for peel and reposition
    const printTime_s = layers * timePerLayer_s;

    // Add initial layer time (usually longer exposure)
    const initialLayersTime_s = 5 * printer?.specifications?.exposureTime_s * 3;

    const totalTime_s = printTime_s + initialLayersTime_s + 300; // +5min warmup/drain
    const totalTime_hr = totalTime_s / 3600;

    const costs = this._calculateBaseCosts(weight_g, totalTime_hr);

    return { weight_g, totalTime_s, layers, costs };
  }
}

// DLP (Digital Light Processing) Estimator
// Prints SOLID parts - no infill
export class DLPEstimator extends BasePrintEstimator {
  protected _calculateEstimates({
    scaledVolume_mm3,
    scaledDimensions,
    printer,
    material,
    // infillPercent is IGNORED for DLP
  }: {
    modelData: ModelProperties;
    scaledVolume_mm3: number;
    scaledDimensions: { x: number; y: number; z: number };
    printer: IPrinter;
    material: Material;
    infillPercent: number;
    scale: number;
  }): Omit<EstimateResult, 'formattedTime'> {
    // DLP prints are ALWAYS solid
    const weight_g = scaledVolume_mm3 * (material.density / 1000);

    console.log('DLP Calculation (solid print):', {
      scaledVolume_mm3,
      weight_g,
      note: 'Infill parameter ignored - DLP prints are solid'
    });

    const layers = Math.ceil(scaledDimensions.z / printer?.specifications?.layerThickness_mm);

    // DLP exposes entire layer at once - faster than SLA
    const timePerLayer_s = printer?.specifications?.exposureTime_s + 4; // ~4s peel/position
    const printTime_s = layers * timePerLayer_s;
    const initialLayersTime_s = 5 * printer?.specifications?.exposureTime_s * 2.5;
    
    const totalTime_s = printTime_s + initialLayersTime_s + 240;
    const totalTime_hr = totalTime_s / 3600;

    const costs = this._calculateBaseCosts(weight_g, totalTime_hr);

    return { weight_g, totalTime_s, layers, costs };
  }
}

// SLS (Selective Laser Sintering) Estimator
// Prints SOLID parts - no infill (uses powder bed)
export class SLSEstimator extends BasePrintEstimator {
  protected _calculateEstimates({
    scaledVolume_mm3,
    scaledDimensions,
    printer,
    material,
    // infillPercent is IGNORED for SLS
  }: {
    modelData: ModelProperties;
    scaledVolume_mm3: number;
    scaledDimensions: { x: number; y: number; z: number };
    printer: IPrinter;
    material: Material;
    infillPercent: number;
    scale: number;
  }): Omit<EstimateResult, 'formattedTime'> {
    // SLS uses powder - prints solid parts
    const weight_g = scaledVolume_mm3 * (material.density / 1000);

    console.log('SLS Calculation (solid print):', {
      scaledVolume_mm3,
      weight_g,
      note: 'Infill parameter ignored - SLS prints are solid'
    });

    const layers = Math.ceil(scaledDimensions.z / printer.specifications?.layerThickness_mm);

    // Estimate scan area per layer (simplified)
    const avgLayerArea_mm2 = (scaledDimensions.x * scaledDimensions.y) * 0.4;
    const scanPath_mm = avgLayerArea_mm2 / (printer.specifications?.laserPower_w * 0.05); // Rough hatch spacing

    const timePerLayer_s = scanPath_mm / printer.specifications?.scanSpeed_mm_s + 3;
    const printTime_s = layers * timePerLayer_s;
    
    // SLS requires long heating/cooling cycles
    const totalTime_s = printTime_s + 3600 + (layers * 2); // +1hr preheat
    const totalTime_hr = totalTime_s / 3600;

    const costs = this._calculateBaseCosts(weight_g, totalTime_hr);

    return { weight_g, totalTime_s, layers, costs };
  }
}

// MJF (Multi Jet Fusion) Estimator
// Prints SOLID parts - no infill
export class MJFEstimator extends BasePrintEstimator {
  protected _calculateEstimates({
    scaledVolume_mm3,
    scaledDimensions,
    printer,
    material,
    // infillPercent is IGNORED for MJF
  }: {
    modelData: ModelProperties;
    scaledVolume_mm3: number;
    scaledDimensions: { x: number; y: number; z: number };
    printer: IPrinter;
    material: Material;
    infillPercent: number;
    scale: number;
  }): Omit<EstimateResult, 'formattedTime'> {
    // MJF prints solid parts
    const weight_g = scaledVolume_mm3 * (material.density / 1000);

    console.log('MJF Calculation (solid print):', {
      scaledVolume_mm3,
      weight_g,
      note: 'Infill parameter ignored - MJF prints are solid'
    });

    const layers = Math.ceil(scaledDimensions.z / printer?.specifications?.layerThickness_mm);

    // MJF is faster - prints entire layer quickly
    const timePerLayer_s = (scaledDimensions.y / printer?.specifications?.printSpeed_mm_s) + 2;
    const printTime_s = layers * timePerLayer_s;
    
    const totalTime_s = printTime_s + 5400; // +1.5hr heat/cool
    const totalTime_hr = totalTime_s / 3600;

    const costs = this._calculateBaseCosts(weight_g, totalTime_hr);

    return { weight_g, totalTime_s, layers, costs };
  }
}

// Helper function to check if technology supports infill
export function technologySupportsInfill(technology: string): boolean {
  return technology.toUpperCase() === 'FDM';
}

// Factory function to get correct estimator
export function createPrintEstimator(
  technology: string,
  printerProfile: IPrinter,
  material: Material,
  pricing: Pricing
): BasePrintEstimator {
  switch (technology.toUpperCase()) {
    case 'FDM':
      return new FDMEstimator(printerProfile, material, pricing);
    case 'SLA':
      return new SLAEstimator(printerProfile, material, pricing);
    case 'DLP':
      return new DLPEstimator(printerProfile, material, pricing);
    case 'SLS':
      return new SLSEstimator(printerProfile, material, pricing);
    case 'MJF':
      return new MJFEstimator(printerProfile, material, pricing);
    // Add more technologies as needed
    default:
      throw new Error(`Unsupported technology: ${technology}`);
  }
}

export function getEstimatedTime(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds < 0) return '00:00:00';
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round(totalSeconds % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}