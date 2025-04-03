import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import UserRegisterForm from "@/components/userResgister";



export default function InfoRegisterScreen() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <UserRegisterForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
