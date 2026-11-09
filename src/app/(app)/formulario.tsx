import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { supabase } from "../../lib/supabase";

const CATEGORIAS = [
  "Académica",
  "Cultural",
  "Deportiva",
  "Tecnología",
  "Bienestar",
  "Otra",
];

export default function Formulario() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [programa, setPrograma] = useState("");
  const [idea, setIdea] = useState("");
  const [categoriaElegida, setCategoriaElegida] = useState("");
  const [otraCategoria, setOtraCategoria] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Si elige "Otra", se usa lo que escriba en el campo de texto
  const categoria =
    categoriaElegida === "Otra" ? otraCategoria.trim() : categoriaElegida;

  const guardar = async () => {
    if (
      !nombre.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !programa.trim() ||
      !idea.trim() ||
      !categoria
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      setGuardando(true);

      const { data, error } = await supabase
        .from("ideas_cesmag")
        .insert([
          {
            nombre: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            programa: programa.trim(),
            idea: idea.trim(),
            categoria,
          },
        ])
        .select();

      if (error) {
        console.log("Error Supabase:", error);
        alert(error.message);
        return;
      }

      const registro = data?.[0];

      if (!registro) {
        alert("Supabase no devolvió el registro creado");
        return;
      }

      setNombre("");
      setCorreo("");
      setTelefono("");
      setPrograma("");
      setIdea("");
      setCategoriaElegida("");
      setOtraCategoria("");

      router.push({
        pathname: "/resultado",
        params: {
          id: String(registro.id),
          nombre: registro.nombre,
          correo: registro.correo,
          telefono: registro.telefono,
          programa: registro.programa,
          idea: registro.idea,
          categoria: registro.categoria,
        },
      });
    } catch (error) {
      console.log(error);
      alert("No fue posible guardar la información");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* TITULO */}

      <Text style={styles.titulo}>
        Publicar una idea
      </Text>

      <Text style={styles.subtitulo}>
        Comparte una idea con la comunidad CESMAG
      </Text>

      {/* FORMULARIO */}

      <View style={styles.formulario}>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: laura@gmail.com"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 3001234567"
          value={telefono}
          onChangeText={setTelefono}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Programa académico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Ingeniería de Sistemas"
          value={programa}
          onChangeText={setPrograma}
        />

        <Text style={styles.label}>¿Qué quieres compartir?</Text>
        <TextInput
          style={styles.inputIdea}
          placeholder="Escribe tu idea..."
          value={idea}
          onChangeText={setIdea}
          multiline
        />

        <Text style={styles.label}>Categoría de la idea</Text>
        <View style={styles.chips}>
          {CATEGORIAS.map((opcion) => {
            const activo = categoriaElegida === opcion;
            return (
              <Pressable
                key={opcion}
                style={[styles.chip, activo && styles.chipActivo]}
                onPress={() => setCategoriaElegida(opcion)}
              >
                <Text style={[styles.chipTexto, activo && styles.chipTextoActivo]}>
                  {opcion}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {categoriaElegida === "Otra" && (
          <TextInput
            style={styles.input}
            placeholder="¿Cuál? Ej: Emprendimiento, Voluntariado..."
            value={otraCategoria}
            onChangeText={setOtraCategoria}
          />
        )}

        <Pressable
          style={[styles.boton, guardando && { opacity: 0.7 }]}
          onPress={guardar}
          disabled={guardando}
        >
          {guardando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.textoBoton}>Publicar idea</Text>
          )}
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
    marginBottom: 18,
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },

  chip: {
    borderWidth: 1,
    borderColor: "#D9E2EC",
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },

  chipActivo: {
    backgroundColor: "#003366",
    borderColor: "#003366",
  },

  chipTexto: {
    color: "#003366",
    fontSize: 13,
  },

  chipTextoActivo: {
    color: "#FFD100",
    fontWeight: "bold",
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

});
