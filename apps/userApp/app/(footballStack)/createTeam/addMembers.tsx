import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { footballteamAtom } from '@/atoms/atoms';
import { footballService } from '@/services/football';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface Player {
  id: number;
  userId: number;
  nickname: string;
  role: string;
  experience: string;
}

export default function AddMembers() {
  const teamForm = useRecoilValue(footballteamAtom);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    footballService.fetchAllPlayers().then(setPlayers);
  }, []);

  const toggleSelect = (playerId: number) => {
    if (!teamForm?.maxPlayers) return;

    if (selectedPlayerIds.includes(playerId)) {
      setSelectedPlayerIds((prev) => prev.filter((id) => id !== playerId));
    } else if (selectedPlayerIds.length < teamForm.maxPlayers) {
      setSelectedPlayerIds((prev) => [...prev, playerId]);
    } else {
      Alert.alert('Limit reached', `You can only select ${teamForm.maxPlayers} players.`);
    }
  };

  const handleCreateTeam = async () => {
    try {
      if (
        !teamForm?.name ||
        !teamForm?.location ||
        typeof teamForm.maxPlayers !== 'number' ||
        selectedPlayerIds.length === 0
      ) {
        Alert.alert('Please fill in all required details.');
        return;
      }

      const userIdString = await AsyncStorage.getItem('user_id');
      const userId = userIdString ? parseInt(userIdString) : null;

      if (!userId) {
        Alert.alert('User ID not found');
        return;
      }

      const payload = {
        name: teamForm.name,
        location: teamForm.location,
        maxPlayers: teamForm.maxPlayers,
        createdByUserId: userId,
        playerIds: selectedPlayerIds,
      };

      const response = await footballService.createTeam(payload);

      if (response) {
        Alert.alert('Team created successfully!');
        router.navigate('./../optionsScreen');
      } else {
        Alert.alert('Failed to create team');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Something went wrong while creating the team');
    }
  };

  const renderPlayer = ({ item }: { item: Player }) => {
    const selected = selectedPlayerIds.includes(item.id);

    return (
      <Pressable
        onPress={() => toggleSelect(item.id)}
        className={`mx-3 mb-4 p-4 rounded-xl border ${
          selected ? 'bg-green-100 border-green-500' : 'bg-white border-gray-300'
        } shadow-sm`}
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-semibold text-gray-800">{item.nickname}</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Role: <Text className="font-medium text-gray-700">{item.role}</Text>
            </Text>
            <Text className="text-sm text-gray-500">
              Experience: <Text className="font-medium text-gray-700">{item.experience}</Text>
            </Text>
          </View>
          {selected && (
            <Ionicons name="checkmark-circle" size={28} color="#22c55e" />
          )}
        </View>
      </Pressable>
    );
  };

  if (!teamForm?.maxPlayers) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Loading team information...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-5 pt-6 pb-3">
        <Text className="text-xl font-bold text-gray-800">
          Selected Players: 
          <Text className="text-green-600"> {selectedPlayerIds.length}</Text>
          <Text className="text-gray-600"> /{teamForm.maxPlayers}</Text>
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          Tap a card to select or unselect a player.
        </Text>
      </View>

      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlayer}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View className="absolute bottom-6 left-0 right-0 px-5">
        <TouchableOpacity
          onPress={handleCreateTeam}
          className="bg-green-600 py-4 rounded-xl shadow-lg"
        >
          <Text className="text-center text-white font-bold text-lg">Create Team</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
