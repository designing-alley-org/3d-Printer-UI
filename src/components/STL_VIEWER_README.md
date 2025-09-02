# Enhanced STL Viewer Component

A fully TypeScript-compatible React component for displaying STL 3D models using React Three Fiber. This component maintains all original functionality while adding enhanced features and better type safety.

## Features

### ✅ **Backward Compatibility**
- All original functionality preserved
- Same basic API for existing implementations
- Drop-in replacement for the original component

### ✅ **Enhanced Features**
- **TypeScript Support**: Full type definitions and IntelliSense
- **Auto-rotation**: Configurable automatic model rotation
- **Wireframe Mode**: Toggle between solid and wireframe rendering
- **Lighting Control**: Adjustable light intensity
- **Background Options**: Transparent or colored backgrounds
- **Camera Positioning**: Customizable camera angles
- **Control Toggle**: Enable/disable orbit controls
- **Error Handling**: Graceful error states and loading indicators

### ✅ **Dependencies Status**
- ✅ `@react-three/fiber`: Installed and working
- ✅ `@react-three/drei`: Installed for controls and environment
- ✅ `@react-three/cannon`: Available for physics (if needed)
- ✅ `three`: Core Three.js library
- ✅ `@types/three`: TypeScript definitions

## Basic Usage (Backward Compatible)

```tsx
import STLViewer from './components/STLViewer';
import * as THREE from 'three';

// Original usage - still works exactly the same
<STLViewer geometry={bufferGeometry} />

// With original optional props
<STLViewer 
  geometry={bufferGeometry}
  color="#ff6b35"
  size={400}
/>
```

## Enhanced Usage

```tsx
import STLViewer from './components/STLViewer';

<STLViewer
  geometry={bufferGeometry}
  color="#4CAF50"
  size={500}
  autoRotate={true}
  showWireframe={false}
  lightIntensity={1.2}
  backgroundColor="white"
  enableControls={true}
  cameraPosition={[150, 150, 150]}
/>
```

## Props Interface

```typescript
interface STLViewerProps {
  geometry: THREE.BufferGeometry;        // Required: The 3D geometry to display
  color?: string;                        // Default: '#ff6b35'
  size?: number;                         // Default: 400
  autoRotate?: boolean;                  // Default: false
  showWireframe?: boolean;               // Default: false
  lightIntensity?: number;               // Default: 0.8
  backgroundColor?: string;              // Default: 'transparent'
  cameraPosition?: [number, number, number]; // Default: [100, 100, 100]
  enableControls?: boolean;              // Default: true
}
```

## Complete Example with Controls

```tsx
import STLViewerExample from './components/STLViewerExample';

// Includes interactive controls for all settings
<STLViewerExample file={stlFile} />
```

## Usage with STL Utils

```tsx
import React, { useState, useEffect } from 'react';
import STLViewer from './components/STLViewer';
import { STLParser, STLInfo } from './utils/stlUtils';

const MyComponent: React.FC<{ file: File }> = ({ file }) => {
  const [stlInfo, setStlInfo] = useState<STLInfo | null>(null);

  useEffect(() => {
    const loadSTL = async () => {
      const parser = new STLParser();
      const info = await parser.parseSTL(file);
      setStlInfo(info);
    };
    
    if (file) {
      loadSTL();
    }
  }, [file]);

  return (
    <div>
      {stlInfo && (
        <STLViewer
          geometry={stlInfo.geometry}
          color="#2196F3"
          size={600}
          autoRotate={true}
        />
      )}
    </div>
  );
};
```

## Key Improvements

### 🔧 **TypeScript Enhancements**
- Full type safety with proper interfaces
- IntelliSense support for all props
- Custom type declarations for React Three Fiber
- Proper error handling with typed exceptions

### 🎨 **Visual Enhancements**
- Better lighting setup with multiple light sources
- Enhanced material properties
- Configurable rendering options
- Improved camera positioning

### ⚡ **Performance Improvements**
- Proper geometry cleanup to prevent memory leaks
- Optimized rendering with conditional controls
- Efficient re-rendering with React hooks

### 🛠 **Developer Experience**
- Clear error messages and warnings
- Loading states and fallback UI
- Comprehensive examples and documentation
- Easy to customize and extend

## Migration Guide

### From Original Component
No changes required! Your existing code will work exactly the same:

```tsx
// Before (still works)
<STLViewer geometry={geometry} color="#ff6b35" size={400} />

// After (same result, but now with TypeScript support)
<STLViewer geometry={geometry} color="#ff6b35" size={400} />
```

### Adding New Features
Simply add the new props you want to use:

```tsx
// Add auto-rotation
<STLViewer geometry={geometry} autoRotate={true} />

// Add wireframe mode
<STLViewer geometry={geometry} showWireframe={true} />

// Customize lighting
<STLViewer geometry={geometry} lightIntensity={1.5} />
```

## Troubleshooting

### Type Errors
If you see TypeScript errors related to JSX elements, make sure the type declaration file is being imported:

```tsx
import '../types/react-three-fiber'; // Add this if needed
```

### Performance Issues
For large STL files, consider:
- Reducing the `size` prop
- Disabling `autoRotate` for better performance
- Using `showWireframe={true}` for faster rendering

### Controls Not Working
Make sure `enableControls={true}` (default) and that the container has proper dimensions.

## Dependencies

All required dependencies are properly installed:
- `@react-three/fiber`: React renderer for Three.js
- `@react-three/drei`: Useful helpers and controls
- `three`: Core 3D library
- `@types/three`: TypeScript definitions

The component is now production-ready with full TypeScript support while maintaining 100% backward compatibility!
