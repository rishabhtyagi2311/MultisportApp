import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import { allTeamsDataAtom, opponentTeamDataAtom } from '@/atoms/atoms';
import { footballService } from '@/services/football';
import { useRouter } from 'expo-router';

export default function SelectOpponentTeam() {
  const [teams, setTeams] = useRecoilState(allTeamsDataAtom);
  const [teamData, setTeamData] = useRecoilState(opponentTeamDataAtom);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && teams.length === 0) {
      hasFetched.current = true;
      const fetchTeams = async () => {
        setLoading(true);
        try {
          const fetchedTeams = await footballService.fetchAllTeamsWithPlayers();
          setTeams(fetchedTeams);
        } catch (err) {
          console.error('Failed to fetch opponent teams:', err);
        }
        setLoading(false);
      };
      fetchTeams();
    }
  }, [teams.length, setTeams]);

  const handleSelectTeam = (team: any) => {
    setSelectedTeamId(team.id);
    setTeamData({
      teamId: team.id,
      teamName: team.teamName,
      maxPlayers: team.maxPlayers,
      players: team.players,
    });
  };

  const handleContinue = () => {
  
    if (selectedTeamId !== null) {
      router.push(`./selectPlayersOpponentTeam`);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#dc2626" />
        <Text className="mt-4 text-base text-gray-700">Loading opponent teams...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-6 text-center text-red-600">Select Opponent Team</Text>

      {teams.map((team) => {
        const isSelected = selectedTeamId === team.id;
        return (
          <TouchableOpacity
            key={team.id}
            onPress={() => handleSelectTeam(team)}
            className={`p-4 rounded-xl mb-4 border ${
              isSelected
                ? 'border-red-600 bg-red-100'
                : 'border-gray-300 bg-gray-100'
            }`}
          >
            <Text className={`text-lg font-semibold ${isSelected ? 'text-red-900' : 'text-red-800'}`}>
              {team.teamName}
            </Text>
            <Text className="text-sm text-gray-600">Max Players: {team.maxPlayers}</Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        onPress={handleContinue}
        disabled={selectedTeamId === null}
        className={`mt-6 py-4 rounded-2xl items-center shadow-lg ${
          selectedTeamId === null ? 'bg-gray-300' : 'bg-red-600'
        }`}
      >
        <Text className="text-white font-bold text-lg mb-10">
          {selectedTeamId === null ? 'Select a Team' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
