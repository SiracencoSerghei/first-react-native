import React from "react";
import { View, Text } from "react-native";

export const Comment = ({ text }) => {
  return (
    <View style={{ marginTop: 32 }}>
      <Text>{text}</Text>
    </View>
  );
};