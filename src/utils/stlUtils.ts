import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

// TypeScript interfaces for better type safety
export interface STLDimensions {
  length: number;
  width: number;
  height: number;
  unit?: 'mm' | 'cm' | 'inches';
}

export interface STLInfo {
  filename: string;
  geometry: THREE.BufferGeometry;
  dimensions: STLDimensions;
  volume: number; // in cm³
  boundingBox: THREE.Box3;
  vertices: number;
  faces: number;
}

export interface ThumbnailOptions {
  color?: string;
  size?: number;
  backgroundColor?: string;
  lightIntensity?: number;
  cameraDistance?: number;
}

// Error types for better error handling
export class STLParseError extends Error {
  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = 'STLParseError';
  }
}

export class STLParser {
  private loader: STLLoader;

  constructor() {
    this.loader = new STLLoader();
  }

  /**
   * Parse STL file and return geometry info with enhanced TypeScript support
   */
  async parseSTL(file: File): Promise<STLInfo> {
    return new Promise<STLInfo>((resolve, reject) => {
      if (!file) {
        reject(new STLParseError('No file provided'));
        return;
      }

      if (!file.name.toLowerCase().endsWith('.stl')) {
        reject(new STLParseError('File is not an STL file'));
        return;
      }

      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        try {
          const result = event.target?.result;
          if (!result) {
            reject(new STLParseError('File reading failed - no result'));
            return;
          }

          let geometry: THREE.BufferGeometry;
          
          // Handle both string and ArrayBuffer results
          if (typeof result === 'string') {
            // ASCII STL format
            geometry = this.loader.parse(result);
          } else {
            // Binary STL format
            geometry = this.loader.parse(result as ArrayBuffer);
          }

          const info = this.analyzeGeometry(geometry, file.name);
          resolve(info);
        } catch (error) {
          reject(new STLParseError(
            `Failed to parse STL file: ${error instanceof Error ? error.message : 'Unknown error'}`,
            error instanceof Error ? error : undefined
          ));
        }
      };

      reader.onerror = () => {
        reject(new STLParseError('Failed to read file'));
      };

      // Read as ArrayBuffer to handle both ASCII and Binary STL files
      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Analyze geometry to get dimensions, volume, and other properties
   */
  private analyzeGeometry(geometry: THREE.BufferGeometry, filename: string): STLInfo {
    if (!geometry) {
      throw new STLParseError('Geometry is null or undefined');
    }

    geometry.computeBoundingBox();
    const bbox = geometry.boundingBox;
    
    if (!bbox) {
      throw new STLParseError('Failed to compute bounding box');
    }

    // Calculate dimensions in mm
    const dimensions: STLDimensions = {
      length: Math.abs(bbox.max.x - bbox.min.x),
      width: Math.abs(bbox.max.y - bbox.min.y),
      height: Math.abs(bbox.max.z - bbox.min.z),
      unit: 'mm'
    };

    // Calculate actual volume (bounding box volume in mm³ -> cm³)
    const volume = (dimensions.length * dimensions.width * dimensions.height) / 1000;

    // Get vertex and face counts
    const positionAttribute = geometry.getAttribute('position');
    const vertices = positionAttribute ? positionAttribute.count : 0;
    const faces = vertices / 3; // Each face has 3 vertices

    return {
      filename,
      geometry,
      dimensions,
      volume: Number(volume.toFixed(3)),
      boundingBox: bbox,
      vertices,
      faces
    };
  }

  async processSTLGeometry(
    densityValue: number,
    geometry: THREE.BufferGeometry,
    scaleFactor = 1.0
  ): Promise<
    | {
        volumeMm3: number;
        volumeCm3: number;
        volumeIn3: number;
        massGrams: number;
      }
    | undefined
  > {
    try {
      if (!geometry) throw new Error("No geometry provided.");
      const posAttr = geometry.attributes.position;
      if (!posAttr) throw new Error("Geometry missing position attribute.");
      if (posAttr.itemSize !== 3) throw new Error("Position attribute itemSize !== 3.");
  
      // Get the underlying array (Float32Array usually)
      const posArray = posAttr.array as Float32Array | number[];
  
      // Helper: compute signed volume of tetrahedron (v0, v1, v2) relative to origin
      const signedTetraVolume = (
        x0: number,
        y0: number,
        z0: number,
        x1: number,
        y1: number,
        z1: number,
        x2: number,
        y2: number,
        z2: number
      ): number => {
        // dot(v0, cross(v1, v2)) / 6
        const cx = y1 * z2 - z1 * y2;
        const cy = z1 * x2 - x1 * z2;
        const cz = x1 * y2 - y1 * x2;
        return (x0 * cx + y0 * cy + z0 * cz) / 6.0;
      };
  
      let totalSignedVolume = 0;
  
      if (geometry.index) {
        // Indexed geometry
        const index = geometry.index.array as Uint16Array | Uint32Array | number[];
        for (let i = 0; i < index.length; i += 3) {
          const i0 = index[i] * 3;
          const i1 = index[i + 1] * 3;
          const i2 = index[i + 2] * 3;
  
          const x0 = (posArray[i0] as number) * scaleFactor;
          const y0 = (posArray[i0 + 1] as number) * scaleFactor;
          const z0 = (posArray[i0 + 2] as number) * scaleFactor;
  
          const x1 = (posArray[i1] as number) * scaleFactor;
          const y1 = (posArray[i1 + 1] as number) * scaleFactor;
          const z1 = (posArray[i1 + 2] as number) * scaleFactor;
  
          const x2 = (posArray[i2] as number) * scaleFactor;
          const y2 = (posArray[i2 + 1] as number) * scaleFactor;
          const z2 = (posArray[i2 + 2] as number) * scaleFactor;
  
          totalSignedVolume += signedTetraVolume(x0, y0, z0, x1, y1, z1, x2, y2, z2);
        }
      } else {
        // Non-indexed: every 9 numbers form a triangle (3 verts * 3 coords)
        const vertexCount = posArray.length / 3;
        if (!Number.isInteger(vertexCount))
          throw new Error("Position array length not divisible by 3.");
        for (let i = 0; i < posArray.length; i += 9) {
          const x0 = (posArray[i] as number) * scaleFactor;
          const y0 = (posArray[i + 1] as number) * scaleFactor;
          const z0 = (posArray[i + 2] as number) * scaleFactor;
  
          const x1 = (posArray[i + 3] as number) * scaleFactor;
          const y1 = (posArray[i + 4] as number) * scaleFactor;
          const z1 = (posArray[i + 5] as number) * scaleFactor;
  
          const x2 = (posArray[i + 6] as number) * scaleFactor;
          const y2 = (posArray[i + 7] as number) * scaleFactor;
          const z2 = (posArray[i + 8] as number) * scaleFactor;
  
          totalSignedVolume += signedTetraVolume(x0, y0, z0, x1, y1, z1, x2, y2, z2);
        }
      }
  
      const volumeMm3 = Math.abs(totalSignedVolume); // mm^3 if input coords are mm
      const volumeCm3 = volumeMm3 / 1000.0; // 1 cm^3 = 1000 mm^3
      const volumeIn3 = volumeCm3 * 0.0610237440953699; // 1 cm^3 = 0.0610237 in^3
      const massGrams = volumeCm3 * Number(densityValue); // density in g/cm^3
  
      return {
        volumeMm3: Number(volumeMm3.toFixed(3)),
        volumeCm3: Number(volumeCm3.toFixed(3)),
        volumeIn3: Number(volumeIn3.toFixed(6)),
        massGrams: Number(massGrams.toFixed(3)),
      };
    } catch (err) {
      console.error("processSTLGeometry error:", err);
      return undefined;
    }
  }

  /**
   * Generate thumbnail image from geometry with enhanced options
   */
  async generateThumbnail(
    geometry: THREE.BufferGeometry,
    options: ThumbnailOptions = {}
  ): Promise<string> {
    const {
      color = '#ff6b35',
      size = 400,
      backgroundColor = 'transparent',
      lightIntensity = 0.8,
      cameraDistance = 1.5
    } = options;

    return new Promise<string>((resolve, reject) => {
      try {
        // Create a scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
          antialias: true, 
          alpha: backgroundColor === 'transparent',
          preserveDrawingBuffer: true
        });

        renderer.setSize(size, size);
        
        if (backgroundColor !== 'transparent') {
          renderer.setClearColor(new THREE.Color(backgroundColor), 1);
        } else {
          renderer.setClearColor(0x000000, 0);
        }

        // Material & Mesh
        const material = new THREE.MeshPhongMaterial({
          color: new THREE.Color(color),
          shininess: 30,
          transparent: backgroundColor === 'transparent'
        });
        
        const mesh = new THREE.Mesh(geometry, material);

        // Center mesh
        geometry.computeBoundingBox();
        const bbox = geometry.boundingBox;
        
        if (!bbox) {
          reject(new STLParseError('Failed to compute bounding box for thumbnail'));
          return;
        }

        const center = new THREE.Vector3();
        bbox.getCenter(center);
        mesh.position.copy(center).multiplyScalar(-1);

        scene.add(mesh);

        // Enhanced lighting setup
        scene.add(new THREE.AmbientLight(0x404040, 0.4));
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, lightIntensity);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Add fill light
        const fillLight = new THREE.DirectionalLight(0xffffff, lightIntensity * 0.3);
        fillLight.position.set(-1, -1, -1);
        scene.add(fillLight);

        // Camera positioning based on bounding box
        const size3d = Math.max(
          bbox.max.x - bbox.min.x,
          bbox.max.y - bbox.min.y,
          bbox.max.z - bbox.min.z
        );

        const distance = size3d * cameraDistance;
        camera.position.set(distance, distance * 0.8, distance);
        camera.lookAt(0, 0, 0);

        // Render
        renderer.render(scene, camera);
        const dataURL = renderer.domElement.toDataURL('image/png', 0.9);

        // Cleanup to prevent memory leaks
        renderer.dispose();
        material.dispose();
        
        // Don't dispose geometry as it might be used elsewhere
        scene.clear();

        resolve(dataURL);
      } catch (error) {
        reject(new STLParseError(
          `Failed to generate thumbnail: ${error instanceof Error ? error.message : 'Unknown error'}`,
          error instanceof Error ? error : undefined
        ));
      }
    });
  }

  /**
   * Convert dimensions to different units
   */
  static convertDimensions(
    dimensions: STLDimensions,
    targetUnit: 'mm' | 'cm' | 'inches'
  ): STLDimensions {
    const sourceUnit = dimensions.unit || 'mm';
    
    if (sourceUnit === targetUnit) {
      return { ...dimensions, unit: targetUnit };
    }

    let conversionFactor = 1;
    
    // Convert to mm first, then to target unit
    switch (sourceUnit) {
      case 'cm':
        conversionFactor = 10;
        break;
      case 'inches':
        conversionFactor = 25.4;
        break;
      case 'mm':
      default:
        conversionFactor = 1;
        break;
    }

    let toTargetFactor = 1;
    switch (targetUnit) {
      case 'cm':
        toTargetFactor = 0.1;
        break;
      case 'inches':
        toTargetFactor = 0.0393701;
        break;
      case 'mm':
      default:
        toTargetFactor = 1;
        break;
    }

    const finalFactor = conversionFactor * toTargetFactor;

    return {
      length: Number((dimensions.length * finalFactor).toFixed(3)),
      width: Number((dimensions.width * finalFactor).toFixed(3)),
      height: Number((dimensions.height * finalFactor).toFixed(3)),
      unit: targetUnit
    };
  }
}

/**
 * Utility functions for STL processing
 */
export const STLUtils = {
  /**
   * Validate STL file before processing
   */
  validateSTLFile(file: File): { isValid: boolean; error?: string } {
    if (!file) {
      return { isValid: false, error: 'No file provided' };
    }

    if (file.size === 0) {
      return { isValid: false, error: 'File is empty' };
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      return { isValid: false, error: 'File is too large (maximum 100MB)' };
    }

    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.stl')) {
      return { isValid: false, error: 'File must be an STL file' };
    }

    return { isValid: true };
  },

 
  /**
   * Estimate print time (very rough estimation)
   */
  estimatePrintTime(volume: number, infill: number = 20): string {
    // Very rough estimation: 1cm³ = ~1 hour at 20% infill
    const baseTime = volume * (infill / 20);
    const hours = Math.floor(baseTime);
    const minutes = Math.floor((baseTime - hours) * 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  },


  /**
   * Convert data URL to File
   */
  dataUrlToFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
};

/**
 * Default instance of STL Parser
 */
export const stlParser = new STLParser();
