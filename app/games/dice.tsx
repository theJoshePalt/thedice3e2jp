import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useAccelerometer } from '../../lib/modules/sensors/accelerometer/useAccelerometer';


export default function DiceGame() {
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newValue);
    console.log("¡Sacudida detectada! Nuevo valor:", newValue);
  };

  // Usamos nuestro hook personalizado
  useAccelerometer(rollDice);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>(imaginate un dado)  ==  {diceValue}</Text>
      <Text>Sacude para que se lanze el dado</Text>
    </View>
  );
}