import React, { useState, useEffect } from "react";
import { 
  View, Text, Image, FlatList, StyleSheet, Dimensions, 
  TouchableOpacity, Alert, Modal, Pressable 
} from "react-native";
import { getProducts, Product } from "../services/productService";
import { Ionicons } from "@expo/vector-icons";
import Navbar from "../components/Navbar";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCart } from "../contexts/CartContext";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  // Estado para controle do modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetch = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetch();
  }, []);

  const handleAddToCart = async (product: Product) => {
    const token = await AsyncStorage.getItem("authToken");
    if (!token) {
      Alert.alert(
        "Você precisa estar logado",
        "Por Favor, faça login para adicionar ao carrinho.",
        [{ text: "OK", onPress: () => navigation.navigate("Login") }]
      );
      return;
    }
    addToCart(product);
  };

  // Abrir modal com o produto selecionado
  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  // Fechar modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <View style={styles.screen}>
      <Navbar />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.container}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={
          <>
            <View style={styles.bannerWrapper}>
              <Image
                source={require("../../assets/Banner.png")}
                style={styles.banner}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.products}>{""}</Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => openModal(item)} // abre modal ao clicar no card
            activeOpacity={0.8}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text style={styles.price}> R$ {item.price}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={(e) => {
                e.stopPropagation(); // evitar abrir modal ao clicar no botão comprar
                handleAddToCart(item);
              }}
            >
              <Ionicons name="cart-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Comprar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedProduct && (
              <>
                <Image
                  source={{ uri: selectedProduct.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                <Text style={styles.modalPrice}>R$ {selectedProduct.price}</Text>
                <Pressable style={styles.modalButton} onPress={closeModal}>
                  <Text style={styles.modalButtonText}>Voltar</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#202135",
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 0,
  },
  card: {
    width: 180,
    height: 250,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
    padding: 10,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 8,
  },
  price: {
    textAlign: "center",
    color: "green",
  },
  banner: {
    width: width,
    height: height * 0.4,
  },
  bannerWrapper: {
    marginHorizontal: -10,
    marginTop: -10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B0864A",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 2,
  },
  products: {
    backgroundColor: "#A7A9CA",
    padding: 5,
    fontSize: 17,
    fontWeight: "500",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    marginHorizontal: -10,
    marginTop: -10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    padding: 20,
    alignItems: "center",
  },
  modalImage: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalPrice: {
    fontSize: 18,
    color: "green",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#B0864A",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
