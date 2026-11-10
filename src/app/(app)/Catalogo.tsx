import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { supabase } from "../../lib/supabase";

type Item = {
  codigo: string;
  nombre: string;
  descripcion: string;
  icono: string;
  color: string;
  orden: number;
  activo: boolean;
};

export default function Catalogo() {
  const router = useRouter();

  const [items, setItems] = useState<Item[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [errorText, setErrorText] = useState("");

  const cargarCatalogo = async () => {
    try {
      setCargando(true);
      setErrorText("");

      const { data, error } = await supabase
        .from("Catalago")
        .select("codigo,nombre,descripcion,icono,color,orden,activo")
        .eq("activo", true)
        .order("orden", { ascending: true });

      if (error) {
        console.error("error supabase:", error);
        throw error;
      }

      console.log("productos recibidos:", data);
      setItems(data || []);
    } catch (error: unknown) {
      console.error("Error al cargar el catalogo", error);

      const mensaje =
        error instanceof Error
          ? error.message
          : typeof error === "object" &&
              error !== null &&
              "message" in error
            ? String(error.message)
            : String(error);

      setErrorText("No fue posible cargar: " + mensaje);
      setItems([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCatalogo();
  }, []);

  if (cargando) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#003366" />
    );
  }

  if (errorText) {
    return (
      <View style={styles.centro}>
        <Text style={styles.error}>{errorText}</Text>
        <Pressable style={styles.reintentar} onPress={cargarCatalogo}>
          <Text style={styles.reintentarTexto}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.codigo}
      contentContainerStyle={styles.lista}
      ListEmptyComponent={
        <Text style={styles.vacio}>No hay categorías disponibles.</Text>
      }
      renderItem={({ item }) => (
        <Pressable
          style={[styles.card, { borderLeftColor: item.color || "#003366" }]}
          onPress={() =>
            router.push({
              pathname: "/Detalle",
              params: { codigo: item.codigo },
            })
          }
        >
          <Text style={styles.nombre}>{item.nombre}</Text>
          <Text style={styles.descripcion}>{item.descripcion}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: { padding: 18, backgroundColor: "#F5F7FA", flexGrow: 1 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    elevation: 2,
  },
  nombre: { color: "#003366", fontSize: 18, fontWeight: "bold" },
  descripcion: { color: "#52606D", fontSize: 13, marginTop: 4 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  error: { color: "#B42318", textAlign: "center", marginBottom: 12 },
  reintentar: { backgroundColor: "#003366", padding: 12, borderRadius: 12 },
  reintentarTexto: { color: "#FFFFFF", fontWeight: "bold" },
  vacio: { textAlign: "center", color: "#667085", marginTop: 40 },
});