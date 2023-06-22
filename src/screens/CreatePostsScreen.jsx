import React from "react";
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Header } from "../components/Header";
import IconCamera from "react-native-vector-icons/FontAwesome";
import IconLocation from "react-native-vector-icons/Ionicons";
import IconTrash from "react-native-vector-icons/Feather";

export const CreatePostsScreen = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View style={styles.container}>
          <Header pageTitle="Створити публікацію" />
          <View style={{ marginTop: 32 }}>
            <ImageBackground style={styles.image}>
              <View style={styles.icon}>
                <IconCamera
                  name="camera"
                  size={24}
                  style={{ color: "#BDBDBD", opacity: 0.5 }}
                />
              </View>
            </ImageBackground>
            <Pressable>
              <Text style={styles.text}>Завантажте фото</Text>
            </Pressable>
            <View style={{ position: "relative" }}>
              <TextInput
                style={{ ...styles.input, marginTop: 32 }}
                placeholder="Назва"
                placeholderTextColor="#BDBDBD"
              ></TextInput>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: 32,
                    paddingLeft: 30,
                  }}
                  placeholder="Місцевість..."
                  placeholderTextColor="#BDBDBD"
                ></TextInput>
                <IconLocation
                  name="location-outline"
                  size={24}
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 0,
                    color: "#BDBDBD",
                    opacity: 0.5,
                  }}
                />
              </View>
              <Pressable>
                <View style={styles.button}>
                  <Text style={styles.textButton}>Опубліковати</Text>
                </View>
              </Pressable>
            </View>
          </View>
          <Pressable style={styles.iconTrash}>
            <IconTrash name="trash-2" size={24} style={{ color: "#BDBDBD" }} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    minHeight: 849,
    paddingHorizontal: 20,
    paddingTop: 92,
    backgroundColor: "#fff",
  },
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    height: 240,
    borderRadius: 8,
  },
  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    backgroundColor: "white",
    borderRadius: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
    textAlign: "left",
    color: "#BDBDBD",
    marginTop: 10,
  },
  input: {
    height: 50,
    marginBottom: 16,
    paddingVertical: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  button: {
    width: 350,
    height: 51,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    paddingVertical: 16,
  },
  textButton: {
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: 400,
    color: "#BDBDBD",
    textAlign: "center",
  },
  iconLocation: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    color: "#BDBDBD",
  },

  iconTrash: {
    backgroundColor: "#F6F6F6",
    marginTop: "auto",
    width: 70,
    height: 40,
    marginBottom: 84,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
