import {
  Box,
  Button,
  Text,
  ScrollView,
  Stack,
  Pressable,
  Divider,
} from "native-base";
import React, { useState } from "react";
import {
  StyleSheet,
  Animated,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import { Ionicons } from "@expo/vector-icons";
import {
  MaterialIcons,
} from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";

import InputFields from "../CustomComponents/InputFields";
import StepHeader from "../CustomComponents/StepsHeader";
import SelectField from "../CustomComponents/SelectField";
import { useFocusEffect } from "@react-navigation/native";

const PersonalDetails = ({ navigation }) => {
  const translateX = React.useRef(new Animated.Value(500)).current

  const registerValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is Requried"),
      motherName: yup.string().required("Mother Name is Requried"),
      placeOfBirth: yup.string().required("Place of Birth is Requried"),
      nationality: yup.string().required("Nationalilty is Requried"),
      mailingAddress: yup.string().required("Mailing Address is Required"),
      permanantAddress: yup.string().required("Permanant Address is Requried"),
      postalCommunication: yup.string().required("Postal Communication is Requried")
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
    validateOnChange={false}
    initialValues={{ motherName: "", name: "", placeOfBirth: "", nationality: "", mailingAddress: "", permanantAddress: "",  postalCommunication: ""}}
    validationSchema={registerValidationSchema}
    onSubmit={(values) => navigation.navigate("Begin Document Submission")}
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
    <Box flex={1} minHeight="100%" safeAreaTop={5}>
      <Box alignItems="flex-start" px={6} mt={6}>
      <SharedElement id="backButton1">
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
        </SharedElement>
      </Box>
      <SharedElement id="stepHeader">
      <Box alignItems="center">
        <StepHeader
          title="Personal Details"
          nextTitle="Next: Upload Documents"
          step="3"
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
            {/* First name */}
            <InputFields
              title={"Customer Name as per CNIC"}
              name={"name"}
              placeholder={"Customer Name as per CNIC"}
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              errors={errors}
              touched={touched}
              isValid={isValid}
              icon={<MaterialIcons name="person" size={23} color="black" />}
            />

            {/* last name */}
            <InputFields
              title={"Mother's Maiden name"}
              name={"motherName"}
              placeholder={"Mother's Maiden name"}
              value={values.motherName}
              onChangeText={handleChange("motherName")}
              onBlur={handleBlur("motherName")}
              errors={errors}
              touched={touched}
              isValid={isValid}
              icon={<MaterialIcons name="person" size={23} color="black" />}
            />


            <SelectField
              title={"Place of Birth"}
              name={"placeOfBirth"}
              placeholder={"Place of Birth"}
              handleChange={handleChange("placeOfBirth")}
              errors={errors}
              touched={touched}
              selectValue={[
                "Pakistan",
                "United Arab Emirates",
                "India",
                "America",
              ]}
              icon={<MaterialIcons name="person" size={23} color="black" />}
            />

            <SelectField
              title={"Other Nationality if any"}
              name={"nationality"}
              placeholder={"Other Nationality if any"}
              handleChange={handleChange("nationality")}
              errors={errors}
              touched={touched}
              selectValue={["United Arab Emirates", "India", "America", "None"]}
              icon={<MaterialIcons name="person" size={23} color="black" />}
            />
            <Divider mt="4" mb="2" bgColor="#c7c7c7" />
            <Text fontSize="2xl" fontWeight="bold">
              Address
            </Text>
            <InputFields
              title={"Residence/ Correspondence (Mailing) Address"}
              name={"mailingAddress"}
              placeholder={"Residence/ Correspondence (Mailing) Address"}
              value={values.mailingAddress}
              onChangeText={handleChange("mailingAddress")}
              onBlur={handleBlur("mailingAddress")}
              errors={errors}
              touched={touched}
              isValid={isValid}
              icon={<MaterialIcons name="person" size={23} color="black" />}
            />

            <InputFields
              title={"Permanant Address"}
              name={"permanantAddress"}
              placeholder={"Permanant Address"}
              value={values.permanantAddress}
              onChangeText={handleChange("permanantAddress")}
              onBlur={handleBlur("permanantAddress")}
              errors={errors}
              touched={touched}
              isValid={isValid}
              icon={<MaterialIcons name="person" size={23} color="black" />}
            />

            <SelectField

              title={"Preferred Postal Communication"}
              name={"postalCommunication"}
              placeholder={"Preferred Postal Communication"}
              handleChange={handleChange("postalCommunication")}
              touched={touched}
              errors={errors}
              selectValue={["Residence Address", "Permanent Address"]}
              icon={<MaterialIcons name="person" size={23} color="black" />}
            />
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
              navigation.navigate("VerifyOTP")
            }
          >
            I NEED HELP
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
                // navigation.navigate("Upload Documents"
                
              // submitForm()
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default PersonalDetails;
