import "react-native-gesture-handler"
import { NativeBaseProvider } from "native-base"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import React from "react"
import { StyleSheet, Easing } from "react-native"
import Background from "./app/src/CustomComponents/Background"
import { NhostApolloProvider } from "@nhost/react-apollo"
import { NhostAuthProvider } from "@nhost/react-auth"
import { nhost } from "./app/src/utils/nhost"

import {
  screenArray,
  RegisterRoute,
  LoginRoute
} from "./app/src/utils/Screens/screens"
const Stack = createStackNavigator()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

export default function App() {
  return (
    <NhostAuthProvider nhost={nhost}>
      <NhostApolloProvider nhost={nhost}>
        <NativeBaseProvider>
          <Background>
            <NavigationContainer theme={MyTheme}>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}
                initialRouteName="Welcome"
              >
                {screenArray.map(({ name, component, options }) => (
                  <Stack.Screen
                  key={`${component}-${name}`}
                  name={name}
                  component={component}
                  options={options}
                  />
                ))}
                {RegisterRoute.map(({ name, component, options }) => (
                  <Stack.Screen
                  key={`${component}-${name}`}
                  name={name}
                  component={component}
                  options={options}
                  />
                ))}
                {LoginRoute.map(({ name, component, options }) => (
                  <Stack.Screen
                  key={`${component}-${name}`}
                  name={name}
                  component={component}
                  options={options}
                  />
                ))}
              </Stack.Navigator>
            </NavigationContainer>
          </Background>
        </NativeBaseProvider>
      </NhostApolloProvider>
    </NhostAuthProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
