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
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import React from "react";
import { StyleSheet, Easing } from "react-native";
import WelcomeScreen from "./app/src/screens/WelcomeScreen";
import GetStarted from "./app/src/screens/GetStarted";
import ContinueRegistration from "./app/src/screens/ContinueRegistration";
import Background from "./app/src/CustomComponents/Background";
import UploadDocuments from "./app/src/screens/UploadDocuments";
import BeginDocumentSubmission from "./app/src/screens/BeginDocumentSubmission";
import EligibiltyCheck from "./app/src/screens/EligibiltyCheck";
import VerifyOTP from "./app/src/screens/VerifyOTP";
import PersonalDetails from "./app/src/screens/PersonalDetails";
import QuestionsAndAnswers from "./app/src/screens/QuestionsAndAnswers";
import ProductSelection from "./app/src/screens/ProductSelection";
import Login from "./app/src/screens/Login";
import Registration from "./app/src/screens/Registration";
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
import Services from "./app/src/screens/Services";
import Address from "./app/src/screens/Address";
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import Scanner from "./app/src/screens/Scanner";
import EndScreen from "./app/src/screens/EndScreen";
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

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const ExistingCustomerStack = createStackNavigator();
const NewCustomerStack = createSharedElementStackNavigator();

const NewCustomerStackScreen = () => (
  <NewCustomerStack.Navigator
    initialRouteName="Get Started"
    screenOptions={{
      headerShown: false,
    }}
  >
    <NewCustomerStack.Screen
      name="Get Started"
      component={GetStarted}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="Registration"
      component={Registration}
      params={"abc"}
      sharedElements={(route, otherRoute, showing) => {
        return [
          {
            id: "1",
            animation: "move",
            // resize: "none",
            // align: "right-bottom"
          },
          {
            id: "getStartedBtn1",
            animation: "fade"
          },
          {
            id: "getStartedBtn2",
            animation: "fade"
          },
          {
            id: "backButton1",
            animation: "fade-in",
            // resize: "none",
            // align: "right-bottom"
          },
          {
            id: "stepHeader",
            animation: "fade"
          },
          
        ];
      }}
      options={() => ({
        gestureEnabled: false,
        cardOverlayEnabled: false,
        transitionSpec: {
          open: {animation: "timing", config: {duration: 100, easing: Easing.inOut(Easing.ease)}},
          close: {animation: "timing", config: {duration: 100, easing: Easing.inOut(Easing.ease)}}
        },
        // cardStyleInterpolator: ({current: {progress}}) => {
        //   return {
        //     cardStyle: {
        //       opacity: progress
        //     }
        //   }
        // }
      })}
    />
    <NewCustomerStack.Screen
      name="VerifyOTP"
      component={VerifyOTP}
      sharedElements={(route, otherRoute, showing) => {
        return [
          {
            id: "backButton1",
            animation: "move",
            // resize: "none",
            // align: "right-bottom"
          },
          {
            id: "1",
            animation: "move",
            // resize: "none",
            // align: "right-bottom"
          },
          {
            id: "stepHeader",
            animation: "fade"
          },
          {
            id: "footer",
            animation: "fade"
          }
        ]
      }}
      options={{
        gestureEnabled: false,

        cardOverlayEnabled: false,
        
      }}
    />
      <NewCustomerStack.Screen
        name="Basic Account Details"
        component={BasicAccountDetails}
        options={{
          gestureEnabled: false,
          cardOverlayEnabled: false,
        }}
      />
      <NewCustomerStack.Screen
        name="Services"
        component={Services}
        options={
          {
            cardOverlayEnabled: false,

          }
        }
      />
        <NewCustomerStack.Screen
          name="Personal Details"
          component={PersonalDetails}
          options={
            {
              //...TransitionPresets.SlideFromRightIOS,
            }
          }
        />
    <NewCustomerStack.Screen
      name="Scanner"
      component={Scanner}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="Application ID Screen"
      component={ApplicationID}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="ExistingCustomer"
      component={ExistingCustomerStackScreen}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="Address"
      component={Address}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="Profession"
      component={Profession}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen name="Q/A" component={QuestionsAndAnswers} />
    <NewCustomerStack.Screen
      name="Product Selection"
      component={ProductSelection}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="Upload Documents"
      component={UploadDocuments}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="Begin Document Submission"
      component={BeginDocumentSubmission}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="Foreign Tax"
      component={ForeignTax}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="Next Of Kin"
      component={NextOfKin}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="PEP"
      component={PEP}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="Declaration"
      component={Declaration}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="ToC"
      component={ToC}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <NewCustomerStack.Screen
      name="EndScreen"
      component={EndScreen}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
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
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <ExistingCustomerStack.Screen
      name="VerifyOTP"
      component={VerifyOTP}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
    />
    <ExistingCustomerStack.Screen
      name="Continue Application"
      component={ContinueRegistration}
      options={
        {
          //...TransitionPresets.SlideFromRightIOS,
        }
      }
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
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
                />
                <Stack.Screen
                  name="RegisterRoute"
                  component={NewCustomerStackScreen}
                  options={
                    {
                      //...TransitionPresets.SlideFromRightIOS,
                    }
                  }
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
