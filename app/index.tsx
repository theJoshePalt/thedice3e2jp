import { Redirect } from 'expo-router';

export default function Index() {
  // Redirige automáticamente a la ruta /games/dice
  return <Redirect href="/games/dice" />;
}