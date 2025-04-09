// app/(footballStack)/_layout.tsx
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function FootballStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1f2937' },
        headerTintColor: '#f8fafc',
        headerTitle: 'Football',
      }}
    >
      <Stack.Screen name ="index" options={{headerShown : false}}/>
      <Stack.Screen
        name="main"
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.replace('/(homeScreenTabs)/sports')}>
              <Ionicons name="arrow-back" size={24} color="#f8fafc" style={{ marginLeft: 16 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
      name = "optionsScreen"
      options={{
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity onPress={() => router.replace('/(homeScreenTabs)/sports')}>
            <Ionicons name="arrow-back" size={24} color="#f8fafc" style={{ marginLeft: 16 }} />
          </TouchableOpacity>
        ),
      }}
      

      />
    </Stack>
  );
}
