import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, Pressable, Alert } from 'react-native';
import { useRecoilValue } from 'recoil';
import { footballteamAtom } from '@/atoms/atoms';
import { footballService } from '@/services/football';
import { Ionicons } from '@expo/vector-icons';

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

  const renderPlayer = ({ item }: { item: Player }) => {
    const selected = selectedPlayerIds.includes(item.id);

    return (
      <Pressable
        onPress={() => toggleSelect(item.id)}
        style={{
          margin: 10,
          padding: 15,
          borderRadius: 10,
          backgroundColor: selected ? '#4ade80' : '#f3f4f6',
          borderWidth: 1,
          borderColor: selected ? '#16a34a' : '#d1d5db',
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.nickname}</Text>
        <Text>Role: {item.role}</Text>
        <Text>Experience: {item.experience}</Text>
        {selected && (
          <Ionicons name="checkmark-circle" size={20} color="#16a34a" style={{ marginTop: 5 }} />
        )}
      </Pressable>
    );
  };

  if (!teamForm || !teamForm.maxPlayers) {
    return (
      <SafeAreaView>
        <Text>Loading team information...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Select Players ({selectedPlayerIds.length}/{teamForm.maxPlayers})
      </Text>

      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPlayer}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
}
