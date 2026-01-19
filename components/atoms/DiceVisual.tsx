import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { MathUtils } from 'three';

function Dot({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
// Definimos las rotaciones exactas para que cada cara mire a la cámara
const targetRotations: Record<number, [number, number, number]> = {
  1: [Math.PI / 2, 0, 0],          // Cara 1 (Y+)
  6: [-Math.PI / 2, 0, 0],         // Cara 6 (Y-)
  5: [0, 0, 0],                    // Cara 5 (Z+)
  2: [0, Math.PI, 0],              // Cara 2 (Z-)
  4: [0, -Math.PI / 2, 0],         // Cara 4 (X+)
  3: [0, Math.PI / 2, 0],          // Cara 3 (X-)
};


function CasinoDice({ value, shaking }: { value: number, shaking: boolean }) {
  const meshRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (shaking) {
      // Si está agitando, rotación loca y rápida
      meshRef.current.rotation.x += delta * 15;
      meshRef.current.rotation.y += delta * 15;
    } else {
      // Si paró, usamos lerp para ir suavemente a la rotación del número final
      const target = targetRotations[value] || [0, 0, 0];
      meshRef.current.rotation.x = MathUtils.lerp(meshRef.current.rotation.x, target[0], 0.1);
      meshRef.current.rotation.y = MathUtils.lerp(meshRef.current.rotation.y, target[1], 0.1);
      meshRef.current.rotation.z = MathUtils.lerp(meshRef.current.rotation.z, target[2], 0.1);
    }
  });

  return (
    <group ref={meshRef}>
      {/* EL CUERPO DEL DADO */}
      <mesh scale={[2.2, 2.2, 2.2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#C41E3A" roughness={0.2} />
      </mesh>

      {/* REPRESENTACIÓN DE LOS PUNTOS (Agrupados por cara) */}
      {/* Cara 1 (Frontal - Z+) */}
      <Dot position={[0, 1.15, 0]} />

      {/* Cara 2 (Trasera - Z-) */}
      <Dot position={[0.25, 0.25, -1.15]} />
      <Dot position={[-0.25, -0.25, -1.15]} />

      {/* Cara 3 (Derecha - X+) */}
      <Dot position={[-1.15, 0.3, 0.3]} />
      <Dot position={[-1.15, 0, 0]} />
      <Dot position={[-1.15, -0.3, -0.3]} />

      {/* Cara 4 (Izquierda - X-) */}
      <Dot position={[1.15, 0.25, 0.25]} />
      <Dot position={[1.15, 0.25, -0.25]} />
      <Dot position={[1.15, -0.25, 0.25]} />
      <Dot position={[1.15, -0.25, -0.25]} />

      {/* Cara 5 (Arriba - Y+) */}
      <Dot position={[0,  0 , 1.15]} />
      <Dot position={[0.3,  0.3, 1.15]} />
      <Dot position={[-0.3,  0.3, 1.15]} />
      <Dot position={[0.3,  -0.3, 1.15]} />
      <Dot position={[-0.3,-0.3, 1.15]} />

      {/* Cara 6 (Abajo - Y-) */}
      <Dot position={[0.25, -1.15, 0.25]} />
      <Dot position={[-0.25, -1.15, 0.25]} />
      <Dot position={[0.25, -1.15, 0]} />
      <Dot position={[-0.25, -1.15, 0]} />
      <Dot position={[0.25, -1.15, -0.25]} />
      <Dot position={[-0.25, -1.15, -0.25]} />
    </group>
  );
}

export default function DiceVisual({ value, isShaking }: { value: number, isShaking: boolean }) {
  return (
    <Canvas>
      <ambientLight intensity={1.5} /> 
      <pointLight position={[10, 10, 10]} intensity={2.5} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#D4AF37" />
      <CasinoDice value={value} shaking={isShaking} />
    </Canvas>
  );
}