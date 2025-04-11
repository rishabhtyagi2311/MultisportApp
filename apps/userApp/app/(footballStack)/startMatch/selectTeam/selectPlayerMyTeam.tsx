import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  myTeamDataAtom,
  footballMatchAtom,
} from '@/atoms/atoms';
import type { footballPlayer } from '@/atoms/atoms';
import { useState } from 'react';

export default function SelectMyTeamPlayersScreen() {
  const [myTeamData, setMyTeamData] = useRecoilState(myTeamDataAtom);
  const { playersPerTeam } = useRecoilValue(footballMatchAtom);
  const [selectedPlayers, setSelectedPlayers] = useState<footballPlayer[]>([]);

  const toggleSelect = (player: footballPlayer) => {
    const alreadySelected = selectedPlayers.some(p => p.id === player.id);

    if (alreadySelected) {
      setSelectedPlayers(prev => prev.filter(p => p.id !== player.id));
    } else if (selectedPlayers.length < playersPerTeam) {
      setSelectedPlayers(prev => [...prev, player]);
    } else {
      Alert.alert(
        'Limit Reached',
        `You can only select ${playersPerTeam} players.`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleContinue = () => {
    setMyTeamData(prev => ({
      ...prev,
      players: selectedPlayers,
    }));
    router.navigate('./../setTeams');
  };

  return (
    <View className="flex-1 bg-zinc-900 px-4 pt-6">
      <Text className="text-2xl font-bold text-white text-center mb-2">
        Select Players
      </Text>
      <Text className="text-lg text-center text-zinc-300 mb-4">
        {`Selected ${selectedPlayers.length}/${playersPerTeam} players for My Team`}
      </Text>
  
      <FlatList
        data={myTeamData.players}
        keyExtractor={item => item.id.toString()}
        extraData={selectedPlayers}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          const isSelected = selectedPlayers.some(p => p.id === item.id);
          return (
            <TouchableOpacity
              onPress={() => toggleSelect(item)}
              className={`p-4 mb-2 rounded-xl border ${
                isSelected ? 'bg-indigo-500 border-indigo-400' : 'bg-zinc-800 border-zinc-700'
              }`}
            >
              <Text className="text-lg font-semibold text-white">{item.nickname}</Text>
              <Text className="text-sm text-zinc-300">{item.role}</Text>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<View style={{ height: 100 }} />} // space for button
      />
  
      <View
        className="absolute bottom-6 left-4 right-4 z-10"
        style={{ elevation: 10 }} // for Android
      >
        <TouchableOpacity
          onPress={handleContinue}
          disabled={selectedPlayers.length !== playersPerTeam}
          className={`py-4 rounded-xl items-center shadow-lg ${
            selectedPlayers.length !== playersPerTeam
              ? 'bg-zinc-700'
              : 'bg-indigo-600'
          }`}
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
