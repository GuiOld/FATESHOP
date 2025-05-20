import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

const Navbar = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.navbar}>
      <View style={styles.navContent}>
        {/* Logo FATESHOP */}
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.logo}>FATESHOP</Text>
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#555" style={styles.searchIcon} />
          <TextInput
            placeholder="Busque por peças, acessórios..."
            placeholderTextColor="#555"
            style={styles.searchInput}
          />
        </View>

        {/* Right Icons */}
        <View style={styles.rightSection}>
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>ENTRE</Text>
          </TouchableOpacity>

          <Text style={styles.separator}>|</Text>

          <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
            <Text style={styles.link}>CADASTRE-SE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#202135",
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  navContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  logo: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
    marginHorizontal: 16,
    maxWidth: 400,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    color: "#000",
    paddingVertical: 8,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  link: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  separator: {
    color: "#fff",
    marginHorizontal: 4,
    fontSize: 12,
  },
});
