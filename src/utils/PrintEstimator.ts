// --- 1. Define the data structures with TypeScript Interfaces ---

import { IPrinter } from "../types/printer";
import { Material } from "../types/uploadFiles";


interface Pricing {
    electricityCost_gbp_per_kwh: number;
    printerOperationalCost_gbp_per_hour: number;
    laborCost_gbp_per_hour: number;
    postProcessingTime_min: number;
}

interface ModelGeometry {
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

interface ModelProperties {
    volume_mm3: number;
    triangleCount: number;
    dimensions: { x: number; y: number; z: number };
}

interface EstimateOptions {
    modelGeometry: ModelGeometry;
    printer: any
    material: any;
    infillPercent?: number;
    scale?: number;
}

interface EstimateResult {
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


// --- 2. The Refactored TypeScript Class ---

/**
 * A pure TypeScript class for estimating 3D print time, weight, and cost.
 * It is completely self-contained and has no DOM dependencies.
 */
class PrintEstimator {
    private printerProfiles: IPrinter[];
    private materials: Material[];
    private pricing: Pricing;

    /**
     * Creates an instance of PrintEstimator.
     * @param printerProfiles - An array of printer profile objects, typically fetched from a backend.
     * @param materials - An array of material objects, typically fetched from a backend.
     * @param pricing - A pricing configuration object.
     */
    constructor(printerProfiles: IPrinter[], materials: Material[], pricing: Pricing) {
        this.printerProfiles = printerProfiles;
        this.materials = materials;
        this.pricing = pricing;
    }

    /**
     * Calculates the print weight, time, and cost for a given 3D model geometry.
     */
    public getEstimates({
        modelGeometry,
        printer,
        material,
        infillPercent = 20,
        scale = 1.0,
    }: EstimateOptions): EstimateResult {

        if (!modelGeometry?.attributes?.position?.array) {
            throw new Error("Valid model geometry with position attributes is required.");
        }

        const modelData = this._getModelProperties(modelGeometry);

        const estimates = this._calculateEnhancedEstimates({
            modelData,
            printer,
            material,
            infillPercent,
            scale
        });

        return {
            ...estimates,
            formattedTime: this._formatTime(estimates.totalTime_s),
        };
    }

    private _getModelProperties(geometry: ModelGeometry): ModelProperties {
        return {
            volume_mm3: this._calculateVolumeFromGeometry(geometry),
            triangleCount: geometry.attributes.position.count / 3,
            dimensions: this._calculateBoundingBox(geometry),
        };
    }
    
    private _calculateBoundingBox(geometry: ModelGeometry): { x: number; y: number; z: number } {
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

    private _signedTetraVolume(p0x: number, p0y: number, p0z: number, p1x: number, p1y: number, p1z: number, p2x: number, p2y: number, p2z: number): number {
        return (-p2x * p1y * p0z + p1x * p2y * p0z + p2x * p0y * p1z - p0x * p2y * p1z - p1x * p0y * p2z + p0x * p1y * p2z) / 6.0;
    }
    
    private _calculateVolumeFromGeometry(geometry: ModelGeometry): number {
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
    
    private _calculateEnhancedEstimates(
        { modelData, printer, material, infillPercent, scale }: { modelData: ModelProperties; printer: IPrinter; material: Material; infillPercent: number; scale: number }
    ): Omit<EstimateResult, 'formattedTime'> {
        const scaledVolume_mm3 = modelData.volume_mm3 * Math.pow(scale, 3);
        const shellRatio = Math.min(0.4, (0.8 * 6) / Math.cbrt(scaledVolume_mm3));
        const materialVolume_mm3 = scaledVolume_mm3 * (shellRatio + ((1 - shellRatio) * (infillPercent / 100)));
        const weight_g = materialVolume_mm3 * (material.density / 1000);

        const extrusionLength_mm = materialVolume_mm3 / (printer.nozzleDiameter_mm * printer.defaultLayerHeight_mm);
        const complexityFactor = Math.max(0.6, Math.min(1.0, 1000 / modelData.triangleCount));
        const effectiveSpeed_mm_s = printer.maxPrintSpeed_mm_s * complexityFactor * 0.7;

        const printTime_s = extrusionLength_mm / effectiveSpeed_mm_s;
        const volumetricLimitTime_s = materialVolume_mm3 / printer.maxVolumetricFlow_mm3s;
        const actualPrintTime_s = Math.max(printTime_s, volumetricLimitTime_s);

        const totalTime_s = actualPrintTime_s + (printer.heatingTime_min * 60) + Math.min(600, actualPrintTime_s * 0.1) + 300;
        const totalTime_hr = totalTime_s / 3600;

        const materialCost_gbp = (weight_g / 1000) * material.cost_gbp_per_kg;
        const energyCost_gbp = (printer.powerConsumption_watts / 1000) * totalTime_hr * this.pricing.electricityCost_gbp_per_kwh;
        const operationalCost_gbp = totalTime_hr * this.pricing.printerOperationalCost_gbp_per_hour;
        const laborCost_gbp = (this.pricing.postProcessingTime_min / 60) * this.pricing.laborCost_gbp_per_hour;

        return {
            weight_g,
            totalTime_s,
            layers: Math.ceil(modelData.dimensions.z * scale / printer.defaultLayerHeight_mm),
            costs: {
                material: materialCost_gbp,
                energy: energyCost_gbp,
                operational: operationalCost_gbp,
                labor: laborCost_gbp,
                total: materialCost_gbp + energyCost_gbp + operationalCost_gbp + laborCost_gbp,
            },
        };
    }
    
    private _formatTime(totalSeconds: number): string {
        if (isNaN(totalSeconds) || totalSeconds < 0) return "00:00:00";
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = Math.round(totalSeconds % 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
}


// --- 3. Example Usage (How you would use it with data from a backend) ---

// async function runExample() {
//     // --- Mock Backend Data ---
//     // In a real app, you would fetch this data from your API.
//     const mockPrinterProfiles: IPrinter[] = [
//         { name: "Bambu Lab X1-Carbon", nozzleDiameter_mm: 0.4, defaultLayerHeight_mm: 0.16, maxPrintSpeed_mm_s: 500, maxVolumetricFlow_mm3s: 21, powerConsumption_watts: 350, heatingTime_min: 3 },
//         { name: "Creality K1", nozzleDiameter_mm: 0.4, defaultLayerHeight_mm: 0.2, maxPrintSpeed_mm_s: 600, maxVolumetricFlow_mm3s: 32, powerConsumption_watts: 360, heatingTime_min: 2 },
//     ];
//     const mockMaterials: Material[] = [
//         { name: "PLA", density: 1.24, cost_gbp_per_kg: 20.00 },
//         { name: "PETG", density: 1.27, cost_gbp_per_kg: 25.00 },
//     ];
//     const mockPricing: Pricing = {
//         electricityCost_gbp_per_kwh: 0.25,
//         printerOperationalCost_gbp_per_hour: 1.50,
//         laborCost_gbp_per_hour: 15.00,
//         postProcessingTime_min: 10
//     };

//     // 1. Instantiate the estimator with data from your backend.
//     const estimator = new PrintEstimator(mockPrinterProfiles, mockMaterials, mockPricing);
    
//     // 2. Get your model geometry (e.g., from an STL file loader).
//     const fakeGeometry: ModelGeometry = {
//         attributes: {
//             position: {
//                 array: new Float32Array([0,0,0, 10,0,0, 0,10,0, 10,10,0, 10,0,0, 0,10,0]),
//                 count: 6
//             }
//         }
//     };
    
//     // 3. Call the getEstimates method with your chosen settings.
//     try {
//         const results = estimator.getEstimates({
//             modelGeometry: fakeGeometry,
//             printerName: "Bambu Lab X1-Carbon",
//             materialName: "PLA",
//             infillPercent: 15,
//             scale: 2.5
//         });

//         console.log("--- Print Estimate Results ---");
//         console.log(`Formatted Time: ${results.formattedTime}`);
//         console.log(`Weight: ${results.weight_g.toFixed(2)} g`);
//         console.log(`Total Cost: £${results.costs.total.toFixed(2)}`);
//         console.log("----------------------------");

//     } catch (error) {
//         console.error("Estimation failed:", (error as Error).message);
//     }
// }

// Run the example
// runExample();