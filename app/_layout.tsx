import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // --- CONFIGURACIÓN DEL ENCABEZADO (HEADER) ---
        headerStyle: {
          backgroundColor: '#0F0F0F', // 1. COLOR DE FONDO DEL HEADER (Negro Casino)
        },
        headerTintColor: '#D4AF37',   // 2. COLOR DE TEXTO Y BOTONES (Dorado)
        headerTitleStyle: {
          fontWeight: '900',          // 3. GROSOR DE LETRA (100 a 900 o 'bold')
          fontSize: 24,               // 4. TAMAÑO DE LETRA (Prueba de 18 a 30)
          letterSpacing: 2,           // 5. ESPACIADO ENTRE LETRAS (Para estilo lujo)
        },
        headerTitleAlign: 'center',   // 6. CENTRAR TÍTULO ('center' o 'left')
        headerTitle: "Bonjour THE DICE", // 7. TU NOMBRE PERSONALIZADO
        
        // --- CONFIGURACIÓN DEL FONDO GENERAL ---
        contentStyle: {
          backgroundColor: '#1A0900', // 8. FONDO DE TODA LA APP (Negro carbón)
        },
      }}
    >
      {/* Definimos las rutas para que respeten el diseño */}
      <Stack.Screen name="index" options={{ title: 'Lobby' }} />
      <Stack.Screen name="games/dice" options={{ title: 'Mesa de Juego' }} />
    </Stack>
  );
}