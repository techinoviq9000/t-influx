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
  Checkbox,
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

const ToC = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  const [value, setValue] = React.useState("one");
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

  if (!fontsLoaded) return <AppLoading />;
  else
    return (
      <Box flex={1} minHeight="100%" safeAreaTop={5}>
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
        <Box alignItems="center">
          <StepHeader
            title="Terms and Conditons"
            // nextTitle="Next: Terms and Conditons"
            step="10"
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
              <ScrollView
                maxHeight="150px"
                mb={10}
                _contentContainerStyle={{
                  px: "20px",
                  py: "10px",
                  backgroundColor: "#eee",
                  // mb: "5",
                  minW: "72",
                }}
              >
                <Text>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                  quia voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur magni dolores eos qui ratione voluptatem sequi
                  nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                  dolor sit amet, consectetur, adipisci velit, sed quia non
                  numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
                  nostrum exercitationem ullam corporis suscipit laboriosam,
                  nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum
                  iure reprehenderit qui in ea voluptate velit esse quam nihil
                  molestiae consequatur, vel illum qui dolorem eum fugiat quo
                  voluptas nulla pariatur?
                </Text>
              </ScrollView>
              <Text color={"#13B995"} zIndex={10} pb={2}>
              1. I / We hereby confirm that the information provided above is true and accurate to my / our information

              </Text>
              <Text color={"#13B995"} zIndex={10} pb={2}>
              2. I / We hereby provide my online digital consent for account opening with T-Influx and authorize the usage of the information and documentation provided for due diligence and sharing with CDC (as applicable).

              </Text>
              <Text color={"#13B995"} zIndex={10} pb={2}>
              3. The bank reserves the right to request me / us to furnish the source of funds and provide requisite documentation to validate the origination of funds and its respective usage

              </Text>
              <Text color={"#13B995"} zIndex={10} pb={2}>
              4. I / We hereby authorize T-Influx to contact me / us for any further information as may be required by the bank from time to time.

              </Text>
              <Text color={"#13B995"} zIndex={10} pb={2}>
              5. I / We hereby acknowledge that I / we have read and understood the Declaration, Key Fact Statement (KFS) of the Liability Products (available on the Website), the Terms and Conditions as may be amended from time to time along with the statements above. The submission of this Digital Account Opening Application will be as per T-Influx’s Privacy Policy available on the website.

              </Text>

              <Checkbox value="one" accessibilityLabel="This is a dummy checkbox">I / we hereby agree to the terms and conditions and declarations appended above
</Checkbox>
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
                  navigation.navigate("PEP")
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

export default ToC;
