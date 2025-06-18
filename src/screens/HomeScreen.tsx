import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Alert } from "react-native";
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
        if(!token){
            Alert.alert("Você precisa estar logado", "Por Favor, faça login para adicionar ao carrinho.",
                [{text:"OK", onPress: () => navigation.navigate("Login")}]
            );
            return;
        }
        addToCart(product);
    }

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
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image}/>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                            {item.title}
                        </Text>
                        <Text style={styles.price}> R$ {item.price}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(item)}>
                            <Ionicons name="cart-outline" size={24} color="white"/>
                            <Text style={styles.buttonText}>Comprar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
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
        paddingHorizontal: 10,  // só nas laterais para os cards
        paddingTop: 0, 
    },
    card: {
        width: 180,
        height: 250,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        overflow: 'hidden',
        elevation: 2,
        padding: 10,
    },
    row: {
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'contain',
        marginBottom: 8,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 8,
    },
    price: {
        textAlign: 'center',
        color: 'green',
    },
    banner: {
        width: width,       // toda largura da tela
        height: height * 0.4, // altura proporcional (40% da tela)
    },
    bannerWrapper: {
        marginHorizontal: -10,  // remove o padding horizontal aplicado no container
        marginTop: -10,         // remove o padding top aplicado no container
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#B0864A",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: 'center',
        paddingLeft: 2,
    },
    products: {
        backgroundColor: "#A7A9CA",
        padding: 5,
        fontSize: 17,
        fontWeight: "500",
        color: "#fff",
        textAlign: 'center',
        marginBottom: 10,
        marginHorizontal: -10,  // remove o padding horizontal aplicado no container
        marginTop: -10,
    },
});
