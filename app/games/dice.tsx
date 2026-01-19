import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useAccelerometer } from '../../lib/modules/sensors/accelerometer/useAccelerometer';
import DiceVisual from '../../components/atoms/DiceVisual';
// Obtenemos el ancho de la pantalla para que el dado se vea bien en cualquier cel
const { width } = Dimensions.get('window');

export default function DiceGame() {
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newValue);
  };

  // Implementación del Hook Adaptador (Paso 4 de tu guía)
  useAccelerometer(rollDice);

  return (
    <View style={styles.container}>
      {/* 1. EL TAPETE (Mesa de juego) */}
      <View style={styles.table}>
        <Text style={styles.casinoBrand}>★ ROYAL CASINO ★</Text>

        {/* 2. EL DADO (Cuerpo principal) */}
        <View style={styles.diceBody}>
          {/* Reemplazamos la cara plana por el componente 3D */}
          <DiceVisual />
        </View>

        {/* 3. INSTRUCCIONES */}
        <View style={styles.footer}>
          <Text style={styles.instructionText}>SACUDE PARA TIRAR</Text>
          <View style={styles.goldLine} />
        </View>
      </View>
    </View>
  );
}

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