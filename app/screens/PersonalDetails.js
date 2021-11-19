import {
  Box,
  Button,
  CheckIcon,
  HStack,
  Image,
  Text,
  VStack,
  ScrollView,
  Wrap,
  Stack,
  Center,
  Input,
  Pressable,
  CloseIcon,
  FormControl,
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
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import InputFields from "../CustomComponents/InputFields";

const PersonalDetails = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  const [fields, setFields] = useState({
    firstName: "",
    firstNameActive: false,
    lastName: "",
    lastNameActive: false,
    email: "",
    emailActive: false,
    dob: "",
    dobActive: false,
    phone: "",
    phoneActive: false,
  });


  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    //First Name
    if (fields.firstNameActive) {
      if (fields.firstName === "") {
        errors["firstName"] = "Cannot be empty";
      } else if (!fields["firstName"].match(/^[a-zA-Z\s]+$/)) {
        errors["firstName"] = "Only letters are allowed";
      } else {
        errors["firstName"] = null;
      }
    }

    //Last Name
    if (fields.lastNameActive) {
      if (fields.lastName === "") {
        errors["lastName"] = "Cannot be empty";
      } else if (!fields["lastName"].match(/^[a-zA-Z\s]+$/)) {
        errors["lastName"] = "Only letters are allowed";
      } else {
        errors["lastName"] = null;
      }
    }

    //DOB
    if (fields.dobActive) {
      if (fields.dob === "") {
        errors["dob"] = "Cannot be empty";
      } else if (!fields["dob"].match(/^[a-zA-Z\s]+$/)) {
        errors["dob"] = "Only letters";
      } else {
        errors["dob"] = null;
      }
    }

    //phone
    if (fields.phoneActive) {
      if (fields.phone === "") {
        errors["phone"] = "Cannot be empty";
      } else if (!fields["phone"].match(/^[0-9]*$/)) {
        errors["phone"] = "Only numbers";
      } else {
        errors["phone"] = null;
      }
    }

    //Email
    if (fields.emailActive) {
      if (fields.email === "") {
        errors["email"] = "Cannot be empty";
      } else {
        let lastAtPos = fields["email"].lastIndexOf("@");
        let lastDotPos = fields["email"].lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            fields["email"].indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            fields["email"].length - lastDotPos > 2
          )
        ) {
          errors["email"] = "Email is not valid";
        } else {
          errors["email"] = null;
        }
      }
    }
    setErrors({ ...errors });
    let formIsValid = false;
    for (var prop in errors) {
      if (errors[prop] != null) {
        formIsValid = false;
        break;
      } else {
        formIsValid = true;
      }
    }
    return formIsValid;
  };

  const submitForm = () => {
    fields.firstNameActive = true;
    fields.lastNameActive = true;
    fields.emailActive = true;
    fields.dobActive = true;
    fields.phoneActive = true;
    if (handleValidation()) {
      alert("Form submitted");
    } else {
      alert("Make sure you have filled the form correctly!");
    }
  };

  const handleChange = (field, e) => {
    let fieldsCopy = fields;
    fieldsCopy[field] = e.nativeEvent.text;
    fieldsCopy[`${field}Active`] = true;
    setFields({ ...fieldsCopy });
    console.log(handleValidation());
    console.log(errors);
  };

  if (!fontsLoaded) return <AppLoading />;
  else
    return (
      <Box flex={1} minHeight="100%" safeAreaTop={5}>
        <Box>
          <Box alignItems="flex-start" px={6} mt={6}>
            <Ionicons
              name="arrow-back-circle-sharp"
              size={36}
              color="white"
              onPress={
                () => navigation.goBack()
                // navigation.navigate("Welcome")
              }
            />
          </Box>
          <Stack direction="row" px={6} alignItems="center">
            <Box flex={1}>
              <Text
                fontSize="2xl"
                color="white"
                fontWeight="medium"
                lineHeight="xs"
                mt={2}
              >
                Personal Details
              </Text>
              <Text
                fontSize="xl"
                color="#ccc"
                fontWeight="medium"
                lineHeight="xs"
                mt={2}
              >
                Next: Questions & Answers
              </Text>
            </Box>
            <Center
              borderColor="#a6dfd2"
              borderWidth="6"
              borderRadius="full"
              height="20"
              width="20"
            >
              <Text color="white">3 of 5</Text>
            </Center>
          </Stack>
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
            <Box>
              {/* First name */}
              <InputFields
                fields={fields}
                title={"First Name"}
                errors={errors}
                name={"firstName"}
                placeholder={"Enter your first name"}
                handleChange={handleChange}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              {/* last name */}
              <InputFields
                fields={fields}
                title={"Last Name"}
                errors={errors}
                name={"lastName"}
                placeholder={"Enter your last name"}
                handleChange={handleChange}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              {/* email */}
              <InputFields
                fields={fields}
                title={"Email ID"}
                errors={errors}
                name={"email"}
                placeholder={"Enter your email id"}
                handleChange={handleChange}
                icon={
                  <MaterialIcons name="credit-card" size={23} color="black" />
                }
              />

              {/* date of birth */}
              <InputFields
                fields={fields}
                title={"Date of Birth"}
                errors={errors}
                name={"dob"}
                placeholder={"Enter your date of birth"}
                handleChange={handleChange}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              {/* phone number */}
              <InputFields
                fields={fields}
                title={"Phone number"}
                errors={errors}
                name={"phone"}
                placeholder={"Enter your phone number"}
                handleChange={handleChange}
                icon={<MaterialIcons name="person" size={23} color="black" />}
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
              onPress={() =>
                // navigation.goBack()
                // navigation.navigate("VerifyOTP")
                submitForm()
              }
            >
              CONFIRM
            </Button>
          </Stack>
        </Box>
      </Box>
    );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default PersonalDetails;
