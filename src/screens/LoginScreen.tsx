import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Alert, Button, TouchableOpacity } from "react-native";
import Navbar from "../components/Navbar";
import { TextInput } from "react-native-gesture-handler";
import api, { setAuthToken } from "../services/apiAuth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../contexts/CartContext";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setUserEmail } = useCart();

  const entrar = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      const { data } = await api.post('/usuarios/login', { email, senha });
      await AsyncStorage.setItem("authToken", data.token);
      setAuthToken(data.token);
      await setUserEmail(email);
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

        <TouchableOpacity onPress={entrar} style={styles.btnEntrar}>
          <Text style={styles.textButton}>ENTRAR</Text>
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

export default LoginScreen;
