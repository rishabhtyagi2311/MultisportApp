import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import { footballService } from '@/services/football';
import {
  createdTeamsAtom,
  joinedTeamsAtom,
  footballTeamWithRelations,
} from '@/atoms/atoms';

export default function TeamsIndexScreen() {
  const [selectedTab, setSelectedTab] = useState<'created' | 'joined'>('created');
  const setCreatedTeams = useSetRecoilState(createdTeamsAtom);
  const setJoinedTeams = useSetRecoilState(joinedTeamsAtom);

  const createdTeamsLoadable = useRecoilValueLoadable(createdTeamsAtom);
  const joinedTeamsLoadable = useRecoilValueLoadable(joinedTeamsAtom);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchAndSetTeams = async () => {
      const id = await AsyncStorage.getItem('user_id');
      if (!id) return;

      const userId = parseInt(id);
      const allTeams: footballTeamWithRelations[] | null = await footballService.fetchMyTeams(userId);

      if (!allTeams) return;

      const created = allTeams.filter((team) => team.createdBy.id === userId);
      const joined = allTeams.filter((team) => team.createdBy.id !== userId);

      setCreatedTeams(created);
      setJoinedTeams(joined);
    };

    fetchAndSetTeams();
  }, []);

  const isLoading =
    createdTeamsLoadable.state === 'loading' || joinedTeamsLoadable.state === 'loading';

  const teams =
    selectedTab === 'created'
      ? createdTeamsLoadable.state === 'hasValue'
        ? createdTeamsLoadable.contents
        : []
      : joinedTeamsLoadable.state === 'hasValue'
        ? joinedTeamsLoadable.contents
        : [];

  return (
    <View style={{ flex: 1, paddingTop: insets.top }} className="bg-gray-50 px-4">
      {/* Toggle */}
      <View className="flex-row justify-center items-center bg-white rounded-full overflow-hidden my-4 self-center border border-gray-200">
        <TouchableOpacity
          onPress={() => setSelectedTab('created')}
          className={`px-6 py-2 ${selectedTab === 'created' ? 'bg-blue-600' : 'bg-white'}`}
        >
          <Text className={`${selectedTab === 'created' ? 'text-white' : 'text-blue-600'} font-medium`}>
            Created
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedTab('joined')}
          className={`px-6 py-2 ${selectedTab === 'joined' ? 'bg-blue-600' : 'bg-white'}`}
        >
          <Text className={`${selectedTab === 'joined' ? 'text-white' : 'text-blue-600'} font-medium`}>
            Joined
          </Text>
        </TouchableOpacity>
      </View>

      {/* Loader */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : teams?.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-base">
            {selectedTab === 'created' ? 'No created teams.' : 'No joined teams.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
          renderItem={({ item }) => (
            <View className="bg-white rounded-xl p-4 mb-4 shadow-md border border-gray-100">
              <Text className="text-lg font-semibold text-blue-800">{item.name}</Text>
              <Text className="text-sm text-gray-600 mt-1">📍 {item.location}</Text>
              <Text className="text-sm text-gray-600 mt-1">👤 Created by: {item.createdBy.nickname}</Text>
              <Text className="text-sm text-gray-600 mt-1">
                👥 {item.members.length}/{item.maxPlayers} players joined
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
