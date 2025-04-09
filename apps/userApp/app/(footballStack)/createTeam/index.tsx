import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ChevronDown } from 'lucide-react-native';
import { useSetRecoilState } from 'recoil';
import { footballteamAtom } from '@/atoms/atoms'; 

const cityOptions = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune",
  "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Indore", "Bhopal", "Nagpur",
  "Visakhapatnam", "Patna", "Vadodara", "Ludhiana", "Agra", "Nashik", "Faridabad",
  "Meerut", "Rajkot", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar",
  "Ranchi", "Other"
];

export default function CreateTeam() {
  const router = useRouter();
  const setTeamForm = useSetRecoilState(footballteamAtom);

  const [form, setForm] = useState({
    teamName: '',
    location: '',
    customCity: '',
    maxPlayers: '',
  });

  const [searchCity, setSearchCity] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCities = cityOptions.filter(city =>
    city.toLowerCase().includes(searchCity.toLowerCase())
  );

  const handleSubmit = () => {
    const finalCity = form.location === 'Other' ? form.customCity : form.location;

    if (!form.teamName || !finalCity || !form.maxPlayers) {
      alert('Please fill all required fields');
      return;
    }

    // ✅ Update Recoil Atom
    setTeamForm(prev => ({
      ...prev,
      name: form.teamName,
      location: finalCity,
      customCity: form.location === 'Other' ? form.customCity : '',
      maxPlayers: Number(form.maxPlayers),
    }));

    router.push('./createTeam/addMembers');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1 bg-gray-900 px-6 pt-12">
          <Text className="text-white text-2xl font-bold mb-6">Create Team</Text>

          {/* Team Name */}
          <Text className="text-white mb-2">Team Name</Text>
          <TextInput
            className="bg-gray-800 text-white p-3 rounded-lg mb-5"
            placeholder="Enter team name"
            placeholderTextColor="#94a3b8"
            value={form.teamName}
            onChangeText={(text) => setForm({ ...form, teamName: text })}
          />

          {/* Max Players */}
          <Text className="text-white mb-2">Max Players</Text>
          <TextInput
            className="bg-gray-800 text-white p-3 rounded-lg mb-5"
            placeholder="e.g. 11"
            placeholderTextColor="#94a3b8"
            value={form.maxPlayers}
            onChangeText={(text) => setForm({ ...form, maxPlayers: text })}
            keyboardType="number-pad"
          />

          {/* City Selection */}
          <Text className="text-white mb-2">City</Text>
          <View className="relative">
            <TextInput
              className="bg-gray-800 text-white p-3 rounded-lg pr-10"
              placeholder="Search or select a city"
              placeholderTextColor="#94a3b8"
              value={searchCity}
              onFocus={() => setShowDropdown(true)}
              onChangeText={(text) => {
                setSearchCity(text);
                setForm({ ...form, location: '', customCity: '' });
                setShowDropdown(true);
              }}
            />
            <ChevronDown
              size={18}
              color="#94a3b8"
              style={{ position: 'absolute', right: 12, top: 18 }}
            />
          </View>

          {/* City Dropdown */}
          {showDropdown && (
            <Animated.View entering={FadeInDown} className="bg-gray-800 rounded-lg mt-2 max-h-60 border border-gray-700">
              <ScrollView>
                {filteredCities.map((city) => (
                  <TouchableOpacity
                    key={city}
                    onPress={() => {
                      setForm({ ...form, location: city, customCity: '' });
                      setSearchCity(city === 'Other' ? '' : city);
                      setShowDropdown(false);
                    }}
                    className="p-3 border-b border-gray-700"
                  >
                    <Text className="text-white">{city}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          )}

          {/* Custom City Input */}
          {form.location === 'Other' && (
            <>
              <Text className="text-white mt-4 mb-2">Enter Your City</Text>
              <TextInput
                className="bg-gray-800 text-white p-3 rounded-lg mb-5"
                placeholder="Your city"
                placeholderTextColor="#94a3b8"
                value={form.customCity}
                onChangeText={(text) => setForm({ ...form, customCity: text })}
              />
            </>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-600 mt-6 p-4 rounded-xl items-center"
          >
            <Text className="text-white text-lg font-semibold">Create Team</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
