import { Stack } from "expo-router";


export default function MyTeamsayout()
{

    return (
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#111827' },
            headerTintColor: '#f8fafc',
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="index"  options={{headerShown : false}}/>
          <Stack.Screen name = "setTeams" options={{headerShown : false}}/>
          <Stack.Screen name = "matchBase2" options={{headerShown : false}}/>
          <Stack.Screen name = "selectTeam" options ={{headerShown : false}}/>
         
        </Stack>
      );
}