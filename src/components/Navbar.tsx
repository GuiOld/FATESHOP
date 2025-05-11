import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

const Navbar = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return(
        /*<SafeAreaView style={styles.safeArea}>*/
        <View style={styles.navbar}>
            
           <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.link}>FATESHOP</Text>
           </TouchableOpacity>

           <TextInput 
            placeholder="Buscar Produto..."
            placeholderTextColor="#ccc"
            style={styles.searchInput}
           />

           <View style={styles.rightSection}>
            <TouchableOpacity>
                <Ionicons name="cart-outline" size={24} color="white"/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.authButton} onPress={() => navigation.navigate("Cadastro")}>
                <Text style={styles.link}>Cadastrar</Text>
            </TouchableOpacity>

           </View>
        </View>
        /*</SafeAreaView>*/
    );
}

export default Navbar;

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "#202135",
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop:40,
        padding: 10,
        gap:10,
    },
    link: {
        color: '#fff',
        fontWeight: 'bold',
    },
    searchInput: {
        flex: 1,
        backgroundColor: "#2d2e4a",
        borderRadius: 6,
        padding: 10,
        color: '#fff',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    authButton: {
        marginLeft: 10,
    },
    safeArea: {
        backgroundColor: '#202135',
    },
})