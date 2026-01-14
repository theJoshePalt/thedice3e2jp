import { SHAKE_THRESHOLD } from '../constants';

type Vector3 = { x: number; y: number; z: number };

export const isShaking = (data: Vector3): boolean => {
  // Calculamos la magnitud total de la aceleración
  const magnitude = Math.sqrt(
    Math.pow(data.x, 2) + Math.pow(data.y, 2) + Math.pow(data.z, 2)
  );
  
  // Retorna true si la fuerza es mayor al umbral (aprox 1.8g)
  return magnitude > SHAKE_THRESHOLD;
};