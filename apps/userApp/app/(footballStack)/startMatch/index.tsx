import { View, Text, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { footballMatchAtom } from '@/atoms/atoms';
import { useRouter } from 'expo-router';

const BaseMatchInfo = () => {
  const [matchData, setMatchData] = useRecoilState(footballMatchAtom);
  const [location, setLocation] = useState(matchData.location);
  const [playersPerTeam, setPlayersPerTeam] = useState(matchData.playersPerTeam);
  const [numberOfReferees, setNumberOfReferees] = useState(matchData.numberOfReferees);
  const [referees, setReferees] = useState<string[]>(matchData.referees || ['']);

  const router = useRouter();

  // Update referees input when count changes
  useEffect(() => {
    const updated = [...referees];
    if (numberOfReferees > referees.length) {
      while (updated.length < numberOfReferees) updated.push('');
    } else {
      updated.length = numberOfReferees;
    }
    setReferees(updated);
  }, [numberOfReferees]);

  const handleContinue = () => {
    setMatchData({
      location,
      playersPerTeam,
      numberOfReferees,
      referees,
    });
    router.push('./startMatch/setTeams'); // Replace with actual navigation
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {/* Heading */}
      <Text className="text-2xl font-bold mb-6 text-center">Match Setup</Text>

      {/* Location Input */}
      <Text className="text-lg font-semibold mb-2">📍 Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Enter match location"
        className="border border-gray-300 rounded p-3 mb-4"
      />

      {/* Players Per Team */}
      <Text className="text-lg font-semibold mb-2">👥 Players per Team</Text>
      <ScrollView horizontal className="flex-row gap-4 mb-6">
        {Array.from({ length: 10 }, (_, i) => i + 2).map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => setPlayersPerTeam(num)}
            className={`px-6 py-3 rounded-full border ${playersPerTeam === num ? 'bg-blue-600 text-white' : 'bg-white border-blue-600'}`}
          >
            <Text className={`font-semibold ${playersPerTeam === num ? 'text-white' : 'text-blue-600'}`}>{num}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Referee Count */}
      <Text className="text-lg font-semibold mb-2">🧍 Referees</Text>
      <ScrollView horizontal className="flex-row gap-4 mb-6">
        {[1, 2, 3].map((num) => (
          <TouchableOpacity
            key={num}
            onPress={() => setNumberOfReferees(num)}
            className={`px-6 py-3 rounded-full border ${numberOfReferees === num ? 'bg-green-600 text-white' : 'bg-white border-green-600'}`}
          >
            <Text className={`font-semibold ${numberOfReferees === num ? 'text-white' : 'text-green-600'}`}>{num}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Referee Name Inputs */}
      {referees.map((ref, idx) => (
        <View key={idx} className="mb-4">
          <Text className="text-lg font-semibold">Referee {idx + 1} Name</Text>
          <TextInput
            placeholder={`Enter Referee ${idx + 1} Name`}
            value={ref}
            onChangeText={(text) => {
              const updated = [...referees];
              updated[idx] = text;
              setReferees(updated);
            }}
            className="border border-gray-300 rounded p-3 mt-2"
          />
        </View>
      ))}

      {/* Continue Button */}
      <View className="mt-6">
        <TouchableOpacity
            onPress={handleContinue}
            className="bg-green-500 py-3 px-6 rounded-lg shadow-md shadow-green-300 hover:bg-green-600 active:bg-green-700 transition-all duration-300"
        >
            <Text className="text-white text-lg font-semibold text-center">
            Continue
            </Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
  );
};

export default BaseMatchInfo;
