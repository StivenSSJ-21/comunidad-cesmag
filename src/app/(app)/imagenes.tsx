import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Ayuda() {

  const [nombre, setNombre] = useState("");
  const [ayuda, setAyuda] = useState("");
  const [publicado, setPublicado] = useState(false);

  function publicarAyuda() {

    if (nombre !== "" && ayuda !== "") {
      setPublicado(true);
    }

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>
        Pedir ayuda
      </Text>

      <Text style={styles.subtitulo}>
        Cuéntale a la comunidad CESMAG en qué necesitas ayuda
      </Text>

      <View style={styles.formulario}>

        <Text style={styles.label}>
          Nombre
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>
          ¿En qué necesitas ayuda?
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ejemplo: Necesito ayuda con programación"
          value={ayuda}
          onChangeText={setAyuda}
          multiline
        />

        <Pressable
          style={styles.boton}
          onPress={publicarAyuda}
        >
          <Text style={styles.textoBoton}>
            Publicar solicitud
          </Text>
        </Pressable>

      </View>

      {publicado && (

        <View style={styles.publicacion}>

          <Text style={styles.nombre}>
            🎓 {nombre}
          </Text>

          <Text style={styles.tituloAyuda}>
            Necesita ayuda
          </Text>

          <Text style={styles.textoAyuda}>
            {ayuda}
          </Text>

          <Text style={styles.comunidad}>
            Comunidad CESMAG
          </Text>

        </View>

      )}

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
    minHeight: 50,
  },

  boton: {
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  publicacion: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    elevation: 2,
  },

  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 12,
  },

  tituloAyuda: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#667085",
    marginBottom: 8,
  },

  textoAyuda: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 23,
    marginBottom: 15,
  },

  comunidad: {
    fontSize: 12,
    color: "#667085",
  },

});

