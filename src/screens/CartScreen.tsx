import React from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useCart } from "../contexts/CartContext";
import Navbar from "../components/Navbar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const Logado = async() => {
     const token = await AsyncStorage.getItem("authToken");

    if (!token) {
      Alert.alert(
        "Você precisa estar logado",
        "Por favor, faça login para finalizar sua compra.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
      return;
    }

    navigation.navigate("Comprar");
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <Text style={styles.title}>CARRINHO</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="contain"
            />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                  <Ionicons name="remove-circle-outline" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => addToCart(item)}>
                  <Ionicons name="add-circle-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFromCart(item.id)}
              >
                <Text style={styles.deleteText}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
        <TouchableOpacity onPress={Logado}>
            <Text style={styles.checkoutText}>FINALIZAR COMPRA</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E2E",
  },
  title: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingVertical: 10,
    backgroundColor: "#5C5E8B",
    fontWeight: "bold",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  productImage: {
    width: 60,
    height: 60,
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
  productInfo: {
    flex: 1,
    marginLeft: 10,
  },
  productTitle: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  productPrice: {
    color: "#fff",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
    paddingHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#444",
    alignItems: "center",
    width:"100%",
  },
  totalText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  checkoutButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 30,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "green",
    width: 300,
    textAlign: "center",
    padding: 10,
    borderRadius: 25,
  },
});
