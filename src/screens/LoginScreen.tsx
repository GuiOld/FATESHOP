import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Navbar from "../components/Navbar";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

const LoginScreen = () =>{
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleLogin = () => {
    console.log('Email:', email);
    console.log('Senha:', senha);
    // lógica real de login aqui
  };


    return(
        <View style={styles.screen}>
            <Navbar />

            <Text style={styles.title}>Acesse a sua Conta</Text>

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

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.link}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                <Text style={styles.createAccount}>Criar uma conta</Text>
            </TouchableOpacity>
            
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
    flex: 1,
    backgroundColor: "#202135",
    justifyContent: "space-between",
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2d2e4a',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
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
    color: '#ddd',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginBottom: 30,
  },
  createAccount: {
    color: '#ccc',
    textDecorationLine: 'underline',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;