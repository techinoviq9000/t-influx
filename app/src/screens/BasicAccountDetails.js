import { Box, Button, ScrollView, Stack, Pressable } from "native-base";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import InputFields from "../CustomComponents/InputFields";
import StepHeader from "../CustomComponents/StepsHeader";
import { Formik } from "formik";
import * as yup from "yup";
import SelectField from "../CustomComponents/SelectField";
import { SharedElement } from "react-navigation-shared-element";
import {  Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const BasicAccountDetails = ({ route, navigation }) => {
  const mountedAnimation = React.useRef(new Animated.Value(0)).current
  const translateX = React.useRef(new Animated.Value(500)).current
  const data = route?.params?.data?.applicants[0]
  const registerValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    branchName: yup.string().required("Please select"),
    custRel: yup.string().required("Please select"),
    purposeOfAcc: yup.string().required("Please select"),
    accType1: yup.string().required("Please select")
  });

    
  const translationX = (toValue, delay) => {
    Animated.timing(translateX, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true 
    }).start()
}

const animateBack = () => {
    translationX(500, 500, 0)
};

useFocusEffect(
  React.useCallback(() => {
    Animated.parallel([
      translationX(0, 50),
    ]).start()
  }, [])
);

  return (
    <Formik
      id="sign-in-button"
      initialValues={{ email: data?.email, branchName: "2", custRel: "2", purposeOfAcc: "2", accType1: "2"}}
      validationSchema={registerValidationSchema}
      onSubmit={(values) => navigation.navigate("Services")}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <Box flex={1} minHeight="100%" safeAreaTop={10}>
          {/* <Box alignItems="flex-start" px={6} mt={6}>
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
          </Box> */}
          <SharedElement id="stepHeader">
          <Box alignItems="center">
            <StepHeader
              title="Basic Account Details"
              nextTitle="Next: Services"
              step="1"
            />
          </Box>
          </SharedElement>
          <SharedElement id="1" style={{flex: 1}}>
          <Box
            backgroundColor="white"
            rounded="xl"
            roundedBottom="none"
            pt={8}
            flex={1}
            // minHeight="100%"
            mt={5}
          >
            <ScrollView
              _contentContainerStyle={{
                flexGrow: 1,
                px: 6,
                pb: 8,
              }}
            >
              <Animated.View style={{transform:[{translateX}]}}>
                {/* City name */}

                <InputFields
                  title={"Email"}
                  name={"email"}
                  errors={errors}
                  touched={touched}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder={"example@email.com"}
                  icon={<MaterialIcons name="email" size={23} color="black" />}
                />
                <SelectField
                  title={"Branch Name"}
                  name={"branchName"}
                  handleChange={handleChange("branchName")}
                  errors={errors}
                  touched={touched}
                  placeholder={"Select Branch Name"}
                  selectValue={["Area Names"]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />

                <SelectField
                  title={"Customer's Relationship"}
                  name={"custRel"}
                  handleChange={handleChange("custRel")}
                  errors={errors}
                  touched={touched}
                  placeholder={"Select Relationship"}
                  selectValue={[
                    "Individual (Single)",
                    "Joint (Either/Survivor)",
                    "Minor (Joint)",
                  ]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />

                <SelectField
                  title={"Purpose of Account"}
                  name={"purposeOfAcc"}
                  handleChange={handleChange("purposeOfAcc")}
                  errors={errors}
                  touched={touched}
                  placeholder={"Select Purpose of Account"}
                  selectValue={[
                    "Salary Transfer",
                    "Savings",
                    "Business",
                    "Consumer Loans",
                    "Investment",
                    "Others",
                  ]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />

                <SelectField
                  title={"Account Type (1)"}
                  name={"accType1"}
                  handleChange={handleChange("accType1")}
                  errors={errors}
                  touched={touched}
                  placeholder={"Select Account Type (1)"}
                  selectValue={[
                    "PKR Current Account",
                    "PKR Savings Account (Monthly)",
                    "USD Current Account",
                    "USD Savings Account (Monthly)",
                    "AED Current Account",
                    "AED Savings Account (Monthly)",
                    "Euro Current Account",
                    "Euro Savings Account (Monthly)",
                    "SAR Current Account",
                    "SAR Savings Account (Monthly)",
                    "GBP Current Account",
                    "GBP Savings Account (Monthly)",
                  ]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />

                {/* Account Type (2)
                 <SelectField

                  title={"Account Type (2)"}
                  name={"accType2"}
                  placeholder={"Select Account Type (2)"}
                  handleChange={handleChange}
                  selectValue={[
                    "PKR Current Account",
                    "PKR Savings Account (Monthly)",
                    "USD Current Account",
                    "USD Savings Account (Monthly)",
                    "AED Current Account",
                    "AED Savings Account (Monthly)",
                    "Euro Current Account",
                    "Euro Savings Account (Monthly)",
                    "SAR Current Account",
                    "SAR Savings Account (Monthly)",
                    "GBP Current Account",
                    "GBP Savings Account (Monthly)"
                  ]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                /> */}

                {/* Account Type (3) */}
                {/* <SelectField

                  title={"Account Type (3)"}
                  name={"accType3"}
                  placeholder={"Select Account Type (3)"}
                  handleChange={handleChange}
                  selectValue={[
                    "PKR Current Account",
                    "PKR Savings Account (Monthly)",
                    "USD Current Account",
                    "USD Savings Account (Monthly)",
                    "AED Current Account",
                    "AED Savings Account (Monthly)",
                    "Euro Current Account",
                    "Euro Savings Account (Monthly)",
                    "SAR Current Account",
                    "SAR Savings Account (Monthly)",
                    "GBP Current Account",
                    "GBP Savings Account (Monthly)"
                  ]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                /> */}
              </Animated.View>
            </ScrollView>
          </Box>
          </SharedElement>
          <Box justifyContent="flex-end">
          <SharedElement id="footer">
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
                  navigation.navigate("Welcome")
                }
              >
                SAVE & EXIT
              </Button>
              <Button
                flex={1}
                size="md"
                rounded="md"
                backgroundColor="#317F6E"
                border={1}
                borderWidth="1"
                borderColor="white"
                //mb={25}
                // shadow={5}
                onPress={
                  () =>
                    // navigation.goBack()
                    // navigation.navigate("Services")
                  handleSubmit()
                }
              >
                CONFIRM
              </Button>
            </Stack>
            </SharedElement>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default BasicAccountDetails;
