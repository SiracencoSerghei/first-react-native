import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function MapScreen({ navigation, route, options }) {
  const latitude = route.params.geoLocation?.latitude ?? 50.8449033;
  const longitude = route.params.geoLocation?.longitude ?? 4.3498613;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
      >
        <Marker
          title={route.params.name}
          coordinate={{ latitude: latitude, longitude: longitude }}
          description={route.params.location}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});