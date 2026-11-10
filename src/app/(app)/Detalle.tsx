import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { supabase } from "../../lib/supabase";

type Categoria = {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  color: string;
};

type Idea = Record<string, any>;

// Posibles nombres de columnas en ideas_cesmag (se usa la primera que exista)
const COLS_CATEGORIA = [
  "categoria",
  "categoria_codigo",
  "codigo_categoria",
  "categoria_id",
  "id_categoria",
  "catalogo",
  "tipo",
  "area",
];
const COLS_TITULO = ["titulo", "title", "nombre", "asunto", "idea"];
const COLS_DESCRIPCION = [
  "descripcion",
  "contenido",
  "detalle",
  "mensaje",
  "texto",
  "idea",
];

const normalizar = (v: any) =>
  String(v ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();

// Dos textos "coinciden" si son iguales, uno contiene al otro,
// o comparten el inicio (Académico / Académica)
const coincide = (a: any, b: any) => {
  const x = normalizar(a);
  const y = normalizar(b);
  if (!x || !y) return false;
  if (x === y || x.includes(y) || y.includes(x)) return true;
  return x.length >= 6 && y.length >= 6 && x.slice(0, 6) === y.slice(0, 6);
};

const primeraColumna = (fila: Idea | undefined, candidatas: string[]) =>
  fila ? candidatas.find((c) => c in fila) : undefined;

export default function Detalle() {
  const params = useLocalSearchParams<{
    codigo?: string | string[];
    id?: string | string[];
  }>();

  const crudo = params.codigo ?? params.id;
  const codigo = String(Array.isArray(crudo) ? crudo[0] : crudo ?? "").trim();

  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [columnas, setColumnas] = useState<string[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorText, setErrorText] = useState("");

  const cargar = useCallback(async () => {
    try {
      setCargando(true);
      setErrorText("");

      if (!codigo) {
        setErrorText("No llegó el código de la categoría.");
        return;
      }

      // 1. Categoría desde la tabla Catalago (por código; si no, por id)
      let { data: cat, error: errCat } = await supabase
        .from("Catalago")
        .select("id,codigo,nombre,descripcion,color")
        .eq("codigo", codigo)
        .maybeSingle();

      if (errCat) throw errCat;

      if (!cat && /^\d+$/.test(codigo)) {
        const res = await supabase
          .from("Catalago")
          .select("id,codigo,nombre,descripcion,color")
          .eq("id", Number(codigo))
          .maybeSingle();
        if (res.error) throw res.error;
        cat = res.data;
      }

      if (!cat) {
        setErrorText(`No existe una categoría con el código "${codigo}".`);
        setIdeas([]);
        return;
      }
      setCategoria(cat);

      // 2. Ideas desde ideas_cesmag
      const { data: todas, error: errIdeas } = await supabase
        .from("ideas_cesmag")
        .select("*")
        .limit(1000);

      if (errIdeas) throw errIdeas;

      const filas: Idea[] = todas ?? [];
      if (filas.length > 0) setColumnas(Object.keys(filas[0]));

      // 3. Filtrar las de esta categoría
      const colCat = primeraColumna(filas[0], COLS_CATEGORIA);

      const filtradas = colCat
        ? filas.filter((f) => {
            const v = f[colCat];
            return (
              coincide(v, cat!.nombre) ||
              normalizar(v) === normalizar(cat!.codigo) ||
              String(v) === String(cat!.id)
            );
          })
        : [];

      filtradas.sort((a, b) => Number(b.id ?? 0) - Number(a.id ?? 0));
      setIdeas(filtradas);
    } catch (e: any) {
      console.error("Error al cargar ideas:", e);
      setErrorText("No fue posible cargar: " + (e?.message ?? String(e)));
      setIdeas([]);
    } finally {
      setCargando(false);
    }
  }, [codigo]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const colorCat = categoria?.color || "#003366";

  if (cargando) {
    return (
      <>
        <Stack.Screen options={{ title: "Ideas" }} />
        <ActivityIndicator style={{ flex: 1 }} size="large" color="#003366" />
      </>
    );
  }

  if (errorText) {
    return (
      <View style={styles.centro}>
        <Stack.Screen options={{ title: "Ideas" }} />
        <Text style={styles.error}>{errorText}</Text>
        <Pressable style={styles.reintentar} onPress={cargar}>
          <Text style={styles.reintentarTexto}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const colTitulo = primeraColumna(ideas[0], COLS_TITULO);
  const colDesc = primeraColumna(ideas[0], COLS_DESCRIPCION);
  const colCat = primeraColumna(ideas[0], COLS_CATEGORIA);

  return (
    <>
      <Stack.Screen options={{ title: categoria?.nombre ?? "Ideas" }} />

      <FlatList
        data={ideas}
        keyExtractor={(item, i) => String(item.id ?? i)}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <View style={[styles.cabecera, { borderLeftColor: colorCat }]}>
            <Text style={styles.cabeceraTitulo}>{categoria?.nombre}</Text>
            <Text style={styles.cabeceraTexto}>{categoria?.descripcion}</Text>
            <Text style={styles.contador}>
              {ideas.length} {ideas.length === 1 ? "idea publicada" : "ideas publicadas"}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View>
            <Text style={styles.vacio}>
              Todavía no hay ideas publicadas en esta categoría.
            </Text>
            {columnas.length > 0 && !colCat && (
              <Text style={styles.ayuda}>
                No encontré la columna de categoría en ideas_cesmag. Columnas
                detectadas: {columnas.join(", ")}
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => {
          const titulo = colTitulo ? item[colTitulo] : undefined;
          const descripcion = colDesc && colDesc !== colTitulo ? item[colDesc] : undefined;

          return (
            <View style={[styles.card, { borderLeftColor: colorCat }]}>
              <Text style={styles.titulo}>{String(titulo ?? "Idea sin título")}</Text>
              {!!descripcion && (
                <Text style={styles.descripcion}>{String(descripcion)}</Text>
              )}
              {!!item.created_at && (
                <Text style={styles.fecha}>
                  {new Date(item.created_at).toLocaleDateString()}
                </Text>
              )}
            </View>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  lista: { padding: 18, backgroundColor: "#F5F7FA", flexGrow: 1 },
  cabecera: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
    elevation: 2,
  },
  cabeceraTitulo: { color: "#003366", fontSize: 22, fontWeight: "bold" },
  cabeceraTexto: { color: "#52606D", fontSize: 13, marginTop: 4 },
  contador: { color: "#003366", fontSize: 13, fontWeight: "600", marginTop: 8 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 6,
    elevation: 2,
  },
  titulo: { color: "#003366", fontSize: 17, fontWeight: "bold" },
  descripcion: { color: "#52606D", fontSize: 14, marginTop: 6 },
  fecha: { color: "#98A2B3", fontSize: 12, marginTop: 8 },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  error: { color: "#B42318", textAlign: "center", marginBottom: 12 },
  reintentar: { backgroundColor: "#003366", padding: 12, borderRadius: 12 },
  reintentarTexto: { color: "#FFFFFF", fontWeight: "bold" },
  vacio: { textAlign: "center", color: "#667085", marginTop: 30 },
  ayuda: { textAlign: "center", color: "#B54708", marginTop: 12, fontSize: 12 },
});