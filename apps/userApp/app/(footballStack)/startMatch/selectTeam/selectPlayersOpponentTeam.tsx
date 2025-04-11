import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  opponentTeamDataAtom,
  footballMatchAtom,
} from '@/atoms/atoms';
import type { footballPlayer } from '@/atoms/atoms';
import { useState, useEffect } from 'react';

export default function SelectOpponentTeamPlayersScreen() {
  const [opponentTeamData, setOpponentTeamData] = useRecoilState(opponentTeamDataAtom);
  const { playersPerTeam } = useRecoilValue(footballMatchAtom);

  const [selectedPlayers, setSelectedPlayers] = useState<footballPlayer[]>([]);

  useEffect(() => {
    // Avoid setting pre-selected players to prevent initial flicker
    setSelectedPlayers([]);
  }, []);

  const toggleSelect = (player: footballPlayer) => {
    const alreadySelected = selectedPlayers.some(p => p.id === player.id);

    if (alreadySelected) {
      setSelectedPlayers(prev => prev.filter(p => p.id !== player.id));
    } else if (selectedPlayers.length < playersPerTeam) {
      setSelectedPlayers(prev => [...prev, player]);
    }
  };

  const handleContinue = () => {
    setOpponentTeamData(prev => ({
      ...prev,
      players: selectedPlayers,
    }));
    router.navigate('./../setTeams');
  };

  return (
    <View className="flex-1 bg-white px-4 pt-6">
      <Text className="text-2xl font-bold text-center text-gray-900 mb-1">
        Select Players
      </Text>
      <Text className="text-base text-center text-gray-600 mb-4">
        {`Selected ${selectedPlayers.length}/${playersPerTeam} players for Opponent Team`}
      </Text>

      <FlatList
        data={opponentTeamData.players}
        keyExtractor={item => item.id.toString()}
        extraData={selectedPlayers}
        keyboardShouldPersistTaps="handled"
        renderItem={({ item }) => {
          const isSelected = selectedPlayers.some(p => p.id === item.id);
          return (
            <TouchableOpacity
              onPress={() => toggleSelect(item)}
              className={`p-4 mb-2 rounded-xl border ${
                isSelected
                  ? 'bg-blue-200 border-blue-400'
                  : 'bg-gray-100 border-gray-300'
              }`}
            >
              <Text className="text-lg font-medium text-gray-800">{item.nickname}</Text>
              <Text className="text-sm text-gray-500">{item.role}</Text>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />

      <View
        className="absolute bottom-6 left-4 right-4 z-10"
        style={{ elevation: 10 }}
      >
        <TouchableOpacity
          onPress={handleContinue}
          disabled={selectedPlayers.length !== playersPerTeam}
          className={`py-4 rounded-xl items-center shadow-lg ${
            selectedPlayers.length !== playersPerTeam
              ? 'bg-gray-300'
              : 'bg-blue-600'
          }`}
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
