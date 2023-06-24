import {
    View,
    StyleSheet,
    Text,
    TextInput,
    ImageBackground,
    Pressable,
  } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
  import { Post } from "../components/Post";
  import photoBG from "../photo/photoBG.jpg";
  import avatar from "../photo/avatar.jpg";
  import { Feather } from '@expo/vector-icons';
  import IconLogOut from "react-native-vector-icons/MaterialIcons";
  
  export const ProfileScreen = () => {

  //   const route = useRoute();
  // const { post } = route.params;

    return (
      <ImageBackground source={photoBG} style={styles.imageBg}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <ImageBackground
              source={avatar}
              style={styles.image}
            ></ImageBackground>
            <View style={styles.iconContainer}>
            <Feather name="x-circle" size={25} color={"#BDBDBD"} />
              
            </View>
          </View>
          <IconLogOut name="logout" style={styles.iconLogOut} size={24} />
          <Text style={styles.text}>Natali Romanova</Text>
          {/* // posts.map() */}
          {/* {post && <Post post={post} />} */}
        </View>
      </ImageBackground>
    );
  };
  const styles = StyleSheet.create({
    imageBg: {
      flex: 1,
      justifyContent: "flex-end",
      width: null,
      height: null,
    },
    container: {
      display: "flex",
      backgroundColor: "#fff",
      width: "100%",
      height: 549,
      marginTop: "auto",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 16,
      overflow: "hidden",
    },
    imageContainer: {
      width: 120,
      height: 120,
      borderRadius: 16,
      position: "absolute",
      top: -60,
      left: "50%",
      transform: [{ translateX: -50 }],
    },
    iconContainer: {
      position: "absolute",
      right: -12,
      bottom: 14,
      backgroundColor: "#fff",
      borderRadius: 100,
      width: 24,
      height: 24,
      justifyContent: "center",
      alignItems: "center",
      borderColor: "#BDBDBD",
      borderWidth: 1,
    },
    iconLogOut: {
      position: "absolute",
      right: 16,
      top: 22,
      color: "#BDBDBD",
    },
    text: {
      fontWeight: 500,
      fontSize: 30,
      lineHeight: 35.16,
      color: "#212121",
      textAlign: "center",
    },
  });