import React from 'react';
import { Canvas } from '@react-three/fiber';
// 1. Definimos el objeto "Cubo" por separado para entender sus propiedades
function BoxMesh() {
  return (
    <mesh 
      // POSITION: Donde está el cubo en el espacio [X, Y, Z]
      // X: Izquierda(-) / Derecha(+)
      // Y: Abajo(-) / Arriba(+)
      // Z: Atrás(-) / Adelante(+)
      position={[0, 0, 0]} 
      
      // SCALE: Tamaño del cubo [Ancho, Alto, Profundidad]
      // Si pones [2, 1, 1] se verá como un ladrillo estirado
      scale={[2, 2, 2]} 
    >
      {/* GEOMETRY: Define la forma. En este caso una caja (Box) */}
      {/* args={[1, 1, 1]} define las proporciones base */}
      <boxGeometry args={[1, 1, 1]} />

      {/* MATERIAL: Define cómo se ve la superficie */}
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

export default function DiceVisual() {
  return (
    // El Canvas es el "mundo" 3D. Debe tener un tamaño definido.
    <Canvas style={{ width: '100%', height: '100%' }}>
      {/* LUZ AMBIENTAL: Ilumina todo el objeto por igual (intensidad 0.5) */}
      <ambientLight intensity={0.5} />
      
      {/* LUZ PUNTUAL: Como una linterna, genera sombras y brillo */}
      <pointLight position={[10, 10, 10]} />
      
      {/* Metemos nuestro cubo al mundo */}
      <BoxMesh />
    </Canvas>
  );
}