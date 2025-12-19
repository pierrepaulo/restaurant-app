import { Button } from "@/components/Button";
import { Input } from "@/components/input";
import { colors, fontSize, spacing } from "@/constants/theme";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    console.log({ email, password });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoBrand}>
            Cantina <Text style={styles.logoText}>App</Text>
          </Text>
          <Text style={styles.logoSubtitle}>Garçom App</Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label="Email"
            placeholder="Digite seu email..."
            placeholderTextColor={colors.gray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha..."
            placeholderTextColor={colors.gray}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <Button title="Fazer login" loading={loading} onPress={handleLogin} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollContent: {
    justifyContent: "center",
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  logoText: {
    color: colors.primary,
  },
  logoBrand: {
    color: colors.brand,
    fontSize: 40,
    fontWeight: "bold",
  },
  logoSubtitle: {
    color: colors.primary,
    fontSize: fontSize.lg,
  },
  formContainer: {
    gap: spacing.md,
  },
});
