import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";

const { width: WIDTH } = Dimensions.get("window");

export default function FavoritePost({ data }) {
  return (
    <TouchableOpacity styles={styles.container}>
      <ImageBackground
        source={{
          uri: `http://192.168.0.140:1337${data?.attributes?.cover?.data?.attributes?.url}`,
        }}
        style={styles.cover}
        resizeMode="cover"
        blurRadius={3}
        imageStyle={{ borderRadius: 6, opacity: 0.4 }}
      >
        <Text style={styles.title}>{data?.attributes?.title}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 8,
  },
  cover: {
    borderRadius: 4,
    width: WIDTH - 60,
    height: 100,
    justifyContent: "flex-end",
    backgroundColor: "#232630",
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFF",
  },
});
