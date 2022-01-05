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

import React from "react";
import { StyleSheet, View } from "react-native";
import WelcomeScreen from "./app/src/screens/WelcomeScreen";
import GetStarted from "./app/src/screens/GetStarted";
import ContinueRegistration from "./app/src/screens/ContinueRegistration";
import Background from "./app/src/CustomComponents/Background";
import Animated from "react-native-reanimated";
import UploadDocuments from "./app/src/screens/UploadDocuments";
import BeginDocumentSubmission from "./app/src/screens/BeginDocumentSubmission";
import EligibiltyCheck from "./app/src/screens/EligibiltyCheck";
import VerifyOTP from "./app/src/screens/VerifyOTP";
import PersonalDetails from "./app/src/screens/PersonalDetails";
import QuestionsAndAnswers from "./app/src/screens/QuestionsAndAnswers";
import ProductSelection from "./app/src/screens/ProductSelection";
import Login from "./app/src/screens/Login";
import Registration from "./app/src/screens/Registration";
import VerifyOTPRegister from "./app/src/screens/VerifyOTPRegister";
import ApplicationID from "./app/src/screens/ApplicationID";

import { ENDPOINT } from "./app/src/config";
import { NhostApolloProvider } from "@nhost/react-apollo";
import { NhostAuthProvider } from "@nhost/react-auth";
import { nhost } from "./app/src/utils/nhost";
import BasicAccountDetails from "./app/src/screens/BasicAccountDetails";
import TypeOfAccount from "./app/src/screens/TypeOfAccount";
import Profession from "./app/src/screens/Profession";
import ForeignTax from "./app/src/screens/ForeignTax";
import NextOfKin from "./app/src/screens/NextOfKin";
import PEP from "./app/src/screens/PEP";
import Declaration from "./app/src/screens/Declaration";
import ToC from "./app/src/screens/ToC";

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
    initialRouteName="ToC"
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
      name="Basic Account Details"
      component={BasicAccountDetails}
    />
    <NewCustomerStack.Screen
      name="Type Of Account"
      component={TypeOfAccount}
    />
    <NewCustomerStack.Screen
      name="Personal Details"
      component={PersonalDetails}
    />
    <NewCustomerStack.Screen
      name="Profession"
      component={Profession}
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
        <NewCustomerStack.Screen
      name="Foreign Tax"
      component={ForeignTax}
    />
     <NewCustomerStack.Screen
      name="Next Of Kin"
      component={NextOfKin}
    />
    <NewCustomerStack.Screen
      name="PEP"
      component={PEP}
    />
     <NewCustomerStack.Screen
      name="Declaration"
      component={Declaration}
    />
    <NewCustomerStack.Screen
      name="ToC"
      component={ToC}
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
    <NhostAuthProvider nhost={nhost}>
    <NhostApolloProvider nhost={nhost}>
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
    </NhostApolloProvider>
    </NhostAuthProvider>
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
