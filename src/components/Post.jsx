import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import IconLocation from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export function Post({ post }) {
  const navigation = useNavigation();
  const { geoLocation, location, name, uri } = post;

  const handleCommentsPress = () => {
    navigation.navigate("Comments", { uri });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri }} />
      <Text style={{ ...styles.text, marginBottom: 11 }}>{name}</Text>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={handleCommentsPress}
        >
          <FontAwesome name="comment-o" size={24} color="#BDBDBD" />
          <Text style={{ ...styles.text, color: "#BDBDBD", marginLeft: 8 }}>
            Num
          </Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <IconLocation
            name="location-outline"
            size={24}
            color="#BDBDBD"
            onPress={() =>
              navigation.navigate("Map", { geoLocation, location, name })
            }
          />
          <Text style={{ ...styles.text, marginLeft: 8 }}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#bdbdbd",
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 32,
  },
  text: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});