import { useEffect } from 'react';
import { SensorService } from './accelerometer.service';
import { isShaking } from '../../../core/logic/motion';

/**
 * Hook Adaptador (Bridge)
 * Gestiona la suscripción al acelerómetro y dispara una acción al detectar agitación.
 */
export const useAccelerometer = (onShake: () => void) => {
  useEffect(() => {
    // 1. Iniciamos la suscripción a través del Servicio (Infraestructura)
    const subscription = SensorService.subscribe((data) => {
      
      // 2. Filtramos los datos usando Lógica Pura (Core)
      if (isShaking(data)) {
        // 3. Si se cumple el umbral, ejecutamos el callback de la UI
        onShake();
      }
    });

    // 4. Limpieza: Nos desuscribimos cuando el componente se destruye
    return () => {
      SensorService.unsubscribe(subscription);
    };
  }, [onShake]); // Se vuelve a ejecutar solo si la función onShake cambia
};