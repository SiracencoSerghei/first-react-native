import { View, Text, Image} from "react-native";
import avatar from "../photo/avatar.jpg";

export const PostsScreen = () => {
  return (
    <View >
      <Text>"Публікації" </Text>
         <Image source={avatar}/>
          <View>
            <Text>Natali Romanova</Text>
            <Text>email@example.com</Text>
          </View>
    </View>
  );
};
