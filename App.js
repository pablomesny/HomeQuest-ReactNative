import * as SplashScreen from "expo-splash-screen";
import MainStack from "./navigation/MainStack";
import { AuthProvider } from "./src/context/auth-context/AuthContext";

// TODO: Resize splash screen

export default function App() {
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

  return (
    <AuthProvider>
      <MainStack />
    </AuthProvider>
  );
}
