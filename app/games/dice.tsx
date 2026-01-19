import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
// Importamos el hook que ya creaste siguiendo tu guía (Paso 4)
import { useAccelerometer } from '../../lib/modules/sensors/accelerometer/useAccelerometer';
import DiceVisual from '../../components/atoms/DiceVisual';

const { width } = Dimensions.get('window');

export default function DiceGame() {
  // 1. Estado para guardar el número del dado
  const [diceValue, setDiceValue] = useState(1);

  // 2. Función que se dispara al detectar el "Shake"
  const handleShake = () => {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newValue);
    console.log("¡Dado lanzado! Resultado:", newValue);
  };

  // 3. Conectamos el acelerómetro. 
  // El hook usará la lógica de 'isShaking' de tu motion.ts automáticamente.
  useAccelerometer(handleShake);

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <Text style={styles.casinoBrand}>★ ROYAL CASINO ★</Text>

        {/* Muestra el número actual arriba mientras no hay animación */}
        <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
          RESULTADO: {diceValue}
        </Text>

        <View style={styles.diceBody}>
          {/* Pasamos el valor actual al componente 3D (para el Paso 3) */}
          <DiceVisual value={diceValue} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.instructionText}>SACUDE PARA TIRAR</Text>
          <View style={styles.goldLine} />
        </View>
      </View>
    </View>
  );
}

// ... tus estilos se mantienen iguales

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C41E3A', // 1. FONDO EXTERIOR (Oscuro)
    padding: 20,
  },
  table: {
    flex: 1,
    backgroundColor: '#0F0F0F',    // 2. COLOR DEL TAPETE (Verde Casino)
    borderRadius: 40,             // 3. CURVATURA DE LA MESA (0 es cuadrado)
    borderWidth: 9,              // 4. GROSOR DEL BORDE DE LA MESA
    borderColor: '#D4AF37',       // 5. COLOR DEL BORDE (Rojo Pasión)
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 20,                // Sombra en Android
  },
  casinoBrand: {
    color: '#D4AF37',             // 6. COLOR MARCA (Dorado)
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 3,
    opacity: 0.6,                 // 7. TRANSPARENCIA (0.0 a 1.0)
  },
  diceBody: {
    width: width * 0.35,          // 8. TAMAÑO DEL DADO (45% del ancho de pantalla)
    height: width * 0.35,

    padding: 12,
    elevation: 15,
  },
  diceFace: {
    flex: 1,
    backgroundColor: '#C41E3A',   // 9. COLOR DE LA CARA DEL DADO (Blanco)
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diceNumber: {
    fontSize: 85,                 // 10. TAMAÑO DEL NÚMERO
    fontWeight: '900',
    color: '#FFFFFF',                // 11. COLOR DEL NÚMERO
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  goldLine: {
    height: 3,
    backgroundColor: '#D4AF37',   // Línea decorativa dorada
    width: 100,
    marginTop: 10,
    alignSelf: 'center',
  },
  footer: {
    marginBottom: 20,
  }
});