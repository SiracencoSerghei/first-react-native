import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import IconBack from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

export const Header = (props) => {
  const { pageTitle } = props;
  const route = useRoute();
  const navigation = useNavigation();

  const handleBack = () => {
    if (
      route.name === "CreatePosts" ||
      route.name === "Comments" ||
      route.name === "Map"
    ) {
      navigation.navigate("Posts");
    }
  };

  const renderIcon = () => {
    if (route.name === "Posts") {
      return (
        <Icon
          name="logout"
          style={styles.icon}
          size={24}
          onPress={() => navigation.navigate("Login")}
        />
      );
    } else if (
      route.name === "CreatePosts" ||
      route.name === "Comments" ||
      route.name === "Map"
    ) {
      return (
        <IconBack
          name="arrow-back"
          style={styles.iconBack}
          size={24}
          onPress={handleBack}
        />
      );
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{pageTitle}</Text>
      </View>
      {renderIcon()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 44,
    position: "relative",
    borderBottomColor: "#9C9C9C",
    borderBottomWidth: 1,
  },

  text: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 500,
    color: "#212121",
  },
  icon: {
    position: "absolute",
    right: 20,
    top: 42,
    color: "#BDBDBD",
  },
  iconBack: {
    position: "absolute",
    left: 20,
    top: 100,
    color: "#212121cc",
  },
});



// import { Text, View, StyleSheet } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { AntDesign } from "@expo/vector-icons";
// import { MaterialIcons } from "@expo/vector-icons";

// export const Header = ({ title, options }) => {
//   const navigation = useNavigation();

//   return (
//     <>
//       <View style={headerStyle.container}>
//         {title === "Posts" ? (
//           <>
//           <MaterialIcons
//             name="logout"
//             size={24}
//             color="#BDBDBD"
//             style={headerStyle.icon}
//             onPress={() => {
//               navigation.navigate("Login");
//             }}
//           />
//         <Text style={headerStyle.text}>{title}</Text>
//         </>
//         ) : (<>
//           <Text style={headerStyle.text}>{title}</Text>
//           <AntDesign
//             name="arrowleft"
//             size={24}
//             color="black"
//             style={{ ...headerStyle.icon, left: 10 }}
//             onPress={() => navigation.navigate("Posts")}
//           />
//           </>
//         )}
//       </View>
//     </>
//   );
// };

// const headerStyle = StyleSheet.create({
//   container: {
//     position: "relative",
//     paddingVertical: 11,
//     borderBottomWidth: 1,
//     borderColor: "#BDBDBD",
//     marginTop: 35,
//   },
//   text: {
//     fontFamily: "Roboto",
//     fontStyle: "normal",
//     fontWeight: 500,
//     fontSize: 17,
//     lineHeight: 22,
//     textAlign: "center",
//     letterSpacing: -0.408,
//     color: "#212121",
//   },
//   icon: { marginLeft: "auto", position: "absolute", right: 10, top: 10 },
// });