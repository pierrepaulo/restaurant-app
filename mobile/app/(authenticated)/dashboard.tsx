import { useAuth } from "@/context/AuthContext";
import { Button, Text, View } from "react-native";

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <View>
      <Text>Pagina Dashboard</Text>
      <Text>Pagina Dashboard</Text>
      <Text>Pagina Dashboard</Text>
      <Button title="Sair" onPress={signOut} />
    </View>
  );
}
