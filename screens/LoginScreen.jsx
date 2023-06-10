import React, { useState } from "react";
import {
    View,
    ImageBackground,
    StyleSheet,
    Text,
    Image,
    TextInput,
    Pressable,
    Button,
    KeyboardAvoidingView,
  } from "react-native";
  
  import photoBG from "../photo/photoBG.jpg";
  
  export const LoginScreen = () => {
    const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <ImageBackground source={photoBG} style={styles.imageBG}>
          <View style={styles.containerForm}>
            <Text style={styles.textHeader}>Увійти</Text>
            <TextInput
              style={styles.input}
              placeholder="Адреса електронної пошти"
            ></TextInput>
            <View style={styles.containerInput}>
            <TextInput
              style={[styles.input, styles.lastChildInput]}
              placeholder="Пароль"
              secureTextEntry={!showPassword}
            ></TextInput>
            <Pressable onPress={togglePasswordVisibility}>
              <Text style={styles.textInput}>
                {showPassword ? "Сховати" : "Показати"}
              </Text>
            </Pressable>
          </View>
            <View style={styles.button}>
              <Text style={styles.textButton}>Увійти</Text>
            </View>
            <Pressable>
              <Text style={styles.text}>Немає акаунту? Зареєструватися</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  };
  
  const styles = StyleSheet.create({
    imageBG: {
      flex: 1,
      justifyContent: "flex-end",
      width: null,
      height: null,
    },
    containerForm: {
      backgroundColor: "#fff",
      width: "100%",
      height: 489,
      marginTop: "auto",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      textAlign: "center",
      padding: 20,
    },
    textHeader: {
      fontWeight: 500,
      fontSize: 30,
      lineHeight: 35.16,
      color: "#212121",
      marginTop: 32,
      textAlign: "center",
      marginBottom: 32,
    },
    input: {
      width: 350,
      height: 50,
      backgroundColor: "#F6F6F6",
      borderRadius: 8,
      marginBottom: 16,
      padding: 16,
      borderColor: "#E8E8E8",
      borderWidth: 1,
    },
    lastChildInput: {
      marginBottom: 0,
    },
    containerInput: {
      position: "relative",
    },
    textInput: {
      position: "absolute",
      bottom: 16,
      right: 16,
      color: "#1B4371",
      fontSize: 16,
      lineHeight: 18.75,
      fontWeight: 400,
    },
    button: {
      width: 350,
      height: 51,
      backgroundColor: "#FF6C00",
      borderRadius: 100,
      marginTop: 43,
      marginBottom: 16,
      padding: 16,
    },
    textButton: {
      fontSize: 16,
      lineHeight: 18.75,
      fontWeight: 400,
      color: "#fff",
      textAlign: "center",
    },
    text: {
      fontSize: 16,
      lineHeight: 18.75,
      fontWeight: 400,
      color: "#1B4371",
      textAlign: "center",
    },
  });