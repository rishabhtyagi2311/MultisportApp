import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useRecoilState } from 'recoil';
import { allTeamsDataAtom, myTeamDataAtom } from '@/atoms/atoms';
import { footballService } from '@/services/football';
import { useRouter } from 'expo-router';

export default function SelectTeam() {
  const [teams, setTeams] = useRecoilState(allTeamsDataAtom);
  const [teamData, setTeamData] = useRecoilState(myTeamDataAtom);
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
          console.log(fetchedTeams);
          setTeams(fetchedTeams);
        } catch (err) {
          console.error('Failed to fetch teams:', err);
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
      players: team.players
    });
  };

  const handleContinue = () => {

    if (selectedTeamId !== null) {
      router.push(`./selectPlayerMyTeam`);

    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4 text-base text-gray-700">Loading teams...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-6 text-center">Select Your Team</Text>

      {teams.map((team) => {
        const isSelected = selectedTeamId === team.id;
        return (
          <TouchableOpacity
            key={team.id}
            onPress={() => handleSelectTeam(team)}
            className={`p-4 rounded-xl mb-4 border ${
              isSelected
                ? 'border-blue-600 bg-blue-100'
                : 'border-gray-300 bg-gray-100'
            }`}
          >
            <Text className={`text-lg font-semibold ${isSelected ? 'text-blue-900' : 'text-blue-800'}`}>
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
          selectedTeamId === null ? 'bg-gray-300' : 'bg-blue-600'
        }`}
      >
        <Text className="text-white font-bold text-lg mb-10">
          {selectedTeamId === null ? 'Select a Team' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
