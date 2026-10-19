import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#003366" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Foro CESMAG" }} />
      <Stack.Screen name="formulario" options={{ title: "Publicar una idea" }} />
      <Stack.Screen name="resultado" options={{ title: "Idea publicada" }} />
      <Stack.Screen name="registros" options={{ title: "Ideas de la comunidad" }} />
      <Stack.Screen name="imagenes" options={{ title: "Pedir ayuda" }} />
      <Stack.Screen name="contacto" options={{ title: "Contacto" }} />
    </Stack>
  );
}
