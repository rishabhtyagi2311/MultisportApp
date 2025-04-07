import { createStackNavigator } from '@react-navigation/stack';
import InfoRegisterScreen from './basicInfoRegister';
import { BlurView } from 'expo-blur';
import { StyleSheet } from "react-native";


const Stack = createStackNavigator();



export default function RootStacklayout()
{
  console.log("coming to onbarding");
  
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="basicInfoRegister" component={InfoRegisterScreen}  />
    
        </Stack.Navigator>
      );
}