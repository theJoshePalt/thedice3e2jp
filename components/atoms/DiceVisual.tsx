import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber/native';

// Este componente dibuja un punto blanco en una posición específica
function Dot({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

function CasinoDice() {
  const meshRef = useRef<any>(null);

  // Mantenemos la rotación para que se vean todas las caras por ahora
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
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

export default function DiceVisual() {
  return (
    <Canvas>
      {/* 1. Luz de ambiente para que no haya sombras negras puras */}
      <ambientLight intensity={1.5} /> 
      
      {/* 2. Luz principal (Como un foco de estudio) */}
      <pointLight position={[10, 10, 10]} intensity={2.5} color="#ffffff" />
      
      {/* 3. Luz de contra (Para resaltar los bordes dorados/rojos) */}
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#D4AF37" />

      <CasinoDice />
    </Canvas>
  );
}