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
    TouchableWithoutFeedback,
  Keyboard,
  } from "react-native";
  
  import photoBG from "../photo/photoBG.jpg";
  
  export const LoginScreen = () => {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleRegistration = () => {
    setEmail("");
    console.log("Адреса електронної пошти:", email);
    setPassword("");
    console.log("Пароль:", password);
  };

  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <ImageBackground source={photoBG} style={styles.imageBG}>
        <View style={styles.containerForm}>
  <Text style={styles.textHeader}>Увійти</Text>
  <TextInput
    style={[styles.input, focusedInput === "email" && styles.focus]}
    placeholder="Адреса електронної пошти"
    value={email}
    onChangeText={setEmail}
    onFocus={() => handleInputFocus("email")}
    onBlur={handleInputBlur}
  ></TextInput>
  <View style={styles.containerInput}>
    <TextInput
      style={[
        styles.input,
        styles.lastChildInput,
        focusedInput === "password" && styles.focus,
      ]}
      placeholder="Пароль"
      secureTextEntry={!showPassword}
      value={password}
      onChangeText={setPassword}
      onFocus={() => handleInputFocus("password")}
      onBlur={handleInputBlur}
    ></TextInput>
    <Pressable onPress={togglePasswordVisibility}>
      <Text style={styles.textInput}>
        {showPassword ? "Сховати" : "Показати"}
      </Text>
    </Pressable>
  </View>
  <Pressable onPress={handleRegistration}>
    <View style={styles.button}>
      <Text style={styles.textButton}>Увійти</Text>
    </View>
  </Pressable>
  <Pressable>
    <Text style={styles.text}>Немає акаунту? Зареєструватися</Text>
  </Pressable>
</View>
        </ImageBackground>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
    focus: {
      borderColor: "#FF6C00",
      borderWidth: 1,
    },
  });