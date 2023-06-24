import { View, StyleSheet, Text, Image, Pressable, Button } from "react-native";
import { Header } from "../components/Header";
import avatar from "../photo/avatar.jpg";
import { Post } from "../components/Post";
import { useRoute } from "@react-navigation/native";

export const PostsScreen = () => {

  const route = useRoute();
  const { post } = route.params;
console.log('post', post)
  return (
    <View style={styles.container}>
      <Header pageTitle="Публікації" style={styles.text} />
      <View style={{ marginTop: 32 }}>
        <View style={styles.userContainer}>
          <Image source={avatar} style={styles.image} />
          <View>
            <Text style={styles.userName}>Natali Romanova</Text>
            <Text>email@example.com</Text>
          </View>
        </View>
        {post && <Post post={post} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 720,
    paddingHorizontal: 20,
    paddingTop: 32,
    backgroundColor: "#fff",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 16,
  },
  userName: {
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 15.23,
  },
  userEmail: {
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 12.89,
    color: "#3C3C3C",
  },
});
