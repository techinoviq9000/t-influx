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
    branchName: yup.string().required("Please select"),
    custType: yup.string().required("Please select"),
    purposeOfAcc: yup.string().required("Please select"),
    accType1: yup.string().required("Please select"),
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


  return (
    <Formik
      id="sign-in-button"
      initialValues={{ branchName: "", custType: "", purposeOfAcc: "", accType1: ""}}
      validationSchema={registerValidationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={(values) => {console.log(values); navigation.navigate("Services")}}
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
          <Box alignItems="center">
            <StepHeader
              title="Basic Account Details"
              nextTitle="Next: Services"
              step="1"
            />
          </Box>
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
                <SelectField
                  title={"Branch Name"}
                  name={"branchName"}
                  placeholder={"Select Branch Name"}
                  handleChange={handleChange("branchName")}
                  errors={errors}
                  touched={touched}
                  selectValue={["Clifton", "Tariq Road", "Bahadurabad"]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />

                <SelectField
                  title={"Customer Type"}
                  name={"custType"}
                  placeholder={"Select Type"}
                  handleChange={handleChange("custType")}
                  errors={errors}
                  touched={touched}
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
                  placeholder={"Select Purpose of Account"}
                  handleChange={handleChange("purposeOfAcc")}
                  errors={errors}
                  touched={touched}
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
                  placeholder={"Select Account Type (1)"}
                  handleChange={handleChange("accType1")}
                  errors={errors}
                  touched={touched}
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
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default BasicAccountDetails;
