import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import photoBG from "../photo/photoBG.jpg";
// import avatar from "../photo/avatar.jpg";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { createUser } from "../redux/operations";

export const RegistrationScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUri, setAvatarUri] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [permission, setPermission] = useState(null);
  const [getAvatar, setGetAvatar] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [haveParam, setHaveParam] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    setHaveParam(login && email && password);
  }, [login, email, password]);

  if (permission === null) {
    return <View />;
  }

  const onShot = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync({
        quality: 1,
        base64: true,
      });
      setAvatarUri(uri);
      setGetAvatar(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegistration = () => {
    console.log("Логін:", login);
    console.log("Адреса електронної пошти:", email);
    console.log("Пароль:", password);
    setLogin("");
    setEmail("");
    setPassword("");
    const user = {
      login,
      email,
      password,
      avatarUri,
    };
    dispatch(createUser(user));
    console.log('user in registration', user)
    navigation.navigate("Home");
  };
  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={photoBG} style={styles.imageBG}>
        <View style={styles.containerForm}>
          <View style={styles.avatarContainer}>
          {!getAvatar ? (
              <Image source={{ uri: avatarUri }} style={styles.image} />
            ) : (
              <Camera
                style={styles.image}
                type={Camera.Constants.Type.front}
                ref={setCameraRef}
              />
            )}
            {!getAvatar && !avatarUri && (
              <AntDesign
                name="pluscircleo"
                size={24}
                color="#FF6C00"
                style={styles.icon}
                onPress={() => {
                  setGetAvatar(true);
                }}
              />
            )}
            {avatarUri && (
              <AntDesign
                name="closecircleo"
                size={24}
                color="#BDBDBD"
                style={styles.icon}
                onPress={() => {
                  setGetAvatar(false);
                  setAvatarUri(null);
                }}
              />
            )}
            {getAvatar && !avatarUri && (
              <MaterialIcons
                name="photo-camera"
                size={24}
                color={"#FF6C00"}
                style={styles.icon}
                onPress={onShot}
              />
            )}
          </View>
          <Text style={styles.textHeader}>Реєстрація</Text>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, justifyContent: "center" }}
          >
            <TextInput
              style={[styles.input, focusedInput === "login" && styles.focus]}
              placeholder="Логін"
              value={login}
              onChangeText={setLogin}
              onFocus={() => handleInputFocus("login")}
              onBlur={handleInputBlur}
            ></TextInput>
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
          </KeyboardAvoidingView>
          <Pressable onPress={handleRegistration}>
            <View style={[styles.button, !haveParam && styles.disabledButton]}>
              <Text style={styles.textButton}>Зареєструватися</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.text}>Вже є акаунт? Увійти</Text>
          </Pressable>
        </View>
      </ImageBackground>
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
  avatarContainer: {
    position: "absolute",
    left: Dimensions.get("window").width / 2,
    transform: [{ translateX: -60 }],
  },
  containerForm: {
    backgroundColor: "#fff",
    width: "100%",
    height: 549,
    marginTop: "auto",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
    textAlign: "center",
    padding: 20,
  },

  image: {
    overflow: "hidden",
    position: "absolute",
    top: -60,
    bottom: 0,
    left: 0,
    right: 0,
    // margin: "auto",
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  icon: {
    position: "absolute",
    left: 120 - 12,
    bottom: -40,
    zIndex: 100,
    color: "#FF6C00",
    fontSize: 25,
  },
  textHeader: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35.16,
    color: "#212121",
    marginTop: 92,
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: "auto",
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
    bottom: 20,
    right: 16,
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 18.75,
    fontWeight: 400,
  },
  button: {
    width: "100%",
    height: 50,
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
  disabledButton: {
    backgroundColor: "gray",
  },
});
