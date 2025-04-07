import React, { useState } from "react";
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
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ChevronDown, User, Mail, MapPin } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { onBoardingService } from "@/services/onBoarding";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  city: string;
  customCity?: string;
  username: string;
  email: string;
};

const indianCities = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune",
  "Ahmedabad", "Jaipur", "Lucknow", "Surat", "Indore", "Bhopal", "Nagpur",
  "Visakhapatnam", "Patna", "Vadodara", "Ludhiana", "Agra", "Nashik", "Faridabad",
  "Meerut", "Rajkot", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar",
  "Allahabad", "Ranchi", "Gwalior", "Jodhpur", "Raipur", "Kota", "Guwahati",
  "Chandigarh", "Thiruvananthapuram", "Mysore", "Salem", "Jalandhar", "Tiruchirappalli",
  "Dehradun", "Other"
];

const ageOptions = Array.from({ length: 69 }, (_, i) => (12 + i).toString());


export default function InfoRegisterScreen() {
  const [showCityOptions, setShowCityOptions] = useState(false);
  const [showAgeOptions, setShowAgeOptions] = useState(false);
  const router = useRouter()
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      city: "",
      customCity: "",
      username: "",
      email: "",
    },
  });

  const watchedCity = watch("city");
  const watchedAge = watch("age");

  const onSubmit = async (data: FormData) => {
    console.log("Form Submitted:", data);

    if (data.customCity) {
      data.city = data.customCity;
    }

    const response   = await onBoardingService.basicInfoRegister({
      firstname: data.firstName,
      lastname: data.lastName,
      username: data.username,
      age: data.age,
      email: data.email,
      city: data.city,
    });

    console.log(response);
    if(response) 
      {
        await AsyncStorage.setItem("user_id", (response.data.id).toString() )
      }
    router.replace('../(homeScreenTabs)')
  
  };

  const renderInput = (
    name: keyof FormData,
    label: string,
    icon: React.ReactNode,
    rules: object = {},
    props: object = {}
  ) => (
    <Animated.View entering={FadeInDown.delay(200)} className="mb-5">
      <Text className="text-gray-900 font-bold mb-2">{label}</Text>
      <View className="flex-row items-center bg-white rounded-xl border border-gray-300 h-14 px-4 shadow-sm">
        <View className="mr-3">{icon}</View>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="flex-1 text-gray-900 text-base"
              placeholder={`Enter ${label}`}
              placeholderTextColor="#94A3B8"
              onChangeText={onChange}
              value={value}
              {...props}
            />
          )}
        />
      </View>
      {errors[name] && (
        <Animated.Text entering={FadeInDown} className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </Animated.Text>
      )}
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-gray-200"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="px-6 pt-8 mt-16">

            {/* First Name */}
            {renderInput("firstName", "First Name", <User size={20} color="#64748B" />, {
              required: "First name is required",
            })}

            {/* Last Name */}
            {renderInput("lastName", "Last Name", <User size={20} color="#64748B" />, {
              required: "Last name is required",
            })}

            {/* Age Dropdown */}
            <Animated.View entering={FadeInDown.delay(400)} className="mb-5">
              <Text className="text-gray-900 font-bold mb-2">Age</Text>
              <TouchableOpacity
                className="flex-row items-center bg-white rounded-xl border border-gray-300 h-14 px-4 shadow-sm justify-between"
                onPress={() => setShowAgeOptions(!showAgeOptions)}
              >
                <Text className={`text-base ${watchedAge ? "text-gray-900" : "text-gray-400"}`}>
                  {watchedAge || "Select your age"}
                </Text>
                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>

              {/* Age Options */}
              {showAgeOptions && (
                <Animated.View
                  entering={FadeInDown}
                  className="bg-white rounded-xl border border-gray-300 mt-2 shadow-md max-h-60"
                >
                  <ScrollView className="max-h-60">
                    {ageOptions.map((age) => (
                      <TouchableOpacity
                        key={age}
                        onPress={() => {
                          setValue("age", age);
                          setShowAgeOptions(false);
                        }}
                        className="px-4 py-3 border-b border-gray-200"
                      >
                        <Text className="text-gray-800">{age}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Animated.View>
              )}
            </Animated.View>

            {/* City Dropdown */}
            <Animated.View entering={FadeInDown.delay(400)} className="mb-5">
              <Text className="text-gray-900 font-bold mb-2">City</Text>
              <TouchableOpacity
                className="flex-row items-center bg-white rounded-xl border border-gray-300 h-14 px-4 shadow-sm justify-between"
                onPress={() => setShowCityOptions(!showCityOptions)}
              >
                <Text className={`text-base ${watchedCity ? "text-gray-900" : "text-gray-400"}`}>
                  {watchedCity || "Select your city"}
                </Text>
                <ChevronDown size={20} color="#64748B" />
              </TouchableOpacity>

              {/* City Options */}
              {showCityOptions && (
                <Animated.View
                  entering={FadeInDown}
                  className="bg-white rounded-xl border border-gray-300 mt-2 shadow-md max-h-60"
                >
                  <ScrollView className="max-h-60">
                    {indianCities.map((city) => (
                      <TouchableOpacity
                        key={city}
                        onPress={() => {
                          setValue("city", city);
                          setShowCityOptions(false);
                        }}
                        className="px-4 py-3 border-b border-gray-200"
                      >
                        <Text className="text-gray-800">{city}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </Animated.View>
              )}
            </Animated.View>

            {/* Custom City (if selected "Other") */}
            {watchedCity === "Other" &&
              renderInput("customCity", "Your City", <MapPin size={20} color="#64748B" />, {
                required: "Please enter your city",
              })}

            {/* Username */}
            {renderInput("username", "Username", <User size={20} color="#64748B" />, {
              required: "Username is required",
            })}

            {/* Email */}
            {renderInput("email", "Email", <Mail size={20} color="#64748B" />, {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email",
              },
            }, { keyboardType: "email-address" })}

            {/* Submit Button */}
            <TouchableOpacity
              className="bg-blue-600 h-14 rounded-xl flex items-center justify-center mt-4 shadow-lg"
              onPress={handleSubmit(onSubmit)}
            >
              <Text className="text-white text-lg font-semibold">Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
