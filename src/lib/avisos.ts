import { Alert, Platform } from "react-native";

// Alert.alert no muestra nada en la versión web de React Native,
// así que en web se usa window.alert y en celular Alert.alert.
export function mostrarAviso(titulo: string, mensaje: string) {
  if (Platform.OS === "web") {
    window.alert(`${titulo}\n\n${mensaje}`);
  } else {
    Alert.alert(titulo, mensaje);
  }
}
