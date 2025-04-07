import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';

export default function TabLayout() {
  console.log("Rendering TabLayout");
  return (
    <>
      
      <Tabs initialRouteName='index'>
      <Tabs.Screen
          name="sports"
          options={{
            title: "Sports",
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
         <Tabs.Screen
          name="book"
          options={{
            title: "Book",
          }}
        />
       
      </Tabs>
    </>
  );
}
