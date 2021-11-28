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
          initialRouteName="Welcome"
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}/>
            <Stack.Screen name="Get Started" component={GetStarted}  options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}/>
            <Stack.Screen name="Continue Registration" component={ContinueRegistration}  options={{
          ...TransitionPresets.RevealFromBottomAndroid,
        }}/>
        <Stack.Screen name="Upload Documents" component={UploadDocuments}  options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}/>
        <Stack.Screen name="Begin Document Submission" component={BeginDocumentSubmission}  options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}/>
        <Stack.Screen name="EligibiltyCheck" component={EligibiltyCheck}  options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}/>
        <Stack.Screen name="VerifyOTP" component={VerifyOTP}  options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}/>
        <Stack.Screen name="Personal Details" component={PersonalDetails}  options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}/>
        <Stack.Screen name="Q/A" component={QuestionsAndAnswers}  options={{
          ...TransitionPresets.SlideFromRightIOS,
        }}/>
        <Stack.Screen name="Product Selection" component={ProductSelection}  options={{
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
