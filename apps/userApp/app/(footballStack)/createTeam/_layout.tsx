// app/(footballStack)/createTeam/layout.tsx
import { Stack } from 'expo-router';

export default function CreateTeamLayout() {
    console.log("in layout of ct");
    
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#111827' },
        headerTintColor: '#f8fafc',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Team Info' }} />
      <Stack.Screen name="addMembers" options={{ title: 'Add Players' , headerShown : false}} />
    </Stack>
  );
}
