import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import IconLike from "react-native-vector-icons/AntDesign"; //like2
import IconComment from "react-native-vector-icons/FontAwesome"; //comment
import IconLocation from "react-native-vector-icons/Ionicons";

export const Post = () => {
  return (
    <View style={{ width: "100%", marginBottom: 32 }}>
      <Image style={styles.image} />
      <Text style={{ ...styles.text, marginTop: 8 }}>Текст поста</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginRight: 25,
            }}
          >
            <IconComment
              name="comment"
              size={24}
              style={{ color: "#FF6C00" }}
            />
            <Text style={styles.text}>0</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconLike name="like2" size={24} style={{ color: "#FF6C00" }} />
            <Text style={styles.text}>0</Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconLocation
            name="location-outline"
            size={24}
            style={{
              color: "#BDBDBD",
              opacity: 0.5,
            }}
          />
          <Text style={{ ...styles.text, textDecorationLine: "underline" }}>
            location
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#BDBDBD",
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 32,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 19,
    textAlign: "left",
    color: "#212121",
    marginLeft: 8,
  },
});