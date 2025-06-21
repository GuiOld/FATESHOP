import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TextInput, Alert, Button, TouchableOpacity } from "react-native";
import Navbar from "../components/Navbar";
import api from "../services/apiAuth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const cadastrar = async () => {
    try {
      const response = await api.post('/usuarios/registrar', { nome, email, senha });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate("Login") }
        ]);
      } else {
        Alert.alert('Erro ao cadastrar', 'Tente novamente.');
      }
    } catch (err: any) {
      const mensagem = err?.response?.data?.mensagem || 'Erro desconhecido';
      Alert.alert('Erro no cadastro', mensagem);
    }
  };

  return (
    <View style={styles.screen}>
      <Navbar />
      <View style={styles.forms}>
        <Image
          source={require("../../assets/img-login-cad.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>CRIAR CONTA</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#aaa"
          onChangeText={setNome}
          value={nome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={setSenha}
          value={senha}
        />

        <TouchableOpacity onPress={cadastrar} style={styles.btnEntrar}>
          <Text style={styles.textButton}>CADASTRAR</Text>
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
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F6EDEC",
    width: "100%",
    padding: 15,
    borderRadius: 8,
    color: "#727272",
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  forms: {
    marginTop: 45,
    width: "90%",
  },
  btnEntrar: {
    alignItems:"center",
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "rgb(176, 134, 74)",
    width:"100%",
    textAlign: "center",
    padding: 10,
    borderRadius: 25,
  },
});

export default CadastroScreen;
