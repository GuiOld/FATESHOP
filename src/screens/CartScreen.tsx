import React from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useCart } from "../contexts/CartContext";

const CartScreen = () => {
    const {cart} = useCart();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carrinho de Compras</Text>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <Text>{item.title}</Text>
                        <Text>Quantidade: {item.quantity}</Text>
                        <Text>Preço: R${item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
});