import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const STLViewer = ({ geometry, color = '#ff6b35', size = 400 }) => {
  if (!geometry) return null;

  // Create a mesh from the geometry
  const STLMesh = () => {
    const meshRef = React.useRef();
    
    React.useEffect(() => {
      if (meshRef.current && geometry) {
        // Center the geometry
        geometry.computeBoundingBox();
        const center = new THREE.Vector3();
        geometry.boundingBox.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);
        
        // Compute normals for proper lighting
        geometry.computeVertexNormals();
      }
    }, []);

    return (
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhongMaterial 
          color={new THREE.Color(color)} 
          shininess={30}
          transparent={false}
        />
      </mesh>
    );
  };

  return (
    <div style={{ width: size, height: size }}>
      <Canvas
        camera={{ position: [100, 100, 100], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} />
        
        <STLMesh />
        
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false}
        />
        
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};

export default STLViewer;
