import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import api from "../../services/api";

export default function Detail() {
  const route = useRoute();
  const navigation = useNavigation();

  const [post, setPost] = useState({});
  const [links, setLinks] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    async function getPost() {
      const response = await api.get(
        `/posts/${route.params.id}?populate=cover,category,Opcoes`
      );
      setPost(response.data.data);
      setLinks(response.data?.data?.attributes?.Opcoes);
    }

    getPost();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleShare}>
          <Entypo name="share" size={25} color="#FFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, post]);

  async function handleShare() {
    try {
      const result = await Share.share({
        message: `
          Confere esse post : ${post?.attributes?.title}
          
          ${post?.attributes?.description}

          Vi lá no app devpost!
        `,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Activity type");
        } else {
          console.log("Compartilhado com sucesso");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Modal Fechado");
      }
    } catch (error) {
      console.log("ERROR");
    }
  }

  function handleOpenLink(link) {
    console.log(link);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.cover}
        source={{
          uri: `http://192.168.0.140:1337${post?.attributes?.cover?.data?.attributes?.url}`,
        }}
      />

      <Text style={styles.title}>{post?.attributes?.title}</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>{post?.attributes?.description}</Text>

        {links.length > 0 && <Text style={styles.subTitle}>Links</Text>}
        {links.map((link) => (
          <TouchableOpacity
            key={link.id}
            style={styles.linkButton}
            onPress={() => handleOpenLink(link)}
          >
            <Feather name="link" color="#1e4687" size={14} />
            <Text style={styles.linkText}>{link.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  cover: {
    width: "100%",
    height: 230,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 18,
    marginTop: 18,
    paddingHorizontal: 12,
  },
  content: {
    paddingHorizontal: 12,
  },
  description: {
    lineHeight: 20,
  },
  subTitle: {
    fontWeight: "bold",
    marginTop: 14,
    fontSize: 18,
    marginBottom: 6,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  linkText: {
    color: "#1e4687",
    fontSize: 16,
    marginLeft: 6,
  },
});
