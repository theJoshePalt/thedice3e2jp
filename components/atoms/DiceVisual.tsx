import React, { useRef } from 'react';
import { useRef as useReactRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber/native';

function CasinoDice() {
  const meshRef = useRef<any>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} scale={[2.2, 2.2, 2.2]}>
      {/* Esqueleto del dado */}
      <boxGeometry args={[1, 1, 1]} />
      
      {/* La "Piel" del dado: Rojo Poker con brillo de Casino */}
      <meshStandardMaterial 
        color="#C41E3A" 
        roughness={0.2} // Un poco de brillo
        metalness={0.3} // Reflejo premium
      />
    </mesh>
  );
}

export default function DiceVisual() {
  return (
    <Canvas>
      {/* Mejoramos la iluminación para que el rojo resalte */}
      <ambientLight intensity={0.7} /> 
      <pointLight position={[5, 5, 5]} intensity={1} />
      <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} />
      
      <CasinoDice />
    </Canvas>
  );
}