import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { useRecoilState } from 'recoil';
import { myTeamDataAtom, opponentTeamDataAtom } from '@/atoms/atoms';
import { useRouter } from 'expo-router';

type EventType =
  | 'Goal'
  | 'Assist'
  | 'Card'
  | 'Foul'
  | 'Substitution'
  | 'Penalty'
  | 'Offside';

type MatchEvent = {
  type: EventType;
  subType: string;
  player: string;
  time: string;
};

export default function MatchScoringScreen() {
  const [myTeam] = useRecoilState(myTeamDataAtom);
  const [opponentTeam] = useRecoilState(opponentTeamDataAtom);
  const [events, setEvents] = useState<MatchEvent[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [selectedSubType, setSelectedSubType] = useState<string | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [eventTime, setEventTime] = useState<string>('');
  const [showEventSelector, setShowEventSelector] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const router = useRouter();

  const eventTypes: EventType[] = [
    'Goal',
    'Assist',
    'Card',
    'Foul',
    'Substitution',
    'Penalty',
    'Offside',
  ];

  const eventSubTypes: Record<EventType, string[]> = {
    Goal: ['Header', 'Body', 'Volley', 'Tap-in', 'Long Shot', 'Penalty'],
    Assist: ['Through Ball', 'Cross', 'Backheel', 'Chip', 'Short Pass'],
    Card: ['Yellow', 'Red'],
    Foul: ['Push', 'Trip', 'Slide', 'Late Tackle'],
    Substitution: ['In', 'Out'],
    Penalty: ['Scored', 'Missed'],
    Offside: ['Clear', 'By Mistake'],
  };

  const handleAddEvent = () => {
    if (!selectedEvent || !selectedSubType || !selectedPlayer || !eventTime) {
      Alert.alert('Error', 'Please fill all event details.');
      return;
    }

    const newEvent: MatchEvent = {
      type: selectedEvent,
      subType: selectedSubType,
      player: selectedPlayer,
      time: eventTime,
    };

    setEvents((prev) => [newEvent, ...prev]);

    // Reset state
    setSelectedEvent(null);
    setSelectedSubType(null);
    setSelectedPlayer(null);
    setEventTime('');
    setShowEventSelector(false);
    setShowDetails(false);
  };

  const handleFinishMatch = () => {
    Alert.alert('Match Finished', 'Match data saved.');
    router.replace('./../optionsScreen');
  };

  const myGoals = events.filter((e) => e.type === 'Goal' && myTeam.players.some(p => p.nickname === e.player)).length;
  const opponentGoals = events.filter((e) => e.type === 'Goal' && !myTeam.players.some(p => p.nickname === e.player)).length;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* Score Header */}
        <View className="h-40 bg-gray-200 w-full justify-center items-center">
          <Text className="text-xl font-bold text-blue-800">{myTeam.teamName}</Text>
          <Text className="text-2xl font-extrabold text-red-600">VS</Text>
          <Text className="text-xl font-bold text-green-800">{opponentTeam.teamName}</Text>
          <Text className="mt-2 text-3xl font-bold text-black">{myGoals} - {opponentGoals}</Text>
        </View>

        {/* Add Event Button */}
        <TouchableOpacity
          onPress={() => setShowEventSelector((prev) => !prev)}
          className="mx-6 my-4 bg-blue-600 py-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold text-lg">Add Event</Text>
        </TouchableOpacity>

        {/* Event Type Selection */}
        {showEventSelector && (
          <View className="mx-6 mb-4">
            <Text className="font-semibold mb-2 text-center">Select Event Type:</Text>
            <View className="flex-wrap flex-row gap-3 justify-center">
              {eventTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => {
                    setSelectedEvent(type);
                    setShowDetails(true);
                  }}
                  className="bg-blue-200 px-4 py-2 rounded-xl"
                >
                  <Text className="text-blue-800 font-medium">{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Subtype + Player + Time */}
        {showDetails && selectedEvent && (
          <View className="mx-6 mb-6">
            {/* Sub Types */}
            <Text className="font-semibold mb-2">Select Sub Type:</Text>
            <View className="flex-wrap flex-row gap-3 mb-4">
              {eventSubTypes[selectedEvent]?.map((subType) => (
                <TouchableOpacity
                  key={subType}
                  onPress={() => setSelectedSubType(subType)}
                  className={`px-4 py-2 rounded-xl ${
                    selectedSubType === subType ? 'bg-yellow-400' : 'bg-yellow-200'
                  }`}
                >
                  <Text>{subType}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Players */}
            <Text className="font-semibold mb-2">Select Player:</Text>
            <View className="flex-wrap flex-row gap-3 mb-4">
              {myTeam.players.map((player, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedPlayer(player.nickname)}
                  className={`px-4 py-2 rounded-xl ${
                    selectedPlayer === player.nickname ? 'bg-green-400' : 'bg-green-200'
                  }`}
                >
                  <Text>{player.nickname}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Time Input */}
            <Text className="font-semibold mb-2">Time (e.g., 23 or 45+2):</Text>
            <TextInput
              value={eventTime}
              onChangeText={setEventTime}
              placeholder="Enter time"
              className="bg-gray-100 px-4 py-2 rounded-md border"
              keyboardType="default"
            />

            {/* Add Event Button */}
            <TouchableOpacity
              onPress={handleAddEvent}
              className="mt-4 bg-blue-600 py-3 rounded-lg"
            >
              <Text className="text-white text-center font-bold">Add Event</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Events Table */}
        <View className="px-4 mb-6">
          <ScrollView horizontal>
            <View>
              <View className="flex-row bg-gray-200 p-2 rounded">
                <Text className="w-24 font-bold">Event</Text>
                <Text className="w-28 font-bold">Sub Type</Text>
                <Text className="w-28 font-bold">Player</Text>
                <Text className="w-20 font-bold">Time</Text>
              </View>
              {events.map((event, index) => (
                <View key={index} className="flex-row p-2 border-b">
                  <Text className="w-24">{event.type}</Text>
                  <Text className="w-28">{event.subType}</Text>
                  <Text className="w-28">{event.player}</Text>
                  <Text className="w-20">{event.time}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Finish Match Button */}
        <TouchableOpacity
          onPress={handleFinishMatch}
          className="mx-6 mb-8 bg-red-500 py-3 rounded-lg"
        >
          <Text className="text-white text-center font-bold text-lg">Finish Match</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
