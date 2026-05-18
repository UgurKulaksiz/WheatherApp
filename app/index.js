import { Link } from "expo-router";
import { Pressable, StatusBar, Text, View } from "react-native";
import { styles } from '../lib/styles';

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.centeredContent}>
        <View style={styles.glow} />

        <Text style={styles.title}>☁️ Weather App</Text>
        <Text style={styles.subtitle}>La météo du futur, aujourd'hui.</Text>

        <Link href="/Weather" asChild>
            <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
            <Text style={styles.buttonTextHome}>Accéder à la météo</Text>
            </Pressable>
        </Link>
      </View>
    </View>
  );
}