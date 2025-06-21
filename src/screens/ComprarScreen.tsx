import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { useCart } from "../contexts/CartContext";

const ComprarScreen = () => {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { clearCart } = useCart();

  const buscarEndereco = async (cep: string) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;

      if (data.erro) throw new Error("CEP não encontrado");

      // Corrigido os campos com letra minúscula (padrão correto da API)
      setLogradouro(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");

      const enderecoCompleto = `${data.logradouro}, ${data.localidade}, ${data.uf}`;
      const geo = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: enderecoCompleto,
          format: "json",
          addressdetails: 1,
          limit: 1,
        },
        headers: {
            "User-Agent" : "fateshop-app/1.0",
        }
      });

      if (geo.data && geo.data.length > 0) {
        const { lat, lon } = geo.data[0];
        setLocation({
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        });
      } else {
        throw new Error("Localização não encontrada no mapa");
      }
    } catch (err) {
      Alert.alert("Erro", "Não foi possível buscar o endereço. Verifique o CEP");
    }
  };

  const handleCEP = (text: string) => {
    const onlyNumber = text.replace(/\D/g, "");
    setCep(onlyNumber);

    if (onlyNumber.length === 8) {
      buscarEndereco(onlyNumber);
    }
  };

  const handleComprar = async () => {
    await clearCart();
    navigation.navigate("Finalizar");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#202135" }}>
        <Navbar />
        <Text style={styles.header}>FINALIZAR COMPRA</Text>
        <View style={styles.form}>
          <Text style={styles.label}>INSIRA O ENDEREÇO DE ENTREGA</Text>

          <TextInput
            style={styles.input}
            placeholder="CEP"
            value={cep}
            onChangeText={handleCEP}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Logradouro"
            value={logradouro}
            onChangeText={setLogradouro}
          />
          <TextInput
            style={styles.input}
            placeholder="Bairro"
            value={bairro}
            onChangeText={setBairro}
          />
          <TextInput
            style={styles.input}
            placeholder="Cidade"
            value={cidade}
            onChangeText={setCidade}
          />
          <TextInput
            style={styles.input}
            placeholder="Estado"
            value={estado}
            onChangeText={setEstado}
          />
          <TextInput
            style={styles.input}
            placeholder="Complemento"
            value={complemento}
            onChangeText={setComplemento}
          />

          {location && (
            <MapView
              style={styles.map}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker coordinate={location} />
            </MapView>
          )}

          <TouchableOpacity style={styles.button} onPress={handleComprar}>
            <Text style={styles.buttonText}>COMPRAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ComprarScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 15,
    backgroundColor: "#5b5c99",
  },
  form: {
    padding: 20,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F6EDEC",
    color: "#000",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: 200,
    marginVertical: 20,
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#3BAA28",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
