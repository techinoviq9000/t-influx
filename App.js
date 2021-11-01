import { StatusBar } from "expo-status-bar";
import {
  extendTheme,
  Text,
  NativeBaseProvider,
  Box,
  Center,
  Button,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
import React from "react";
import { StyleSheet, View } from "react-native";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import GetStarted from "./app/screens/GetStarted";

enableScreens()

// 2. Extend the theme to include custom colors, fonts, etc
const newColorTheme = {
  brand: {
    900: "#8287af",
    800: "#7c83db",
    700: "#b3bef6",
  },
};

const config = {
  dependencies: {
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
  },
};

const Stack = createSharedElementStackNavigator();

const theme = extendTheme({ colors: newColorTheme });

export default function App() {
  return (
    <NativeBaseProvider theme={theme} config={config}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Details" component={GetStarted} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

function DetailsScreen({ route, navigation }) {
  return (
    <Center flex={1}>
      <Text>Details Screen</Text>
      <Text>{route.params.name}</Text>
      <Text>{route.params.age}</Text>
      <Button onPress={() => navigation.goBack()}>GO back</Button>
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
