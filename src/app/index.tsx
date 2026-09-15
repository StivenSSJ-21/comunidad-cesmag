import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function OpcionMenu({
  icono,
  titulo,
  descripcion,
  onPress,
}: {
  icono: string;
  titulo: string;
  descripcion: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconoCaja}>
        <Text style={styles.icono}>{icono}</Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitulo}>{titulo}</Text>
        <Text style={styles.cardDescripcion}>{descripcion}</Text>
      </View>

      <Text style={styles.flecha}>›</Text>
    </Pressable>
  );
}

export default function Inicio() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* PORTADA PRINCIPAL */}
      <View style={styles.hero}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
          }}
          style={styles.imagenHero}
        />

        <View style={styles.overlay}>
          <Text style={styles.etiqueta}>
            UNIVERSIDAD CESMAG
          </Text>

          <Text style={styles.titulo}>
            Comunidad CESMAG
          </Text>

          <Text style={styles.subtitulo}>
            Un espacio para compartir ideas, pedir ayuda,
            conocer personas y socializar con la comunidad universitaria.
          </Text>
        </View>
      </View>

      {/* BIENVENIDA */}
      <View style={styles.saludoBox}>
        <View>
          <Text style={styles.saludoTitulo}>
            ¡Hola, estudiante!
          </Text>

          <Text style={styles.saludoTexto}>
            ¿Qué quieres hacer hoy?
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>🎓</Text>
        </View>
      </View>

      {/* RESUMEN */}
      <View style={styles.resumen}>

        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>3</Text>
          <Text style={styles.resumenTexto}>Opciones</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>CESMAG</Text>
          <Text style={styles.resumenTexto}>Comunidad</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>100%</Text>
          <Text style={styles.resumenTexto}>Social</Text>
        </View>

      </View>

      <Text style={styles.seccionTitulo}>
        ¿Qué deseas hacer?
      </Text>

      {/* TRES BOTONES ALINEADOS */}
      <View style={styles.botonesContainer}>

        {/* BOTÓN 1 - OPCIONMENU */}
        <View style={styles.botonPrincipal}>
          <OpcionMenu
            icono="📝"
            titulo="Publicar una idea"
            descripcion="Comparte tus ideas, propuestas o temas de interés."
            onPress={() => router.push("/formulario")}
          />
        </View>

        {/* BOTÓN 2 - PRESSABLE */}
        <Pressable
          style={styles.botonSimple}
          onPress={() => router.push("/imagenes")}
        >
          <View style={styles.iconoSimple}>
            <Text style={styles.icono}>🙋</Text>
          </View>

          <Text style={styles.tituloSimple}>
            Pedir ayuda
          </Text>

          <Text style={styles.descripcionSimple}>
            Encuentra apoyo para tus actividades.
          </Text>

          <Text style={styles.flechaSimple}>
            ›
          </Text>
        </Pressable>

        {/* BOTÓN 3 - PRESSABLE */}
        <Pressable
          style={styles.botonSimple}
          onPress={() => router.push("/contacto")}
        >
          <View style={styles.iconoSimple}>
            <Text style={styles.icono}>💬</Text>
          </View>

          <Text style={styles.tituloSimple}>
            Socializar
          </Text>

          <Text style={styles.descripcionSimple}>
            Conversa y comparte con otros estudiantes.
          </Text>

          <Text style={styles.flechaSimple}>
            ›
          </Text>
        </Pressable>

      </View>

      {/* DESTACADO */}
      <View style={styles.destacado}>

        <View style={styles.destacadoIcono}>
          <Text style={styles.destacadoEmoji}>💡</Text>
        </View>

        <View style={styles.destacadoInfo}>

          <Text style={styles.destacadoTitulo}>
            Comparte y participa
          </Text>

          <Text style={styles.destacadoTexto}>
            Tu idea puede ayudar a otros estudiantes.
            Participa, pregunta y construye comunidad.
          </Text>

        </View>

      </View>

      <Text style={styles.footer}>
        Universidad CESMAG · Comunidad Estudiantil
      </Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: "#F5F7FA",
    padding: 18,
  },

  /* PORTADA */

  hero: {
    height: 280,
    borderRadius: 28,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 6,
  },

  imagenHero: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 22,
    backgroundColor: "rgba(0, 51, 102, 0.82)",
  },

  etiqueta: {
    color: "#FFD100",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.8,
    marginBottom: 6,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitulo: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 21,
  },

  /* SALUDO */

  saludoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },

  saludoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#003366",
  },

  saludoTexto: {
    marginTop: 3,
    color: "#667085",
    fontSize: 14,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF1B8",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarTexto: {
    fontSize: 24,
  },

  /* RESUMEN */

  resumen: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 24,
    elevation: 2,
  },

  resumenItem: {
    flex: 1,
    alignItems: "center",
  },

  resumenNumero: {
    color: "#003366",
    fontSize: 18,
    fontWeight: "bold",
  },

  resumenTexto: {
    color: "#667085",
    fontSize: 12,
    marginTop: 3,
  },

  separador: {
    width: 1,
    height: 35,
    backgroundColor: "#D9E2EC",
  },

  /* TITULO */

  seccionTitulo: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 14,
  },

  /* CONTENEDOR DE LOS 3 BOTONES */

  botonesContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 12,
    marginBottom: 20,
  },

  /* PRIMER BOTON */

  botonPrincipal: {
    flex: 1.5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    minHeight: 170,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#003366",
    elevation: 2,
  },

  iconoCaja: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#FFF1B8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  icono: {
    fontSize: 25,
  },

  cardInfo: {
    alignItems: "center",
  },

  cardTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 5,
    textAlign: "center",
  },

  cardDescripcion: {
    color: "#667085",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },

  flecha: {
    fontSize: 28,
    color: "#003366",
    marginTop: 5,
  },

  /* SEGUNDO Y TERCER BOTON */

  botonSimple: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    minHeight: 170,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#D9E2EC",
    elevation: 2,
  },

  iconoSimple: {
    width: 55,
    height: 55,
    borderRadius: 17,
    backgroundColor: "#E8F0F8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  tituloSimple: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
    textAlign: "center",
    marginBottom: 5,
  },

  descripcionSimple: {
    color: "#667085",
    fontSize: 12,
    lineHeight: 17,
    textAlign: "center",
  },

  flechaSimple: {
    fontSize: 27,
    color: "#003366",
    marginTop: 5,
  },

  /* DESTACADO */

  destacado: {
    backgroundColor: "#E8F0F8",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  destacadoIcono: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#FFD100",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  destacadoEmoji: {
    fontSize: 25,
  },

  destacadoInfo: {
    flex: 1,
  },

  destacadoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003366",
    marginBottom: 4,
  },

  destacadoTexto: {
    color: "#52606D",
    fontSize: 13,
    lineHeight: 19,
  },

  /* PIE */

  footer: {
    textAlign: "center",
    color: "#667085",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 12,
  },

});

