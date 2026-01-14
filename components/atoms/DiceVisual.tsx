import React, { useRef } from 'react'; // 1. Importamos useRef
import { Canvas, useFrame } from '@react-three/fiber/native'; // 2. Importamos useFrame

function BoxMesh() {
  // 3. Creamos una referencia para el Mesh
  const meshRef = useRef<any>(null);

  // 4. Esta función corre 60 veces por segundo
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotamos un poquito en cada frame
      // += significa "lo que ya tenía más un poquito"
      meshRef.current.rotation.x += 0.01; // Gira hacia adelante
      meshRef.current.rotation.y += 0.01; // Gira hacia los lados
    }
  });

  return (
    <mesh 
      ref={meshRef} // 5. Conectamos la referencia al objeto
      position={[0, 0, 0]} 
      scale={[2, 2, 2]} 
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

export default function DiceVisual() {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <BoxMesh />
    </Canvas>
  );
}