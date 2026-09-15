import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Formulario() {

  const [nombre, setNombre] = useState("");
  const [idea, setIdea] = useState("");
  const [publicado, setPublicado] = useState(false);

  function publicarIdea() {

    if (nombre !== "" && idea !== "") {
      setPublicado(true);
    }

  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* TITULO */}

      <Text style={styles.titulo}>
        Publicar una idea
      </Text>

      <Text style={styles.subtitulo}>
        Comparte una idea con la comunidad CESMAG
      </Text>

      {/* FORMULARIO */}

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
          ¿Qué quieres compartir?
        </Text>

        <TextInput
          style={styles.inputIdea}
          placeholder="Escribe tu idea..."
          value={idea}
          onChangeText={setIdea}
          multiline
        />

        <Pressable
          style={styles.boton}
          onPress={publicarIdea}
        >
          <Text style={styles.textoBoton}>
            Publicar idea
          </Text>
        </Pressable>

      </View>

      {/* PUBLICACION */}

      {publicado && (

        <View style={styles.publicacion}>

          <View style={styles.cabeceraPublicacion}>

            <View style={styles.avatar}>
              <Text style={styles.avatarTexto}>
                🎓
              </Text>
            </View>

            <View>
              <Text style={styles.nombrePublicacion}>
                {nombre}
              </Text>

              <Text style={styles.usuario}>
                Comunidad CESMAG
              </Text>
            </View>

          </View>

          <Text style={styles.ideaPublicada}>
            {idea}
          </Text>

          <View style={styles.interacciones}>

            <Text style={styles.interaccion}>
              💬 Comentar
            </Text>

            <Text style={styles.interaccion}>
              ❤️ Me gusta
            </Text>

          </View>

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
  },

  inputIdea: {
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 12,
    padding: 12,
    height: 120,
    textAlignVertical: "top",
    fontSize: 14,
    backgroundColor: "#F9FAFB",
    marginBottom: 15,
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

  /* PUBLICACION */

  publicacion: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    elevation: 2,
  },

  cabeceraPublicacion: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#FFF1B8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  avatarTexto: {
    fontSize: 21,
  },

  nombrePublicacion: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#003366",
  },

  usuario: {
    fontSize: 12,
    color: "#667085",
    marginTop: 2,
  },

  ideaPublicada: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 23,
    marginBottom: 18,
  },

  interacciones: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
  },

  interaccion: {
    color: "#003366",
    fontSize: 13,
  },

});

