import React, { useState, useEffect, useRef } from "react";
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
  TouchableOpacity,
} from "react-native";
import { Header } from "../components/Header";
import IconCamera from "react-native-vector-icons/FontAwesome";
import IconLocation from "react-native-vector-icons/Ionicons";
import IconTrash from "react-native-vector-icons/Feather";
import IconFlipCamera from "react-native-vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

export const CreatePostsScreen = () => {
  const [location, setLocation] = useState("");
  const [permission, setPermission] = useState(false);
  const [name, setName] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraRef, setCameraRef] = useState(null);
  const [uri, setUri] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [haveParam, setHaveParam] = useState(false);
  const [camera, setCamera] = useState(null);
  const focused = useIsFocused()

  const navigation = useNavigation();

  const startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      setCamera(true);
    } else {
    return
    }
  };

  const stopCamera = () => {
    setCamera(null);
  };
  
  useEffect(() => {
    startCamera();
  
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setGeoLocation(coords);
        return coords;
      }
    };
    requestLocationPermission();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const handleAddCamera = () => {
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      navigation.navigate("Home");
    }
  };

  const handleAddLocation = () => {
    if (!permission) {
      navigation.navigate("Home");
    }
  };

  const handleAddPost = async () => {
    if (name.trim() === "" || location.trim() === "") {
      return;
    }
    setHaveParam(false);

    const post = {
      name: name.trim(),
      location: location.trim(),
      geoLocation: geoLocation,
      uri: uri,
    };
    console.log("post in CreatePosts", post);
    handleAddCamera();
    handleAddLocation();
    setHaveParam(uri && !!name && !!location);
    // resetForm();
    navigation.navigate("Home", {
      screen: "Posts",
      params: { post },
    });
  };

  const resetForm = () => {
    setName("");
    setLocation("");
    setUri(null);
    setSelectedImage(null);
  };

  const isFormValid = name.trim() !== "" && location.trim() !== "";

  const onPhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setUri(uri);
    }
  };

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.uri);
      // setUri(result.uri);
    }
  };
  const handleCameraFlip = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
    // flipIconRef.current?.animate("flip");
  };
  // const handleOpenMaps = async () => {
  //   if (geoLocation) {
  //     const { latitude, longitude } = geoLocation;
  //     const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  //     const canOpen = await Linking.canOpenURL(url);
  //     if (canOpen) {
  //       Linking.openURL(url);
  //     } else {
  //       const storeUrl = Platform.select({
  //         ios: "https://apps.apple.com/app/google-maps/id585027354",
  //         android: "https://play.google.com/store/apps/details?id=com.google.android.apps.maps",
  //       });
  //       Linking.openURL(storeUrl);
  //     }
  //   }
  // };

  useEffect(() => {
    console.log("uri in CreatePosts", uri);
    setHaveParam(uri && !!name && !!location);
    console.log("haveParam in CreatePosts", haveParam);
  }, [uri, name, location]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View style={styles.container}>
          <Header pageTitle="Створити публікацію" />
          <View style={{ marginTop: 32 }}>
            {uri ? (
              <ImageBackground
                source={{ uri: uri }}
                style={styles.image}
                imageStyle={{ borderRadius: 16 }}
              >
                <View
                  style={{
                    ...styles.icon,
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <IconCamera
                    name="camera"
                    size={24}
                    style={{ color: "#BDBDBD" }}
                    onPress={() => setUri(null)}
                  />
                </View>
              </ImageBackground>
            ) : selectedImage ? (
              <ImageBackground
                source={{ uri: selectedImage }}
                style={styles.image}
              >
                <View style={styles.icon}>
                  <IconCamera
                    name="camera"
                    size={24}
                    style={{ color: "#BDBDBD", opacity: 0.5 }}
                    onPress={() => setSelectedImage(null)}
                  />
                </View>
              </ImageBackground>
            ) : ( focused && (
                <Camera
                  style={styles.image}
                  type={type}
                  ref={setCameraRef}
                  ratio="1:1"
                >
                  <View style={styles.captureButtonContainer}>
                    <TouchableOpacity
                      style={styles.captureButton}
                      onPress={onPhoto}
                    >
                      <IconCamera
                        name="camera"
                        size={24}
                        style={styles.cameraIcon}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.flipButtonContainer}>
                    <TouchableOpacity
                      style={styles.flipButton}
                      onPress={uri ? null : handleCameraFlip}
                    >
                      <IconFlipCamera
                        name="camera-flip-outline"
                        size={24}
                        style={styles.flipIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </Camera>
              )
            )}
            <Pressable onPress={handleSelectImage}>
              <Text style={styles.text}>Завантажте фото</Text>
            </Pressable>
            <View style={{ position: "relative" }}>
              <TextInput
                style={{ ...styles.input, marginTop: 32 }}
                placeholder="Назва"
                placeholderTextColor="#BDBDBD"
                value={name}
                onChangeText={setName}
              ></TextInput>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Pressable
                //  onPress={handleOpenMaps}
                >
                  <IconLocation
                    name="location-outline"
                    size={24}
                    style={styles.iconLocation}
                  />
                </Pressable>
                <TextInput
                  style={{
                    ...styles.input,
                    flex: 1,
                    marginBottom: 32,
                    paddingLeft: 30,
                  }}
                  placeholder="Місцевість..."
                  placeholderTextColor="#BDBDBD"
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
              <Pressable onPress={handleAddPost}>
                <View
                  style={[
                    styles.button,
                    { backgroundColor: isFormValid ? "#FF6C00" : "#F6F6F6" },
                  ]}
                >
                  <Text
                    style={[
                      styles.textButton,
                      { color: isFormValid ? "#fff" : "#BDBDBD" },
                    ]}
                  >
                    Опубліковати
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          <Pressable onPress={resetForm} style={styles.iconTrash}>
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
    overflow: "hidden",
    position: "relative",
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
    right: -20,
    top: -30,
    justifyContent: "center",
    alignItems: "flex-start",
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
  flipContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  captureContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -30 }],
  },
  captureButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    opacity: 0.7,
  },
  flipButtonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
