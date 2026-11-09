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

export default function Registro() {
  const router = useRouter();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [guardando, setGuardando] = useState(false);

  const crearCuenta = async () => {
    if (!correo.trim() || !password) {
      mostrarAviso("Campos incompletos", "Ingresa tu correo y tu contraseña");
      return;
    }

    if (password.length < 6) {
      mostrarAviso("Contraseña", "Debe tener mínimo 6 caracteres");
      return;
    }

    try {
      setGuardando(true);

      const { error } = await supabase.auth.signUp({
        email: correo.trim(),
        password,
      });

      if (error) {
        mostrarAviso("Error", error.message);
        return;
      }

      // Para practicar el login, cerramos la sesión creada por signUp.
      await supabase.auth.signOut();

      mostrarAviso("Cuenta creada", "Ahora puedes iniciar sesión");
      router.replace("/login");
    } finally {
      setGuardando(false);
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

        <Text style={styles.titulo}>Crear cuenta</Text>
        <Text style={styles.subtitulo}>
          Únete a la Comunidad CESMAG y comparte tus ideas
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
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable
            style={[styles.boton, guardando && { opacity: 0.7 }]}
            onPress={crearCuenta}
            disabled={guardando}
          >
            {guardando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.botonTexto}>Crear cuenta</Text>
            )}
          </Pressable>
        </View>

        <Pressable onPress={() => router.replace("/login")}>
          <Text style={styles.enlace}>Ya tengo una cuenta</Text>
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
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFF1B8",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 12,
  },

  avatarTexto: {
    fontSize: 36,
  },

  titulo: {
    fontSize: 28,
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
