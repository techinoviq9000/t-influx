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
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { enableScreens } from "react-native-screens";
import React from "react";
import { StyleSheet, View } from "react-native";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import GetStarted from "./app/screens/GetStarted";
import ContinueRegistration from "./app/screens/ContinueRegistration";
import Background from "./app/CustomComponents/Background";
import Animated from "react-native-reanimated";
import UploadDocuments from "./app/screens/UploadDocuments";
import BeginDocumentSubmission from "./app/screens/BeginDocumentSubmission";
import EligibiltyCheck from "./app/screens/EligibiltyCheck";
import VerifyOTP from "./app/screens/VerifyOTP";
import PersonalDetails from "./app/screens/PersonalDetails";
import QuestionsAndAnswers from "./app/screens/QuestionsAndAnswers";
import ProductSelection from "./app/screens/ProductSelection";
import Login from "./app/screens/Login";
import Registration from "./app/screens/Registration";
import VerifyOTPRegister from "./app/screens/VerifyOTPRegister";
import ApplicationID from "./app/screens/ApplicationID";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const ExistingCustomerStack = createStackNavigator();
const NewCustomerStack = createStackNavigator();

const NewCustomerStackScreen = () => (
  <NewCustomerStack.Navigator
    initialRouteName="Application ID Screen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <NewCustomerStack.Screen name="Get Started" component={GetStarted} />
    <NewCustomerStack.Screen name="Registration" component={Registration} />
    <NewCustomerStack.Screen
      name="VerifyOTPRegister"
      component={VerifyOTPRegister}
    />
    <NewCustomerStack.Screen
      name="Application ID Screen"
      component={ApplicationID}
    />
    <NewCustomerStack.Screen
      name="ExistingCustomer"
      component={ExistingCustomerStackScreen}
    />
    <NewCustomerStack.Screen
      name="Personal Details"
      component={PersonalDetails}
    />
    <NewCustomerStack.Screen name="Q/A" component={QuestionsAndAnswers} />
    <NewCustomerStack.Screen
      name="Product Selection"
      component={ProductSelection}
    />
     <NewCustomerStack.Screen
      name="Upload Documents"
      component={UploadDocuments}
    />
    <NewCustomerStack.Screen
      name="Begin Document Submission"
      component={BeginDocumentSubmission}
    />
  </NewCustomerStack.Navigator>
);

const ExistingCustomerStackScreen = () => (
  <ExistingCustomerStack.Navigator
  initialRouteName="Login"
    screenOptions={{
      headerShown: false,
    }}
  >
    <ExistingCustomerStack.Screen
      name="Login"
      component={Login}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <ExistingCustomerStack.Screen
      name="VerifyOTP"
      component={VerifyOTP}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <ExistingCustomerStack.Screen
      name="Continue Application"
      component={ContinueRegistration}
      options={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    />
    <ExistingCustomerStack.Screen
      name="Personal Details"
      component={PersonalDetails}
    />
    <ExistingCustomerStack.Screen name="Q/A" component={QuestionsAndAnswers} />
    <ExistingCustomerStack.Screen
      name="Product Selection"
      component={ProductSelection}
    />
    <ExistingCustomerStack.Screen
      name="Upload Documents"
      component={UploadDocuments}
    />
    <ExistingCustomerStack.Screen
      name="Begin Document Submission"
      component={BeginDocumentSubmission}
    />
  </ExistingCustomerStack.Navigator>
);

export default function App() {
  return (
    <NativeBaseProvider>
      <Background>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Welcome"
          >
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="RegisterRoute"
              component={NewCustomerStackScreen}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
            <Stack.Screen
              name="LoginRoute"
              component={ExistingCustomerStackScreen}
              options={{
                ...TransitionPresets.RevealFromBottomAndroid,
              }}
            />
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
