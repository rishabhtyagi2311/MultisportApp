import React, { useState, useEffect } from "react";
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
import Animated, {
  FadeInDown, FlipInYRight, FlipOutYLeft,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";
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
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.5);
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

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 800, easing: Easing.out(Easing.exp) }),
        withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) })
      ),
      -1,
      true
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.8, { duration: 800 })
      ),
      -1,
      true
    );
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));



  const watchedCity = watch("city");
  const watchedAge = watch("age");

  const onSubmit = async (data: FormData) => {
    console.log("Form Submitted:", data);

    if (data.customCity) {
      data.city = data.customCity;
    }

    const response = await onBoardingService.basicInfoRegister({
      firstname: data.firstName,
      lastname: data.lastName,
      username: data.username,
      age: data.age,
      email: data.email,
      city: data.city,
    });

    console.log(response);
    if (response?.data.id) {
      await AsyncStorage.setItem("user_id", (response.data.id).toString())
      router.replace('../(homeScreenTabs)')
    }


  };

  const renderInput = (
    name: keyof FormData,
    label: string,
    icon: React.ReactNode,
    rules: object = {},
    props: object = {}
  ) => (
    <Animated.View entering={FadeInDown.delay(200)} className="m-2">

      <Text className="text-white ml-4 mb-2 font-bold text-xl">{label}</Text>
      <View className="flex-row items-center bg-black rounded-xl border border-gray-300 h-14 px-4 shadow-sm mb-6">
        <View className="mr-3">{icon}</View>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="flex-1 text-base text-white"
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
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-black"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          {/* Fixed background */}
          

          {/* Scrollable content */}
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View
              entering={FlipInYRight.duration(500)}
              exiting={FlipOutYLeft.duration(500)}
              className="w-11/12 bg-slate-500 rounded-2xl pt-4 pb-8 px-4 mb-36"
            >
              <View className="w-full items-center mt-6 px-4 mb-6">
                <Animated.Text
                  style={animatedStyle}
                  className="text-white text-4xl font-extrabold text-center mb-10 italic"
                >
                  Create Your Profile
                </Animated.Text>
              </View>

              {renderInput("firstName", "First Name", <User size={20} color="#64748B" />, {
                required: "First name is required",
              })}
              {renderInput("lastName", "Last Name", <User size={20} color="#64748B" />, {
                required: "Last name is required",
              })}
              {renderInput("email", "Email", <Mail size={20} color="#64748B" />, {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email",
                },
              }, { keyboardType: "email-address" })}

              {/* Add a Submit Button or more inputs here */}
            </Animated.View>
          </ScrollView>


        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}
