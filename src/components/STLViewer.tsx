import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// TypeScript interfaces for props
interface STLViewerProps {
  geometry: THREE.BufferGeometry;
  color?: string;
  size?: number;
  autoRotate?: boolean;
  showWireframe?: boolean;
  lightIntensity?: number;
  backgroundColor?: string;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  defaultZoom?: number;
}

interface STLMeshProps {
  geometry: THREE.BufferGeometry;
  color: string;
  autoRotate: boolean;
  showWireframe: boolean;
}

const STLViewer: React.FC<STLViewerProps> = ({
  geometry,
  color = '#ff6b35',
  size = 400,
  autoRotate = false,
  showWireframe = false,
  lightIntensity = 0.8,
  backgroundColor = 'transparent',
  cameraPosition = [100, 100, 100],
  enableControls = true,
  defaultZoom = 75,
}) => {
  if (!geometry) {
    return (
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          border: '2px dashed #ccc',
        }}
      >
        <p>No 3D model to display</p>
      </div>
    );
  }

  // Create a mesh component from the geometry
  const STLMesh: React.FC<STLMeshProps> = ({
    geometry,
    color,
    autoRotate,
    showWireframe,
  }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
      if (meshRef.current && geometry) {
        // Center the geometry
        geometry.computeBoundingBox();

        if (geometry.boundingBox) {
          const center = new THREE.Vector3();
          geometry.boundingBox.getCenter(center);
          geometry.translate(-center.x, -center.y, -center.z);
        }

        // Compute normals for proper lighting
        geometry.computeVertexNormals();
      }
    }, [geometry]);

    // Auto rotation hook
    useFrame((_state: any, delta: number) => {
      if (autoRotate && meshRef.current) {
        meshRef.current.rotation.y += delta * 0.5;
      }
    });

    return (
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhongMaterial
          color={new THREE.Color(color)}
          shininess={30}
          transparent={false}
          wireframe={showWireframe}
        />
      </mesh>
    );
  };

  return (
    <div style={{ width: size * 1.4, height: size }}>
      <Canvas
        camera={{ position: cameraPosition, fov: defaultZoom }}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor:
            backgroundColor !== 'transparent' ? backgroundColor : undefined,
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={lightIntensity} />
        <pointLight
          position={[-10, -10, -5]}
          intensity={lightIntensity * 0.3}
        />

        <STLMesh
          geometry={geometry}
          color={color}
          autoRotate={autoRotate}
          showWireframe={showWireframe}
        />

        {enableControls && (
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate && !showWireframe}
            autoRotateSpeed={2.0}
          />
        )}

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default STLViewer;
