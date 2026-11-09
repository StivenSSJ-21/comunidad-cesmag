import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { mostrarAviso } from "../../lib/avisos";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async () => {
    if (!correo.trim() || !password) {
      mostrarAviso("Campos incompletos", "Ingresa tu correo y tu contraseña");
      return;
    }

    try {
      setCargando(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: correo.trim(),
        password,
      });

      if (error) {
        mostrarAviso("Inicio de sesión", error.message);
        return;
      }

      // No hace falta router.replace("/"):
      // Stack.Protected reacciona cuando existe la sesión.
    } finally {
      setCargando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F5F7FA" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>🎓</Text>
        </View>

        <Text style={styles.etiqueta}>UNIVERSIDAD CESMAG</Text>
        <Text style={styles.titulo}>Comunidad CESMAG</Text>
        <Text style={styles.subtitulo}>
          Inicia sesión para compartir ideas con la comunidad
        </Text>

        <View style={styles.formulario}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: laura@gmail.com"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable
            style={[styles.boton, cargando && { opacity: 0.7 }]}
            onPress={iniciarSesion}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.botonTexto}>Iniciar sesión</Text>
            )}
          </Pressable>
        </View>

        <Pressable onPress={() => router.push("/registro")}>
          <Text style={styles.enlace}>¿No tienes cuenta? Regístrate</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },

  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#FFF1B8",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 14,
  },

  avatarTexto: {
    fontSize: 42,
  },

  etiqueta: {
    color: "#B38F00",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.8,
    textAlign: "center",
    marginBottom: 4,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
  },

  subtitulo: {
    color: "#667085",
    fontSize: 14,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 24,
  },

  formulario: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    elevation: 2,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 12,
    padding: 12,
    marginBottom: 18,
    fontSize: 14,
    backgroundColor: "#F9FAFB",
  },

  boton: {
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  botonTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  enlace: {
    color: "#003366",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
  },
});
