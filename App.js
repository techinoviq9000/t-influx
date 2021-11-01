import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  extendTheme,
  Text,
  NativeBaseProvider,
  Box,
  Center,
  Button,
} from "native-base";
import { NavigationContainer, DefaultTheme  } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets  } from '@react-navigation/stack';;
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
import React from "react";
import { StyleSheet, View } from "react-native";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import GetStarted from "./app/screens/GetStarted";
import Background from "./app/CustomComponents/Background";
import Animated from "react-native-reanimated";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function App() {
  return (
    <NativeBaseProvider>
      <Background>
        <NavigationContainer  theme={MyTheme}>
          <Stack.Navigator
           screenOptions={{
            headerShown: false,
          }}
          // initialRouteName="Details"
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}/>
            <Stack.Screen name="Details" component={GetStarted}  options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}/>
        <Stack.Screen name="Details asd" component={DetailsScreen}  options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Background>
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
