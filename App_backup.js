import "react-native-gesture-handler"
import { StatusBar } from "expo-status-bar"
import {
  extendTheme,
  Text,
  NativeBaseProvider,
  Box,
  Center,
  Button
} from "native-base"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators
} from "@react-navigation/stack"

import { createSharedElementStackNavigator } from "react-navigation-shared-element"

import React from "react"
import { StyleSheet, Easing } from "react-native"
import WelcomeScreen from "./app/src/screens/WelcomeScreen"
import GetStarted from "./app/src/screens/GetStarted"
import ContinueRegistration from "./app/src/screens/ContinueRegistration"
import Background from "./app/src/CustomComponents/Background"
import UploadDocuments from "./app/src/screens/UploadDocuments"
import BeginDocumentSubmission from "./app/src/screens/BeginDocumentSubmission"
import EligibiltyCheck from "./app/src/screens/EligibiltyCheck"
import VerifyOTP from "./app/src/screens/VerifyOTP"
import PersonalDetails from "./app/src/screens/PersonalDetails"
import QuestionsAndAnswers from "./app/src/screens/QuestionsAndAnswers"
import ProductSelection from "./app/src/screens/ProductSelection"
import Login from "./app/src/screens/Login"
import Registration from "./app/src/screens/Registration"
import ApplicationID from "./app/src/screens/ApplicationID"

import { ENDPOINT } from "./app/src/config"
import { NhostApolloProvider } from "@nhost/react-apollo"
import { NhostAuthProvider } from "@nhost/react-auth"
import { nhost } from "./app/src/utils/nhost"
import BasicAccountDetails from "./app/src/screens/BasicAccountDetails"
import TypeOfAccount from "./app/src/screens/TypeOfAccount"
import Profession from "./app/src/screens/Profession"
import ForeignTax from "./app/src/screens/ForeignTax"
import NextOfKin from "./app/src/screens/NextOfKin"
import PEP from "./app/src/screens/PEP"
import Declaration from "./app/src/screens/Declaration"
import ToC from "./app/src/screens/ToC"
import Services from "./app/src/screens/Services"
import Address from "./app/src/screens/Address"
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import Scanner from "./app/src/screens/Scanner"
import EndScreen from "./app/src/screens/EndScreen"
import VerifyOTPLogin from "./app/src/screens/VerifyOTPLogin"
import PreviousApplications from "./app/src/screens/PreviousApplications"
import BasicAccountDetailsLogin from "./app/src/screens/LoginScreens/BasicAccountDetailsLogin"
// import Environment from "./app/src/utils/environment";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: Environment["FIREBASE_API_KEY"],
//   authDomain: Environment["FIREBASE_AUTH_DOMAIN"],
//   projectId: Environment["FIREBASE_PROJECT_ID"],
//   storageBucket: Environment["FIREBASE_STORAGE_BUCKET"],
//   messagingSenderId: Environment["FIREBASE_MESSAGING_SENDER_ID"],
//   appId: "1:475280789142:web:bbf1107f5dd5a533c27cb7",
//   measurementId: "G-ZCQLXY5PTN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

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
                <Stack.Screen
                  name="Welcome"
                  component={WelcomeScreen}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                {/* Register Route */}
                <Stack.Screen
                  name="Get Started"
                  component={GetStarted}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="Registration"
                  component={Registration}
                  // sharedElements={(route, otherRoute, showing) => {
                  //   return [
                  //     {
                  //       id: "1",
                  //       animation: "move",
                  //       // resize: "none",
                  //       // align: "right-bottom"
                  //     },
                  //     {
                  //       id: "getStartedBtn1",
                  //       animation: "fade"
                  //     },
                  //     {
                  //       id: "getStartedBtn2",
                  //       animation: "fade"
                  //     },
                  //     {
                  //       id: "backButton1",
                  //       animation: "fade-in",
                  //       // resize: "none",
                  //       // align: "right-bottom"
                  //     },
                  //     {
                  //       id: "stepHeader",
                  //       animation: "fade"
                  //     },

                  //   ];
                  // }}
                  options={() => ({
                    gestureEnabled: false,
                    cardOverlayEnabled: false,
                    transitionSpec: {
                      open: {
                        animation: "timing",
                        config: {
                          duration: 100,
                          easing: Easing.inOut(Easing.ease)
                        }
                      },
                      close: {
                        animation: "timing",
                        config: {
                          duration: 100,
                          easing: Easing.inOut(Easing.ease)
                        }
                      }
                    }
                    // cardStyleInterpolator: ({current: {progress}}) => {
                    //   return {
                    //     cardStyle: {
                    //       opacity: progress
                    //     }
                    //   }
                    // }
                  })}
                />
                <Stack.Screen
                  name="VerifyOTP"
                  component={VerifyOTP}
                  // sharedElements={(route, otherRoute, showing) => {
                  //   return [
                  //     {
                  //       id: "backButton1",
                  //       animation: "move",
                  //       // resize: "none",
                  //       // align: "right-bottom"
                  //     },
                  //     {
                  //       id: "1",
                  //       animation: "move",
                  //       // resize: "none",
                  //       // align: "right-bottom"
                  //     },
                  //     {
                  //       id: "stepHeader",
                  //       animation: "fade"
                  //     },
                  //     {
                  //       id: "footer",
                  //       animation: "fade"
                  //     }
                  //   ]
                  // }}
                  options={{
                    gestureEnabled: false,

                    cardOverlayEnabled: false
                  }}
                />
                <Stack.Screen
                  name="Basic Account Details"
                  component={BasicAccountDetails}
                  options={{
                    gestureEnabled: false,
                    cardOverlayEnabled: false
                  }}
                />
                <Stack.Screen
                  name="Services"
                  component={Services}
                  options={{
                    cardOverlayEnabled: false
                  }}
                />
                <Stack.Screen
                  name="Personal Details"
                  component={PersonalDetails}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="Scanner"
                  component={Scanner}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="Application ID Screen"
                  component={ApplicationID}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="ExistingCustomer"
                  component={ExistingCustomerStackScreen}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="Address"
                  component={Address}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="Profession"
                  component={Profession}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen name="Q/A" component={QuestionsAndAnswers} />
                <Stack.Screen
                  name="Product Selection"
                  component={ProductSelection}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="Upload Documents"
                  component={UploadDocuments}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="Begin Document Submission"
                  component={BeginDocumentSubmission}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="Foreign Tax"
                  component={ForeignTax}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="Next Of Kin"
                  component={NextOfKin}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="PEP"
                  component={PEP}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="Declaration"
                  component={Declaration}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="ToC"
                  component={ToC}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="EndScreen"
                  component={EndScreen}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />

                {/* RegisterRoute end */}

                {/* Login Screen Start */}
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                  <Stack.Screen
                    name="VerifyOTPLogin"
                    component={VerifyOTPLogin} />

                    <Stack.Screen
                    name="Previous Applications"
                    component={PreviousApplications} />
                <Stack.Screen
                  name="Continue Application"
                  component={ContinueRegistration}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                  <Stack.Screen
                  name="Basic Account Details LoginRoute"
                  component={BasicAccountDetailsLogin}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                {/* <Stack.Screen name="Q/A" component={QuestionsAndAnswers} />
                <Stack.Screen
                  name="Product Selection"
                  component={ProductSelection}
                /> */}
                {/* Login Route end */}
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
