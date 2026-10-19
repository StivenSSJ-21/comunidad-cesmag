import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { supabase } from "../../lib/supabase";

type Registro = {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  programa: string;
  idea: string;
  categoria: string;
};

export default function Registros() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);

  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = async () => {
    const { data, error } = await supabase
      .from("ideas_cesmag")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log("Error Supabase:", error);
      alert(error.message);
    } else {
      setRegistros(data || []);
    }

    setCargando(false);
    setRefrescando(false);
  };

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#003366" />
        <Text style={styles.cargando}>Consultando Supabase...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Ideas de la comunidad</Text>
      <Text style={styles.contador}>
        {registros.length} {registros.length === 1 ? "idea publicada" : "ideas publicadas"}
      </Text>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refrescando}
        onRefresh={() => {
          setRefrescando(true);
          cargarRegistros();
        }}
        ListEmptyComponent={
          <Text style={styles.vacio}>Aún no hay ideas. ¡Sé el primero en publicar!</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>

            <View style={styles.cabecera}>
              <View style={styles.avatar}>
                <Text style={styles.avatarTexto}>🎓</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.nombre}>{item.nombre}</Text>
                <Text style={styles.programa}>{item.programa}</Text>
              </View>
            </View>

            <Text style={styles.idea}>{item.idea}</Text>

            <Text style={styles.correo}>{item.correo}</Text>

            <View style={styles.etiqueta}>
              <Text style={styles.etiquetaTexto}>{item.categoria}</Text>
            </View>

            <View style={styles.interacciones}>
              <Text style={styles.interaccion}>💬 Comentar</Text>
              <Text style={styles.interaccion}>❤️ Me gusta</Text>
            </View>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 18,
  },

  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
  },

  cargando: {
    marginTop: 10,
    color: "#003366",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 4,
  },

  contador: {
    textAlign: "center",
    color: "#667085",
    fontSize: 13,
    marginBottom: 18,
  },

  vacio: {
    textAlign: "center",
    color: "#667085",
    marginTop: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    elevation: 2,
  },

  cabecera: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
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

  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
  },

  programa: {
    fontSize: 12,
    color: "#667085",
    marginTop: 2,
  },

  idea: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 23,
    marginBottom: 12,
  },

  correo: {
    fontSize: 12,
    color: "#667085",
    marginBottom: 10,
  },

  etiqueta: {
    alignSelf: "flex-start",
    backgroundColor: "#FFD100",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  etiquetaTexto: {
    color: "#003366",
    fontWeight: "bold",
    fontSize: 12,
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
