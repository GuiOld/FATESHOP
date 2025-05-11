import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity, Alert } from "react-native";
import { getProducts, Product } from "../services/productService";
import Navbar from "../components/Navbar";

const HomeScreen = () => {
    const [products, setProducts] = useState<Product[]>([]);
    
    useEffect(() => {
        const fetch = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetch();
    }, []);

    return (
        <View style={styles.screen}>
            <Navbar />
        <FlatList 
            data={products}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.container}

            ListHeaderComponent={
                <Image
                    source={require("../../assets/Banner.png")}
                    style={styles.banner}
                    resizeMode="contain"
                />       
            }

            renderItem={({ item }) =>(
                <View style={styles.card}>
                    <Image source={{ uri: item.image }} style={styles.image}/>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}> R$ {item.price}</Text>
                    <TouchableOpacity style={styles.button}>
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
        padding: 16,
    },
    card: {
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontWeight: 'bold',
        marginVertical: 8,
    },
    price: {
        color: 'green',
    },
    banner: {
        width: '100%',
        height: 200,
    },
    button: {
        backgroundColor: "#B0864A",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});