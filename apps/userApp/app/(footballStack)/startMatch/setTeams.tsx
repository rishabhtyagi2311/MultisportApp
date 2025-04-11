import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { myTeamDataAtom, opponentTeamDataAtom } from '@/atoms/atoms';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TeamSelectionScreen = () => {
  const [myTeamData] = useRecoilState(myTeamDataAtom);
  const [opponentTeamData] = useRecoilState(opponentTeamDataAtom);

  const [myTeamSelected] = useState(!!myTeamData.teamId);
  const [opponentTeamSelected] = useState(!!opponentTeamData.teamId);

  const router = useRouter();

  const handleSelectTeam = (teamType: 'myTeam' | 'opponentTeam') => {
    router.push(`./selectTeam/${teamType}`);
  };

  const handleContinue = () => {
    router.push('./matchBase2');
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-10">
      {/* Upper half: My Team */}
      <View className="mb-10">
        <Text className="text-xl font-bold mb-4 text-center text-blue-800">Add Your Team</Text>

        <TouchableOpacity
          onPress={() => handleSelectTeam('myTeam')}
          className={`border-2 border-dashed rounded-xl py-6 items-center justify-center ${
            myTeamSelected ? 'border-green-500 bg-green-50' : 'border-blue-300'
          }`}
          disabled={myTeamSelected}
        >
          <Ionicons name="cloud-upload-outline" size={32} color={myTeamSelected ? "#22c55e" : "#3b82f6"} />
          <Text className="mt-2 text-base text-gray-700 font-medium">
            {myTeamSelected ? 'Team Added' : 'Tap to Select My Team'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View className="border-b border-gray-300 mb-10" />

      {/* Bottom half: Opponent Team */}
      <View className="mb-10">
        <Text className="text-xl font-bold mb-4 text-center text-red-800">Add Opponent Team</Text>

        <TouchableOpacity
          onPress={() => handleSelectTeam('opponentTeam')}
          className={`border-2 border-dashed rounded-xl py-6 items-center justify-center ${
            opponentTeamSelected ? 'border-green-500 bg-green-50' : 'border-red-300'
          }`}
          disabled={opponentTeamSelected}
        >
          <Ionicons name="cloud-upload-outline" size={32} color={opponentTeamSelected ? "#22c55e" : "#ef4444"} />
          <Text className="mt-2 text-base text-gray-700 font-medium">
            {opponentTeamSelected ? 'Team Added' : 'Tap to Select Opponent Team'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        disabled={!myTeamSelected || !opponentTeamSelected}
        onPress={handleContinue}
        className={`w-full py-4 rounded-xl ${
          myTeamSelected && opponentTeamSelected ? 'bg-blue-600' : 'bg-gray-400'
        }`}
      >
        <Text className="text-center text-white font-semibold text-lg">
          Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default TeamSelectionScreen;
