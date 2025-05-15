import { Stack } from 'expo-router';
import InfoRegisterScreen from './basicInfoRegister';




export default function RootStacklayout()
{
  console.log("coming to onbarding");
  
    return (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="basicInfoRegister"   />
    
        </Stack>
      );
}