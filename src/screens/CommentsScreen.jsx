import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { Header } from "../components/Header";
import { Comment } from "../components/Comment";
import IconArrow from "react-native-vector-icons/AntDesign";

export const CommentsScreen = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const handleAddComment = () => {
    if (newComment.trim() === "") {
      return;
    }
    const comment = {
      //   avatar: currentUser.avatar,
      text: newComment,
      date: new Date().toLocaleDateString(),
    };
    setComments((prevComments) => [...prevComments, comment]);
    setNewComment("");
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, justifyContent: "center" }}
      >
        <View style={styles.container}>
          <Header pageTitle="Коментарі" />
          <View
            style={{
              marginTop: 32,
              marginBottom: "auto",
            }}
          >
            <ImageBackground style={styles.image}></ImageBackground>
            {comments.map((comment, index) => (
              <Comment
                key={index}
                text={comment.text}
                date={comment.date}
              />
            ))}
          </View>
          <View style={styles.input}>
            <TextInput
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
              value={newComment}
              onChangeText={setNewComment}
              //   onSubmitEditing={handleAddComment}
            />
            <Pressable onPress={handleAddComment}>
              <View style={styles.icon}>
                <IconArrow
                  name="arrowup"
                  size={14}
                  style={{
                    color: "#fff",
                  }}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    minHeight: 700,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 20,
    backgroundColor: "#fff",
    marginTop: "auto",
  },
  image: {
    width: "100%",
    height: 240,
    backgroundColor: "#bdbdbd",
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 19,
    textAlign: "left",
    padding: 16,
    marginTop: 32,
    position: "relative",
  },
  icon: {
    position: "absolute",
    bottom: -8,
    right: 0,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: 34,
    height: 34,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
