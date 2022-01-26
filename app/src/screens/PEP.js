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
  Switch,
  Collapse,
} from "native-base";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  SafeAreaViewBase,
  Platform,
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
import StepHeader from "../CustomComponents/StepsHeader";
import SelectField from "../CustomComponents/SelectField";

const PEP = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  const [pep, setpep] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [fields, setFields] = useState({
    firstName: "",
    firstNameActive: false,
    lastName: "",
    lastNameActive: false,
    email: "",
    emailActive: false,
    dob: "12/09/2021",
    dobActive: false,
    phone: "",
    phoneActive: false,
  });

  const addDate = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fieldsCopy = fields;
    fieldsCopy.dob = fDate;
    fieldsCopy.dobActive = true;
    setFields({ ...fieldsCopy });
    handleValidation();
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const [errors, setErrors] = useState({});

  const handleValidation = () => {
    //First Name
    if (fields.firstNameActive) {
      if (fields.firstName === "") {
        errors.firstName = "Cannot be empty";
      } else if (!fields.firstName.match(/^[a-zA-Z\s]+$/)) {
        errors.firstName = "Only letters are allowed";
      } else {
        errors.firstName = null;
      }
    }

    //Last Name
    if (fields.lastNameActive) {
      if (fields.lastName === "") {
        errors.lastName = "Cannot be empty";
      } else if (!fields.lastName.match(/^[a-zA-Z\s]+$/)) {
        errors.lastName = "Only letters are allowed";
      } else {
        errors.lastName = null;
      }
    }

    //DOB
    if (fields.dobActive) {
      if (fields.dob === "") {
        errors.dob = "Cannot be empty";
      } else {
        errors.dob = null;
      }
    }

    //phone
    if (fields.phoneActive) {
      if (fields.phone === "") {
        errors.phone = "Cannot be empty";
      } else if (!fields.phone.match(/^[0-9]*$/)) {
        errors.phone = "Only numbers";
      } else {
        errors.phone = null;
      }
    }

    //Email
    if (fields.emailActive) {
      if (fields.email === "") {
        errors.email = "Cannot be empty";
      } else {
        let lastAtPos = fields.email.lastIndexOf("@");
        let lastDotPos = fields.email.lastIndexOf(".");

        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            fields.email.indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            fields.email.length - lastDotPos > 2
          )
        ) {
          errors.email = "Email is not valid";
        } else {
          errors.email = null;
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
    handleValidation();
  };

  if (!fontsLoaded) return <AppLoading />;
  else
    return (
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
          <StepHeader
            title="Politically Exposed Persons (PEP)"
            nextTitle="Next: Declaration of beneficial Owner"
            step="8"
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
            <Box>
              <Text mt={2} mb={2} fontSize={"sm"} fontWeight={"medium"}>
                Please select YES if you hold any of the following position(s)
                OR if you are related (Spouse, Parent, Siblings, children, Grand
                Parents, grandchildren, in-laws or any other person closely
                associated) to someone holding any of the following position(s):
              </Text>
              <HStack alignItems="center" space={2}>
                <Text color={pep ? "black" : "#13B995"}>No</Text>
                <Switch
                  size="sm"
                  mb={0}
                  isChecked={pep}
                  onToggle={() => {
                    setpep(!pep);
                  }}
                />
                <Text color={pep ? "#13B995" : "black"}>Yes</Text>
              </HStack>

              <InputFields
                fields={fields}
                title={"Position"}
                errors={errors}
                name={"firstName"}
                placeholder={"1) Senior Government Offical"}
                handleChange={handleChange}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />
              <InputFields
                fields={fields}
                title={"Name of the person"}
                errors={errors}
                name={"firstName"}
                placeholder={"Name of the person"}
                handleChange={handleChange}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />
              <InputFields
                fields={fields}
                title={"Your Relationship with the person"}
                errors={errors}
                name={"firstName"}
                placeholder={"Your Relationship with the person"}
                handleChange={handleChange}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />
              <Stack direction="row" width={{base: "100%", md: "md"}} mt={4} alignItems="center" flex={1} >
                <Text flex={1} >Click here to view more details about PEP</Text>
                <Box>
                  <Ionicons
                    name={`chevron-${collapsed ? "up" : "down"}-circle-outline`}
                    size={24}
                    color="#13b995"
                    onPress={() => setCollapsed(!collapsed)}
                  />
                </Box>
              </Stack>
              <Collapse isOpen={collapsed}>
                <Text pl={3} mt={2} color={"#13B995"} zIndex={10} pb={2}>
                  A Politcally Exposed Persons (PEP) means:
                </Text>
                <Text pl={3} color={"#13B995"} zIndex={10} pb={2}>
                  1) Government Official in Grade 21 or above; OR Heads OR
                  Senior Executive of the state owned corporations / departments
                  / autonomous bodies.
                </Text>
                <Text pl={3} color={"#13B995"} zIndex={10} pb={2}>
                  2) Judge of a High Court, Supreme Court or any other
                  equivalent court OR Maj. General or equivalent in Army or
                  equivalent ranks in other armed forces.
                </Text>
                <Text pl={3} color={"#13B995"} zIndex={10} pb={2}>
                  3) Members of National/Provincial Assemblies & Senate, Head of
                  State or of Government, Provincial Governors, Ministers,
                  Senior Politicians, Important Political Party Officials
                </Text>
                <Text pl={3} color={"#13B995"} zIndex={10} pb={2}>
                  4) Linked to the Beneficial ownership of a legal person /
                  legal arrangement which is known to have been set up for the
                  benefit of a PEP
                </Text>
                <Text pl={3} color={"#13B995"} zIndex={10} pb={2}>
                  5) Joint beneficial ownership of a legal person / legal
                  arrangement or any other close business relations with a PEP
                </Text>
              </Collapse>
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
              onPress={
                () =>
                  // navigation.goBack()
                  navigation.navigate("Declaration")
                // submitForm()
              }
            >
              CONFIRM
            </Button>
          </Stack>
        </Box>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="default"
            onChange={addDate}
          />
        )}
      </Box>
    );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default PEP;
