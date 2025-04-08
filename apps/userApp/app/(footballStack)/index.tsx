import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { footballService } from "@/services/football";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Router } from "expo-router";

const roles = [
  "Striker",
  "Left Winger (LW)",
  "Right Winger (RW)",
  "Center Attacking Midfielder (CAM)",
  "Center Midfielder (CM)",
  "Center Defensive Midfielder (CDM)",
  "Left Back (LB)",
  "Right Back (RB)",
  "Center Back (CB)",
  "Goalkeeper (GK)",
];

const experience = [
  "Less than 6 months",
  "6 months to 1 year",
  "1 to 2 years",
  "2 to 5 years",
  "More than 5 years",
];

export default function FootballProfileForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: "",
      role: "",
      experience: "",
    },
  });

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);
 

  const onSubmit = async (data: any) => {

    const userId = await AsyncStorage.getItem("user_id")
   
    if(userId)
    {
      const id = parseInt(userId)
      const response = await footballService.profileRegister({
        userId : id,
        role: data.role,
        nickname: data.nickname,
        experience : data.experience
  
      })

      if(response !== null)
      {
          router.navigate("/(footballStack)/optionsScreen")
      }
    }
    
   
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        

        {/* Nickname Field */}
        <Animated.View entering={FadeInDown.delay(300)} className="mb-6 mt-14">
          <Text className="text-gray-900 font-semibold mb-2">What other Player should Call you</Text>
          <Controller
            name="nickname"
            control={control}
            rules={{ required: "Nickname is required" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="bg-white border border-gray-300 rounded-xl h-14 px-4 text-gray-900 shadow-sm"
                placeholder="e.g. BeastMode or The Wall"
                placeholderTextColor="#9CA3AF"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.nickname && (
            <Text className="text-red-500 mt-1 text-sm">
              {errors.nickname.message}
            </Text>
          )}
        </Animated.View>

        {/* Role Dropdown */}
        <Animated.View entering={FadeInDown.delay(400)} className="mb-6">
          <Text className="text-gray-900 font-semibold mb-2">Preferred Role</Text>
          <Controller
            control={control}
            name="role"
            rules={{ required: "Role is required" }}
            render={({ field: { value, onChange } }) => (
              <View>
                <TouchableOpacity
                  onPress={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="bg-white rounded-xl border border-gray-300 h-14 px-4 flex-row items-center justify-between shadow-sm"
                >
                  <Text className={`text-base ${value ? "text-gray-900" : "text-gray-400"}`}>
                    {value || "Select your role"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#64748B" />
                </TouchableOpacity>

                {showRoleDropdown && (
                  <View className="bg-white mt-2 rounded-xl shadow-md border border-gray-300 max-h-60">
                    <ScrollView>
                      {roles.map((role) => (
                        <TouchableOpacity
                          key={role}
                          onPress={() => {
                            onChange(role);
                            setShowRoleDropdown(false);
                          }}
                          className="px-4 py-3 border-b border-gray-200"
                        >
                          <Text className="text-gray-800">{role}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            )}
          />
          {errors.role && (
            <Text className="text-red-500 mt-1 text-sm">{errors.role.message}</Text>
          )}
        </Animated.View>

        {/* Experience Dropdown */}
        <Animated.View entering={FadeInDown.delay(500)} className="mb-6">
          <Text className="text-gray-900 font-semibold mb-2">
            How long have you played?
          </Text>
          <Controller
            control={control}
            name="experience"
            rules={{ required: "Experience is required" }}
            render={({ field: { value, onChange } }) => (
              <View>
                <TouchableOpacity
                  onPress={() => setShowExperienceDropdown(!showExperienceDropdown)}
                  className="bg-white rounded-xl border border-gray-300 h-14 px-4 flex-row items-center justify-between shadow-sm"
                >
                  <Text className={`text-base ${value ? "text-gray-900" : "text-gray-400"}`}>
                    {value || "Select experience"}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#64748B" />
                </TouchableOpacity>

                {showExperienceDropdown && (
                  <View className="bg-white mt-2 rounded-xl shadow-md border border-gray-300 max-h-60">
                    <ScrollView>
                      {experience.map((exp) => (
                        <TouchableOpacity
                          key={exp}
                          onPress={() => {
                            onChange(exp);
                            setShowExperienceDropdown(false);
                          }}
                          className="px-4 py-3 border-b border-gray-200"
                        >
                          <Text className="text-gray-800">{exp}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            )}
          />
          {errors.experience && (
            <Text className="text-red-500 mt-1 text-sm">{errors.experience.message}</Text>
          )}
        </Animated.View>

        {/* Submit Button */}
        <View className="mt-10">
          <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={0.95}>
            <LinearGradient
              colors={["#1e3a8a", "#2563eb"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="rounded-2xl"
              style={{
                paddingVertical: 16,
                paddingHorizontal: 24,
                borderRadius: 18,
                shadowColor: "#0f172a",
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 12,
              }}
            >
              <View className="flex-row justify-center items-center space-x-3">
               
                <Text className="text-white text-lg font-bold uppercase tracking-wider mr-12">
                  Boots On! Let's GO
                </Text>
                <Ionicons name="football" size={22} color="white" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
