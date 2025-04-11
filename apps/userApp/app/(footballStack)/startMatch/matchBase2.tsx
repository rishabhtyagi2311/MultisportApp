import {
  View,
  Text,
  TextInput,
  ScrollView,
  Switch,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  myTeamDataAtom,
  opponentTeamDataAtom,
  matchSetupDetailsAtom,
} from '@/atoms/atoms';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { router } from 'expo-router';

export default function MatchSetupScreen() {
  const myTeam = useRecoilValue(myTeamDataAtom);
  const opponentTeam = useRecoilValue(opponentTeamDataAtom);
  const [setup, setSetup] = useRecoilState(matchSetupDetailsAtom);
  const [newScorer, setNewScorer] = useState('');

  const [myCaptainDropdown, setMyCaptainDropdown] = useState(false);
  const [opponentCaptainDropdown, setOpponentCaptainDropdown] = useState(false);

  const updateSetup = (key: keyof typeof setup, value: any) => {
    setSetup((prev) => ({ ...prev, [key]: value }));
  };

  const addScorer = () => {
    if (newScorer.trim()) {
      updateSetup('scorers', [...setup.scorers, newScorer.trim()]);
      setNewScorer('');
    }
  };

  const handleContinue = () => {
    console.log(setup);
    router.push("./scoringMatch")
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Section: Captains */}
          <Text className="text-xl font-bold mb-4">Team Captains</Text>

          {/* My Team Captain Dropdown */}
          <View className="mb-6">
            <Text className="font-medium mb-2">My Team Captain</Text>
            <TouchableOpacity
              onPress={() => setMyCaptainDropdown((prev) => !prev)}
              className="bg-blue-100 p-3 rounded-lg flex-row justify-between items-center"
            >
              <Text className="text-blue-900 font-semibold">
                {setup.myTeamCaptain || 'Select My Team Captain'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#0c4a6e" />
            </TouchableOpacity>

            {myCaptainDropdown && (
              <Animated.View
                entering={FadeInDown}
                className="bg-blue-100 rounded-lg mt-2 border border-blue-200"
              >
                {myTeam.players.map((player, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      updateSetup('myTeamCaptain', player.nickname);
                      setMyCaptainDropdown(false);
                    }}
                    className="p-3 border-b border-blue-200"
                  >
                    <Text className="text-blue-900">{player.nickname}</Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            )}
          </View>

          {/* Opponent Team Captain Dropdown */}
          <View className="mb-6">
            <Text className="font-medium mb-2">Opponent Team Captain</Text>
            <TouchableOpacity
              onPress={() => setOpponentCaptainDropdown((prev) => !prev)}
              className="bg-red-100 p-3 rounded-lg flex-row justify-between items-center"
            >
              <Text className="text-red-900 font-semibold">
                {setup.opponentTeamCaptain || 'Select Opponent Captain'}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#7f1d1d" />
            </TouchableOpacity>

            {opponentCaptainDropdown && (
              <Animated.View
                entering={FadeInDown}
                className="bg-red-100 rounded-lg mt-2 border border-red-200"
              >
                {opponentTeam.players.map((player, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      updateSetup('opponentTeamCaptain', player.nickname);
                      setOpponentCaptainDropdown(false);
                    }}
                    className="p-3 border-b border-red-200"
                  >
                    <Text className="text-red-900">{player.nickname}</Text>
                  </TouchableOpacity>
                ))}
              </Animated.View>
            )}
          </View>

          {/* Substitutions */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2">Substitutions</Text>
            <TextInput
              className="border border-gray-300 rounded px-3 py-2"
              keyboardType="number-pad"
              value={setup.substitutionsAllowed.toString()}
              onChangeText={(val) =>
                updateSetup('substitutionsAllowed', parseInt(val) || 0)
              }
              placeholder="Enter number of substitutions"
            />
          </View>

          {/* Extra Time Toggle */}
          <View className="mb-6 flex-row items-center justify-between">
            <Text className="text-lg font-semibold">Allow Extra Time?</Text>
            <Switch
              value={setup.extraTimeAllowed}
              onValueChange={(val) => updateSetup('extraTimeAllowed', val)}
            />
          </View>

          {/* Goal Scorers */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-2">Goal Scorers</Text>
            <View className="flex-row gap-2">
              <TextInput
                className="flex-1 border border-gray-300 rounded px-3 py-2"
                value={newScorer}
                onChangeText={setNewScorer}
                placeholder="Enter scorer name"
              />
              <TouchableOpacity
                onPress={addScorer}
                className="bg-blue-500 px-4 rounded justify-center"
              >
                <Text className="text-white font-medium">Add</Text>
              </TouchableOpacity>
            </View>

            {setup.scorers.length > 0 && (
              <View className="mt-3">
                {setup.scorers.map((name, index) => (
                  <Text key={index} className="text-gray-700">
                    {index + 1}. {name}
                  </Text>
                ))}
              </View>
            )}
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            onPress={handleContinue}
            className="mt-6 mb-10 bg-green-600 py-4 rounded-xl"
          >
            <Text className="text-white text-center text-lg font-bold">
              Continue
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
