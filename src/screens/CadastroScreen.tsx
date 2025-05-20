import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text, TextInput, Alert } from "react-native";
import Navbar from "../components/Navbar";
import { useNavigation } from "@react-navigation/native";
import api from "../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    try {
      await api.post('/usuarios/registrar', { nome, email, senha });
      Alert.alert("Cadastro realizado com sucesso!");
      navigation.navigate("Login"); // Redirecionar para login após sucesso
    } catch (err) {
      Alert.alert("Erro no cadastro", "Tente novamente mais tarde.");
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

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Já possui cadastro? ENTRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#202135",
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F6EDEC',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    color: '#727272',
    marginBottom: 15,
  },
  image: {
  width: '100%',
  height: 200,
  marginBottom: 20,
    },
  button: {
    backgroundColor: '#696CA1',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#ccc',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 16,
  },
  forms: {
    marginTop: 45,
    width: '90%',
  }
});

export default CadastroScreen;
