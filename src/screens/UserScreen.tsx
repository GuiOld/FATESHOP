import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import Navbar from "../components/Navbar";
import api, { setAuthToken } from "../services/apiAuth";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

const UserScreen = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useFocusEffect(
  useCallback(() => {
    const carregarDados = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (!token) {
          navigation.navigate("Login");
          return;
        }

        setAuthToken(token);
        const response = await api.get("/usuarios/me");
        const { nome, email } = response.data;
        setNome(nome);
        setEmail(email);
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário");
      }
    };

    carregarDados();
  }, [])
);


  const atualizarConta = async () => {
    if(!nome || !email){
      Alert.alert("Campos obrigatórios", "Preencha nome e email");
      return;
    }
    try {
      const response = await api.put("/usuarios/atualizar", { nome, email, senha });

      if (response.status === 200) {
        Alert.alert("Sucesso", "Conta atualizada com sucesso!");
      } else {
        Alert.alert("Erro", "Erro ao atualizar. Tente novamente.");
      }
    } catch (err: any) {
      const mensagem = err?.response?.data?.mensagem || "Erro desconhecido";
      Alert.alert("Erro ao atualizar", mensagem);
    }
  };

  const deletarConta = async () => {
    try {
      const response = await api.delete("/usuarios/deletar");

      if (response.status === 200) {
        await AsyncStorage.removeItem("authToken");
        Alert.alert("Conta deletada", "Sua conta foi excluída com sucesso!", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        Alert.alert("Erro", "Erro ao deletar. Tente novamente.");
      }
    } catch (err: any) {
      const mensagem = err?.response?.data?.mensagem || "Erro desconhecido";
      Alert.alert("Erro ao deletar", mensagem);
    }
  };

  return (
    <View style={styles.screen}>
      <Navbar />
      <View style={styles.forms}>
        <Ionicons style={styles.avatar} name="person" size={140} color="gray" />

        <Text style={styles.title}>EDITE SUA CONTA</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#aaa"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.buttonUpdate} onPress={atualizarConta}>
          <Text style={styles.buttonText}>ATUALIZAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonDelete} onPress={deletarConta}>
          <Text style={styles.buttonText}>DELETAR CONTA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#202135",
    alignItems: "center",
  },
  forms: {
    width: "90%",
    marginTop: 40,
  },
  avatar: {
    backgroundColor: "#E5E5E5",
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 30,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#F6EDEC",
    color: "#727272",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  buttonUpdate: {
    backgroundColor: "#B88A44",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonDelete: {
    backgroundColor: "#B32222",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default UserScreen;
