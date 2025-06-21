import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "./src/types/types";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import UserScreen from "./src/screens/UserScreen";
import { CartProvider } from "./src/contexts/CartContext";
import CartScreen from "./src/screens/CartScreen";
import ComprarScreen from "./src/screens/ComprarScreen";
import FinalizarCompraScreen from "./src/screens/FinalizarCompraScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Cart" component={CartScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Comprar" component={ComprarScreen} options={{headerShown: false}} />
          <Stack.Screen name="Finalizar" component={FinalizarCompraScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </NavigationContainer>
      </CartProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
