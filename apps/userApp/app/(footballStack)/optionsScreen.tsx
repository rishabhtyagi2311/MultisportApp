// app/(footballStack)/optionsScreen.tsx

import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function OptionsScreen() {
  return (
    <ScrollView className="bg-sky-100 px-5 py-6 flex-1 ">
      {/* CREATE TEAM */}
      <TouchableOpacity
        onPress={() => router.push('./createTeam')}
        className="bg-blue-950/85 rounded-xl p-5 mb-4 flex-row justify-between items-center shadow-md mt-7"
      >
        <Text className="text-slate-100 text-lg font-semibold">
          Create Team
        </Text>
        <Ionicons name="add-circle-outline" size={28} color="#f1f5f9" />
      </TouchableOpacity>

      {/* JOIN TEAM */}
      <TouchableOpacity
        // onPress={() => router.push('/(footballStack)/joinTeam')}
        className="bg-blue-950/85 rounded-xl p-5 mb-4 flex-row justify-between items-center shadow-md"
      >
        <Text className="text-slate-100 text-lg font-semibold">
          Join Team
        </Text>
        <Ionicons name="log-in-outline" size={28} color="#f1f5f9" />
      </TouchableOpacity>

      {/* MY TEAMS */}
      <TouchableOpacity
        onPress={() => router.push('/(footballStack)/myTeams')}
        className="bg-blue-950/85 rounded-xl p-5 mb-4 flex-row justify-between items-center shadow-md"
      >
        <Text className="text-slate-100 text-lg font-semibold">
          My Teams
        </Text>
        <Ionicons name="people-outline" size={28} color="#f1f5f9" />
      </TouchableOpacity>

      {/* PROFILE */}
      <TouchableOpacity
        // onPress={() => router.push('/(footballStack)/profile')}
        className="bg-blue-950/85 rounded-xl p-5 mb-4 flex-row justify-between items-center shadow-md"
      >
        <Text className="text-slate-100 text-lg font-semibold">
          Profile
        </Text>
        <Ionicons name="person-circle-outline" size={28} color="#f1f5f9" />
      </TouchableOpacity>

      {/* START MATCH */}
      <TouchableOpacity
        // onPress={() => router.push('/(footballStack)/startMatch')}
        className="bg-blue-950/85 rounded-xl p-5 mb-4 flex-row justify-between items-center shadow-md"
      >
        <Text className="text-slate-100 text-lg font-semibold">
          Start Match
        </Text>
        <Ionicons name="play-circle-outline" size={28} color="#f1f5f9" />
      </TouchableOpacity>

      {/* STATS */}
      <TouchableOpacity
        // onPress={() => router.push('/(footballStack)/stats')}
        className="bg-blue-950/85 rounded-xl p-5 mb-4 flex-row justify-between items-center shadow-md"
      >
        <Text className="text-slate-100 text-lg font-semibold">
          Stats
        </Text>
        <Ionicons name="bar-chart-outline" size={28} color="#f1f5f9" />
      </TouchableOpacity>
    </ScrollView>
  );
}
