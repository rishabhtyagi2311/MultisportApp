// app/(footballStack)/_entry.tsx
import { useEffect } from 'react';
import { router } from 'expo-router';
import axios from 'axios';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { footballService } from '@/services/football';

export default function FootballEntryScreen() {
  useEffect(() => {
    const checkProfile = async () => {
      console.log("in profile check");
      
      try {

        const stringId = await AsyncStorage.getItem("user_id")
        console.log(stringId);
        
        if(stringId)
        {
          const id = parseInt(stringId)
          const res = await footballService.profileCheck(id)
        console.log(res);
        
          if (res.id) {
            console.log("true in check");
            
    
            router.replace("./optionsScreen")
          } else {
            console.log("false in check ");
            router.replace("./main")
            
          }
        }
      } 
      catch (err) {
        console.error("Error checking football profile", err);
      
      }
    };

    checkProfile();
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#2563eb" />
    </View>
  );
}
