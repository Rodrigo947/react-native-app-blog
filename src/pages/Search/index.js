import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";

import api from "../../services/api";

export default function Search() {
  const [input, setInput] = useState("");

  async function handleSearchPost() {
    if (input === "") {
      alert("Digite algum nome!");
      return;
    }

    const response = await api.get(
      `/api/posts?filters[title][$contains]=${input}&populate=cover`
    );

    console.log(response.data?.data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="O que está buscando?"
          onChangeText={(text) => setInput(text)}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchPost}
        >
          <Feather name="search" size={25} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
    padding: 18,
  },
  containerInput: {
    flexDirection: "row",
    width: "100%",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    width: "85%",
    backgroundColor: "#C4C4C4",
    height: 45,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  searchButton: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C4C4C4",
    height: 45,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    marginLeft: -1,
  },
});
