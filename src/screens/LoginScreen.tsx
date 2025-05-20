import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import Navbar from "../components/Navbar";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import api, { setAuthToken } from "../services/api";

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

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          

            <TouchableOpacity>
                <Text style={styles.link}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                <Text style={styles.createAccount}>Ainda não tem uma conta? CADASTRE-SE</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

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
    color: '#727272 ',
    marginBottom: 15,
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
  image: {
  width: '100%',
  height: 200,
  marginBottom: 20,
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
  formsLogin: {
     marginTop: 45,
    width: '90%',
  }
});

export default LoginScreen;