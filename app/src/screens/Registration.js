import {
  Box,
  Button,
  ScrollView,
  Stack,
  Pressable,
} from "native-base";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from 'yup'

import StepHeader from "../CustomComponents/StepsHeader";

// import { gql, useQuery, useLazyQuery } from "@apollo/client";
import InputFields from "../CustomComponents/InputFields";

// const GET_APPLICANT = gql`
//   query MyQuery(
//     $email: String
//     $mobile_number: String
//     $cnic: String
//   ) {
//     applicants(
//       where: {
//         email: { _eq: $email }
//         mobile_number: { _eq: $mobile_number }
//         cnic: { _eq: $cnic }
//       }
//     ) {
//       cnic
//       email
//       id
//       mobile_number
//     }
//   }
// `;

const Registration = ({ navigation }) => {

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

  
  
    return (
      <Formik
      id="sign-in-button"
        initialValues={{ email: "example@gmail.com", mobile_number: "03332222222", cnic: "423016111121119" }}
        validationSchema={registerValidationSchema}
        onSubmit={(values) => navigation.navigate("VerifyOTPRegister", { fromRegister: true })}
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
              {/* <Text>ASD</Text> */}
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
                      // getApplicant({
                      //   variables: {
                      //     cnic: values.cnic,
                      //     email: values.email,
                      //     mobile_number: values.mobile_number,
                      //   },
                      // });
                      handleSubmit();                      
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


export default Registration;
