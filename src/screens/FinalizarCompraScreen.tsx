import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import Navbar from "../components/Navbar";

const FinalizarCompraScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const voltarParaHome = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>COMPRA FINALIZADA COM SUCESSO!</Text>

      <Image
        source={require("../../assets/img-finalizar.png")} // Coloque a imagem aqui!
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.button} onPress={voltarParaHome}>
        <Text style={styles.buttonText}>VOLTAR À TELA HOME</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FinalizarCompraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202135",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: "80%",
    height: 200,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#B88A44",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
