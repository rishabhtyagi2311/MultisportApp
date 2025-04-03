import { createStackNavigator } from '@react-navigation/stack';
import InfoRegisterScreen from './basicInfoRegister';

const Stack = createStackNavigator();



export default function RootStacklayout()
{
  console.log("coming to onbarding");
  
    return (
        <Stack.Navigator  >
          <Stack.Screen name="basicInfoRegister" component={InfoRegisterScreen} />
    
        </Stack.Navigator>
      );
}