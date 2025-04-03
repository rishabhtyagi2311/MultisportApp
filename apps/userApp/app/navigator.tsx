import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "@/atoms/atoms";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { Stack } from "expo-router";
import RootStacklayout from "./(onboardingStack)/_layout";
export default function NavigationHandler() {
  console.log("here");
  
  const [isAuthenticated, setAuthenticated] = useRecoilState(authState);

  useEffect(() => {
    const loadAuthState = async () => {
      try {
        const userId = await AsyncStorage.getItem("user_id");
        setAuthenticated(!!userId);
      } catch (error) {
        console.error("Error loading auth state:", error);
        setAuthenticated(false);
      }
    };
    loadAuthState();
  }, []);

  if (isAuthenticated === null) {
    console.log("navigator is here");
    
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
    
  return <RootStacklayout/>;
}
