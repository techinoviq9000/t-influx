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
    Switch
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
  
  const Profession = ({ navigation }) => {
    
    const [communicateViaEmail, setcommunicateViaEmail] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
  
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
        )
      }}
    </Pressable>
          </Box>
          <Box alignItems="center">
            <StepHeader
              title="Profession / Source of Income"
              nextTitle="Next: Questions & Answers"
              step="4"
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
              <SelectField
                  fields={fields}
                  title={"Primary Occupation"}
                  name={"branchName"}
                  placeholder={"Primary Occupation"}
                  handleChange={handleChange}
                  selectValue={[
                    "Service (Salaried)",
                    "Business (Self Employed)",
                    "Student",
                    "House Wife",
                    "Retired",
                    "Others"
                  ]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />
  
                {/* email */}
                <InputFields
                  fields={fields}
                  title={"Name of Employer"}
                  errors={errors}
                  name={"email"}
                  placeholder={"Name of Employer"}
                  handleChange={handleChange}
                  icon={
                    <MaterialIcons name="credit-card" size={23} color="black" />
                  }
                />
                {/* First name */}
                <InputFields
                  fields={fields}
                  title={"Annual Income"}
                  errors={errors}
                  name={"firstName"}
                  placeholder={"Annual Income"}
                  handleChange={handleChange}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />
  
  <Text>Other Source of Income</Text>
                {/* last name */}
                
  
  <SelectField
                  fields={fields}
                  title={"Source of Income"}
                  name={"branchName"}
                  placeholder={"Source of Income"}
                  handleChange={handleChange}
                  selectValue={["Investments", "Rental", "Others"]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />
  
                {/* email */}
                <InputFields
                  fields={fields}
                  title={"Amount"}
                  errors={errors}
                  name={"email"}
                  placeholder={"Amount"}
                  handleChange={handleChange}
                  icon={
                    <MaterialIcons name="credit-card" size={23} color="black" />
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
                    navigation.navigate("Q/A")
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
  
  export default Profession;
  