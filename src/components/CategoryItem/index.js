import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CategoryItem({ data }) {
  const navigation = useNavigation();

  function handleNavigate() {
    navigation.navigate("Category", {
      id: data.id,
      title: data?.attributes?.name,
    });
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={handleNavigate}
    >
      <Image
        style={styles.icon}
        source={{
          uri: `http://192.168.0.140:1337${data?.attributes?.icon?.data?.attributes?.url}`,
        }}
      />

      <Text style={styles.name}>{data?.attributes?.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    marginLeft: 8,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
});
