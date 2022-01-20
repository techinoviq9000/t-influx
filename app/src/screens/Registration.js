import {
  Box,
  Button,
  CloseIcon,
  HStack,
  Image,
  Text,
  VStack,
  ScrollView,
  Wrap,
  Stack,
  Center,
  Input,
  CheckIcon,
  Pressable,
} from "native-base";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  SafeAreaViewBase,
} from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Collapse } from "native-base";
import { Formik } from "formik";
import * as yup from 'yup'
import { getAuth, RecaptchaVerifier } from "firebase/auth";

//import for the collapsible/Expandable view
import Collapsible from "react-native-collapsible";
import { boxShadow } from "styled-system";
import StepHeader from "../CustomComponents/StepsHeader";

import { gql, useQuery, useLazyQuery } from "@apollo/client";
import InputFields from "../CustomComponents/InputFields";

const GET_APPLICANT = gql`
  query MyQuery(
    $email: String
    $mobile_number: String
    $cnic: String
  ) {
    applicants(
      where: {
        email: { _eq: $email }
        mobile_number: { _eq: $mobile_number }
        cnic: { _eq: $cnic }
      }
    ) {
      cnic
      email
      id
      mobile_number
    }
  }
`;

const Registration = ({ navigation }) => {
  const phoneNumber = "03222681575";
  const appVerifier = window.recaptchaVerifier;
  const auth = getAuth();

  const [getApplicant, { data, loading }] = useLazyQuery(GET_APPLICANT, {
    onCompleted: (data) => {
      console.log("data")
      // configureCaptcha();
    //   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    // .then((confirmationResult) => {
    //   // SMS sent. Prompt user to type the code from the message, then sign the
    //   // user in with confirmationResult.confirm(code).
    //   window.confirmationResult = confirmationResult;
    //   console.log("OTP SENT")
    //   // ...
    // }).catch((error) => {
    //   // Error; SMS not sent
    //   console.log(error)
    //   // ...
    // });
      if (data.applicants.length == 0) {
        console.log("No user found");
      } else {
        navigation.navigate("VerifyOTPRegister", { fromRegister: true });
      }
    },
  });

  const configureCaptcha = () => {
    console.log("inside captcha")
    const auth = getAuth();
    
    console.log(auth)
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("resolived")
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log(response)
        getApplicant({
          variables: {
            cnic: values.cnic,
            email: values.email,
            mobile_number: values.mobile_number,
          },
        });
      }
    }, auth);

  }
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  const registerValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    cnic: yup
      .string()
      .min(13, ({ min }) => `cnic must be at least ${min} characters`)
      .required('cnic is required'),
    mobile_number: yup
    .string()
    .min(11, ({ min }) => `Mobile must be at least ${min} characters`)
    .required('Mobile Number is required'),
  })

  if (!fontsLoaded) return <AppLoading />;
  else
    return (
      <Formik
      id="sign-in-button"
        initialValues={{ email: "", mobile_number: "", cnic: "" }}
        validationSchema={registerValidationSchema}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
          <Box flex={1} minHeight="100%" safeAreaTop={5}>
            <Box alignItems="flex-start" px={6} mt={6}>
              <Pressable>
                {({ isHovered, isFocused, isPressed }) => {
                  return (
                    <Ionicons
                      name="arrow-back-circle-sharp"
                      size={36}
                      color={isFocused ? "#87e3ff" : "white"}
                      onPress={
                        () => navigation.goBack()
                        // navigation.navigate("Welcome")
                      }
                    />
                  );
                }}
              </Pressable>
            </Box>
            <Box alignItems="center">
              <StepHeader title="Registration" />
            </Box>
            <Box
              backgroundColor="white"
              rounded="xl"
              roundedBottom="none"
              py={8}
              flex={1}
              // minHeight="100%"
              mt={5}
              px={6}
            >
              <ScrollView
                _contentContainerStyle={{
                  flexGrow: 1,
                }}
              >
                <Box alignItems={{ md: "center" }}>
                  {/* Mobile Number */}
                  <InputFields
                    // fields={fields}
                    title={"Mobile Number"}
                    name={"mobile_number"}
                    errors={errors}
                    touched={touched}
                    onChangeText={handleChange("mobile_number")}
                    onBlur={handleBlur("mobile_number")}
                    value={values.mobile_number}
                    placeholder={"03XX-XXXXXX"}
                    // handleChange={handleChange}
                    icon={
                      <MaterialIcons name="person" size={23} color="black" />
                    }
                  />

                  {/* CNIC NUMBER */}
                  <InputFields
                    // fields={fields}
                    title={"CNIC Number"}
                    errors={errors}
                    touched={touched}
                    name={"cnic"}
                    placeholder={"XXXXX-XXXXXXX-X"}
                    onChangeText={handleChange("cnic")}
                    onBlur={handleBlur("cnic")}
                    value={values.cnic}
                    icon={
                      <MaterialIcons
                        name="credit-card"
                        size={23}
                        color="black"
                      />
                    }
                  />

                  {/* Email  */}
                  <InputFields
                    // fields={fields}
                    title={"Email ID"}
                    errors={errors}
                    touched={touched}
                    name={"email"}
                    placeholder={"example@email.com"}
                    // handleChange={handleChange}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    icon={
                      <MaterialIcons name="email" size={23} color="black" />
                    }
                  />
                </Box>
              </ScrollView>
            </Box>
            <Box justifyContent="flex-end">
              <Stack backgroundColor="#f7f7f7" p={5} direction="row" space={5}>
                <Button
                  flex={1}
                  size="md"
                  rounded="md"
                  backgroundColor="#f7f7f7"
                  border={1}
                  borderWidth="1"
                  borderColor="#f7f7f7"
                  _text={{
                    color: "#13B995",
                  }}
                  //mb={25}
                  // shadow={5}
                  onPress={() =>
                    // navigation.goBack()
                    navigation.navigate("VerifyOTP")
                  }
                >
                  I NEED HELP
                </Button>
                {/* <Box id="sign-in-button"/> */}
                <Button
                  flex={1}
                  size="md"
                  rounded="md"
                  backgroundColor="#317F6E"
                  border={1}
                  borderWidth="1"
                  borderColor="white"
                  onPress={
                    () => {
                      handleSubmit();
                      configureCaptcha();
                    }
                    
                    // navigation.goBack()
                    // getUser()

                    // navigation.navigate("VerifyOTPRegister", { fromRegister: true })
                  }
                >
                  CONFIRM
                </Button>
              </Stack>
            </Box>
          </Box>
        )}
      </Formik>
    );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default Registration;
