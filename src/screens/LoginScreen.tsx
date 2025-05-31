import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Alert, Button } from "react-native";
import Navbar from "../components/Navbar";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from 'expo-router';
import api, { setAuthToken } from "../services/apiAuth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const entrar = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const { data } = await api.post('/usuarios/login', { email, senha });
      setAuthToken(data.token);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      navigation.navigate("Home");
    } catch (err: any) {
      const mensagem = err?.response?.data?.mensagem || 'Email ou senha incorretos.';
      Alert.alert('Erro ao entrar', mensagem);
    }
  };

  return (
    <View style={styles.screen}>
      <Navbar />
      <View style={styles.formsLogin}>
        <Image
          source={require("../../assets/img-login-cad.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>ACESSE SUA CONTA</Text>

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

        <Button title="Entrar" onPress={entrar} />
        <Button title="Cadastrar" onPress={() => navigation.navigate("Cadastro")} />
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
    marginBottom: 40,
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
  formsLogin: {
    marginTop: 45,
    width: '90%',
  }
});

export default LoginScreen;
