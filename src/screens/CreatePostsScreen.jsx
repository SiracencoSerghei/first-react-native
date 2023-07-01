import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import IconFlipCamera from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getEmail } from "../redux/selectors";
import { addPost } from "../redux/operations";

export default function CreatePostsScreen() {
  const [permission, setPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photoUri, setPhotoUri] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [geoLocation, setGeoLocation] = useState(null);
  const [haveParam, setHaveParam] = useState(false);
  const focused = useIsFocused();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const email = useSelector(getEmail);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
      }
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setGeoLocation(coords);
    })();
  }, []);

  useEffect(() => {
    setHaveParam(photoUri && !!name && !!location);
  }, [photoUri, name, location]);

  if (permission === null) {
    return <View />;
  }
  if (permission === false) {
    navigation.navigate("Posts");
  }

  const onPostPress = async () => {
    setHaveParam(false);
    const post = {
      name,
      location,
      geoLocation,
      email,
      photoUri,
    };
    dispatch(addPost(post));
    onDelPress();
    navigation.navigate("Posts");
  };

  const onDelPress = () => {
    setPhotoUri(null);
    setName("");
    setLocation("");
  };

  const onShot = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync({
        quality: 1,
        base64: true,
      });
      setPhotoUri(uri);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={innerStyles.container}>
        {photoUri ? (
          <ImageBackground
            style={innerStyles.imageContainer}
            source={{
              uri: photoUri,
            }}
          ></ImageBackground>
        ) : (
          focused && (
            <Camera
              style={innerStyles.imageContainer}
              type={type}
              ref={setCameraRef}
              ratio="1:1"
            >
              <View style={innerStyles.captureContainer}>
                <View style={innerStyles.photoIcon}>
                  <MaterialIcons
                    name="photo-camera"
                    size={24}
                    color={"#BDBDBD"}
                    onPress={onShot}
                  />
                </View>
              </View>
              <View style={innerStyles.smallButton}>
            <IconFlipCamera
                        name="camera-flip-outline"
                        size={24}
              onPress={
                photoUri
                  ? null
                  : () => {
                      setType(
                        type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }
              }
            />
          </View>
            </Camera>
          )
        )}
        <View style={innerStyles.buttonsContainer}>
          
          <View style={innerStyles.smallButton}>
            <AntDesign
              name="delete"
              size={24}
              color={!photoUri ? "#bdbdbd" : "black"}
              onPress={onDelPress}
            />
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            style={innerStyles.input}
            placeholder="Назва..."
            name="name"
            placeholderTextColor={"#BDBDBD"}
            value={name}
            onChangeText={setName}
          />
          <View style={{ position: "relative" }}>
            <TextInput
              style={{ ...innerStyles.input, paddingLeft: 25 }}
              placeholder="Місцевість..."
              name="location"
              placeholderTextColor={"#BDBDBD"}
              value={location}
              onChangeText={setLocation}
              textContentType="location"
            />
            <AntDesign
              name="enviromento"
              size={24}
              color="#BDBDBD"
              style={{ position: "absolute", bottom: 5 }}
            />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          disabled={!haveParam}
          style={
            haveParam
              ? innerStyles.button
              : { ...innerStyles.button, backgroundColor: "#F6F6F6" }
          }
          onPress={onPostPress}
        >
          <Text
            style={
              haveParam
                ? innerStyles.buttonText
                : { ...innerStyles.buttonText, color: "#bdbdbd" }
            }
          >
            Опубліковати
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const innerStyles = StyleSheet.create({
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  smallButton: {
    height: 40,
    width: 70,
    borderRadius: 20,
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: "auto",
    // backgroundColor: "#F6F6F6",
    // alignSelf: "center",
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 25,
    backgroundColor: "white",
    height: "100%",
    display: "flex",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    height: 50,
    width: null,
    backgroundColor: "#FF6C00",
    marginTop: 27,
  },
  imageContainer: {
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
  captureContainer: {
    position: "absolute",
    bottom: 90,
    left: "50%",
    transform: [{ translateX: -30 }],
  },
  photoIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    backgroundColor: "white",
    opacity: 0.5,
    borderRadius: 30,
  },
  innerText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 16,
    marginBottom: 16,
  },
  input: {
    height: 40,
    marginTop: 10,
    fontSize: 16,
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
});
