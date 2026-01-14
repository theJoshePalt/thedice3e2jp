import { Accelerometer } from 'expo-sensors';

export const SensorService = {
  // Método para iniciar la escucha del hardware
  subscribe: (callback: (data: any) => void) => {
    Accelerometer.setUpdateInterval(100); // 100ms es ideal para fluidez.
    return Accelerometer.addListener(callback);
  },

  // Limpieza para evitar fugas de memoria (Memory Leaks).
  unsubscribe: (subscription: any) => {
    if (subscription) subscription.remove();
  }
};