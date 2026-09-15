import { Stack } from 'expo-router';

export default function RootLayout() {

  return (

    <Stack>

      <Stack.Screen
        name="index"
        options={{
          title: 'Foro CESMAG',
        }}
      />

      <Stack.Screen
        name="menu"
        options={{
          title: 'Menú del foro',
        }}
      />

      <Stack.Screen
        name="contacto"
        options={{
          title: 'Contacto',
        }}
      />

    </Stack>

  );
}
