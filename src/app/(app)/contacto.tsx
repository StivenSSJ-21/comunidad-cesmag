import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Socializar() {

  const [amigo, setAmigo] = useState("Juan");
  const [mensaje, setMensaje] = useState("");
  const [mensajeEnviado, setMensajeEnviado] = useState("");

  function enviarMensaje() {

    if (mensaje !== "") {
      setMensajeEnviado(mensaje);
      setMensaje("");
    }

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>
        Socializar
      </Text>

      <Text style={styles.subtitulo}>
        Conversa con tus amigos de la comunidad CESMAG
      </Text>

      {/* AMIGOS */}

      <Text style={styles.label}>
        Mis amigos
      </Text>

      <View style={styles.amigos}>

        <Pressable
          style={styles.amigo}
          onPress={() => setAmigo("Juan")}
        >
          <Text style={styles.avatar}>
            👨‍🎓
          </Text>

          <Text style={styles.nombre}>
            Juan
          </Text>
        </Pressable>

        <Pressable
          style={styles.amigo}
          onPress={() => setAmigo("María")}
        >
          <Text style={styles.avatar}>
            👩‍🎓
          </Text>

          <Text style={styles.nombre}>
            María
          </Text>
        </Pressable>

        <Pressable
          style={styles.amigo}
          onPress={() => setAmigo("Carlos")}
        >
          <Text style={styles.avatar}>
            👨‍🎓
          </Text>

          <Text style={styles.nombre}>
            Carlos
          </Text>
        </Pressable>

      </View>

      {/* CONVERSACION */}

      <View style={styles.conversacion}>

        <Text style={styles.nombreChat}>
          Conversando con {amigo}
        </Text>

        <View style={styles.mensajeAmigo}>
          <Text>
            ¡Hola! ¿Cómo estás?
          </Text>
        </View>

        {mensajeEnviado !== "" && (

          <View style={styles.miMensaje}>
            <Text style={styles.textoMiMensaje}>
              {mensajeEnviado}
            </Text>
          </View>

        )}

        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={mensaje}
          onChangeText={setMensaje}
        />

        <Pressable
          style={styles.boton}
          onPress={enviarMensaje}
        >
          <Text style={styles.textoBoton}>
            Enviar
          </Text>
        </Pressable>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#F5F7FA",
    padding: 18,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 6,
  },

  subtitulo: {
    fontSize: 14,
    color: "#667085",
    marginBottom: 20,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 10,
  },

  amigos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  amigo: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 15,
    alignItems: "center",
    width: "30%",
    elevation: 2,
  },

  avatar: {
    fontSize: 30,
    marginBottom: 5,
  },

  nombre: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#003366",
  },

  conversacion: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    elevation: 2,
  },

  nombreChat: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 20,
  },

  mensajeAmigo: {
    backgroundColor: "#E9EEF5",
    padding: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginBottom: 12,
  },

  miMensaje: {
    backgroundColor: "#003366",
    padding: 12,
    borderRadius: 12,
    alignSelf: "flex-end",
    marginBottom: 15,
  },

  textoMiMensaje: {
    color: "#FFFFFF",
  },

  input: {
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#F9FAFB",
    marginBottom: 12,
  },

  boton: {
    backgroundColor: "#003366",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

});

