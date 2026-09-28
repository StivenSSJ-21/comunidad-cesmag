import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Resultado() {
  const router = useRouter();

  const { id, nombre, correo, telefono, programa, idea, categoria } =
    useLocalSearchParams<{
      id: string;
      nombre: string;
      correo: string;
      telefono: string;
      programa: string;
      idea: string;
      categoria: string;
    }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>¡Idea publicada!</Text>
      <Text style={styles.subtitulo}>
        Estos son los datos que devolvió Supabase
      </Text>

      <View style={styles.card}>

        <View style={styles.cabecera}>
          <View style={styles.avatar}>
            <Text style={styles.avatarTexto}>🎓</Text>
          </View>

          <View>
            <Text style={styles.registro}>Publicación #{id}</Text>
            <Text style={styles.comunidad}>Comunidad CESMAG</Text>
          </View>
        </View>

        <Text style={styles.dato}>Nombre: {nombre}</Text>
        <Text style={styles.dato}>Correo: {correo}</Text>
        <Text style={styles.dato}>Teléfono: {telefono}</Text>
        <Text style={styles.dato}>Programa: {programa}</Text>
        <Text style={styles.dato}>Categoría: {categoria}</Text>

        <Text style={styles.ideaTitulo}>Idea</Text>
        <Text style={styles.idea}>{idea}</Text>

      </View>

      <Pressable style={styles.boton} onPress={() => router.push("/registros")}>
        <Text style={styles.botonTexto}>Ver ideas de la comunidad</Text>
      </Pressable>

      <Pressable style={styles.botonSecundario} onPress={() => router.back()}>
        <Text style={styles.botonSecundarioTexto}>Publicar otra idea</Text>
      </Pressable>

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

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    elevation: 2,
  },

  cabecera: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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

  registro: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#003366",
  },

  comunidad: {
    fontSize: 12,
    color: "#667085",
    marginTop: 2,
  },

  dato: {
    fontSize: 15,
    color: "#333333",
    marginBottom: 6,
  },

  ideaTitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#667085",
    marginTop: 10,
    marginBottom: 6,
  },

  idea: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 23,
  },

  boton: {
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },

  botonTexto: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  botonSecundario: {
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#003366",
  },

  botonSecundarioTexto: {
    color: "#003366",
    fontSize: 15,
    fontWeight: "bold",
  },

});
