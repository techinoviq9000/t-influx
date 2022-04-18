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
  Radio,
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

const Declaration = ({ route, navigation }) => {
  const fieldsArray = route?.params?.fields;
  const applicantData = route?.params?.applicantData;
  let applicant_id = applicantData?.applicant_id;
  const [value, setValue] = React.useState("one");
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
          title="Declaration of beneficial Owner"
          nextTitle="Next: Terms and Conditons"
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
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              value={value}
              onChange={(nextValue) => {
                setValue(nextValue);
              }}
            >
              <Radio colorScheme="emerald" value="one" my={1}>
                There is/are NO beneficial owner(s) of the account apart from
                the owner(s) of the account (i.e., accounts are operated in
                my/our behalf and not on behalf of a third party).
              </Radio>
              <Radio colorScheme="emerald" value="two" my={1}>
                There is/are a beneficial owner(s) of the account apart from the
                owner(s) of the account (i.e., accounts are operated on behalf
                of a third party whose details are as follows)
              </Radio>
            </Radio.Group>
            {value == "two" && (
              <Box>
                <InputFields
                  fields={fields}
                  title={"Full Name (as per document name)"}
                  errors={errors}
                  name={"firstName"}
                  placeholder={"Full Name (as per document name)"}
                  handleChange={handleChange}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />
                <InputFields
                  fields={fields}
                  title={"Legal ID Number"}
                  errors={errors}
                  name={"firstName"}
                  placeholder={"Legal ID Number"}
                  handleChange={handleChange}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />
                <SelectField
                  fields={fields}
                  title={"Country of Issuance"}
                  name={"purposeOfAcc"}
                  placeholder={"Select Country of Issuance"}
                  handleChange={handleChange}
                  selectValue={["List of Countries"]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />
              </Box>
            )}

            <Stack
              direction="row"
              width={{ base: "100%", md: "md" }}
              mt={4}
              alignItems="center"
              flex={1}
            >
              <Text flex={1}>Please read the Terms & Conditions</Text>
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
              <Text mt={2} mb={2} fontSize={"sm"} fontWeight={"medium"}>
                I/We undertake to give T-Influx notice of any change in what has
                been mentioned above. I/We am/are aware that submitting false
                information, including omitting/neglecting to submit updated
                information which must be declared, with the intention that no
                declaration will be made or to cause incorrect declaration to be
                made constitutes a violation of applicable regulations and I/we
                shall solely be responsible for any and all consequences thereof
              </Text>
              <Text pl={3} color={"#13B995"} zIndex={10} pb={2}>
                I / We, the owner(s) of the account, hereby declare that:
              </Text>
              <Text pl={3} color={"#13B995"} zIndex={10} pb={2}>
                a. My / our declaration relates to the account as well as to all
                other accounts maintained with T-Influx in my/our name(s) and
                which are linked to this account and also to accounts that will
                be opened in future under my/our name(s) and which will be
                linked to this account.
              </Text>
              <Text pl={3} color={"#13B995"} zIndex={10} pb={2}>
                b. My / our declaration applies only to the accounts which will
                have identical ownerships to that of the account mentioned in
                this form.
              </Text>
              <Text pl={3} color={"#13B995"} zIndex={10} pb={2}>
                c. There is/are NO beneficial owner(s) of the account apart from
                the owner(s) of the account (i.e., accounts are operated in
                my/our behalf and not on behalf of a third party).
              </Text>
              <Text pl={3} color={"#13B995"} zIndex={10} pb={2}>
                d. There is/are a beneficial owner(s) of the account apart from
                the owner(s) of the account (i.e., accounts are operated on
                behalf of a third party whose details are as follows)
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
                navigation.navigate("ToC", {
                  data: applicantData,
                  fields: fieldsArray
                })
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

export default Declaration;
