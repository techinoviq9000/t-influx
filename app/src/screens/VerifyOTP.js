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
} from "native-base";
import React, { useRef, useState } from "react";
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

//import for the collapsible/Expandable view
import Collapsible from "react-native-collapsible";
import { boxShadow } from "styled-system";
import OtpFields from "../CustomComponents/OtpFields";
import StepHeader from "../CustomComponents/StepsHeader";

const VerifyOTP = ({ route, navigation }) => {
  console.log(route.params)
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  const [otp, setOtp] = useState([
    {
      id: 0,
      value: "",
    },
    {
      id: 1,
      value: "",
    },
    {
      id: 2,
      value: "",
    },
    {
      id: 3,
      value: "",
    },
  ]);

  const firstOTP = useRef();
  const secondOTP = useRef();
  const thirdOTP = useRef();
  const fourthOTP = useRef();

  const otpArrayFields = [firstOTP, secondOTP, thirdOTP, fourthOTP];

  const handleChange = (inputValue, id, secondRef) => {
    setOtp(
      otp.map((item) => {
        if (item.id == id) {
          return { ...item, value: inputValue };
        } else {
          return { ...item };
        }
      })
    );
    if (inputValue.length == 1) {
      secondRef?.current.focus();
    }
  };
  let finalOTP = otp.map((otpItem) => otpItem.value).join("");

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
          {route.params.fromLogin ? <StepHeader title="Verify OTP" /> : 
          <StepHeader
            title="Verify OTP"
            nextTitle="Next: Personal Details"
            step="2"
          />}
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
            keyboardShouldPersistTaps="never"
          >
            <Box>
              <Stack
                direction="row"
                space={5}
                flex={1}
                justifyContent="center"
                mt={2}
                mb={5}
              >
                {otpArrayFields.map((item, index) => {
                  const nextRef = otpArrayFields[index + 1];
                  if (nextRef) {
                    return (
                      <OtpFields
                        otpRef={item}
                        secondRef={nextRef}
                        otp={otp}
                        handleChange={handleChange}
                        key={index}
                        index={index}
                      />
                    );
                  }
                })}
                {/* <Input
                  ref={firstOTP}
                  returnKeyType="next"
                  onSubmitEditing={() => {secondOTP.current.focus()}}
                  variant="unstyled"
                  value={otp[0].value}
                  onChange={(e) => handleChange(e.nativeEvent.text, otp[0].id, secondOTP)}
                  size="xl"
                  py={5}
                  // px={6}
                  textAlign="center"
                  borderColor={otp[0].value ? "#13B995" : "white"}
                  backgroundColor="white"
                  borderRadius="lg"
                  borderWidth={1}
                  color="black"
                  width={16}
                  shadow={4}
                  mb={4}
                  maxLength={1}
                  fontSize="4xl"
                  keyboardType="numeric"
                  type="text"
                  _focus={{
                    borderColor: "#13B995",
                  }}
                />
                <Input
                 ref={secondOTP}
                 returnKeyType="next"
                 onSubmitEditing={() => {thirdOTP.current.focus()}}
                  variant="unstyled"
                  value={otp[1].value}
                  onChange={(e) => handleChange(e.nativeEvent.text, otp[1].id, secondOTP, thirdOTP)}
                  size="xl"
                  py={5}
                  // px={6}
                  textAlign="center"
                  borderColor={otp[1].value ? "#13B995" : "white"}
                  backgroundColor="white"
                  borderRadius="lg"
                  borderWidth={1}
                  color="black"
                  width={16}
                  shadow={4}
                  mb={4}
                  maxLength={1}
                  fontSize="4xl"
                  keyboardType="numeric"
                  type="text"
                  _focus={{
                    borderColor: "#13B995",
                  }}
                />
                <Input
                ref={thirdOTP}
                returnKeyType="next"
                onSubmitEditing={() => {fourthOTP.current.focus()}}
                  variant="unstyled"
                  value={otp[2].value}
                  onChange={(e) => handleChange(e.nativeEvent.text, otp[2].id, thirdOTP, fourthOTP)}
                  size="xl"
                  py={5}
                  // px={6}
                  textAlign="center"
                  borderColor={otp[2].value ? "#13B995" : "white"}
                  backgroundColor="white"
                  borderRadius="lg"
                  borderWidth={1}
                  color="black"
                  width={16}
                  shadow={4}
                  mb={4}
                  maxLength={1}
                  fontSize="4xl"
                  keyboardType="numeric"
                  type="text"
                  _focus={{
                    borderColor: "#13B995",
                  }}
                /> */}
                <Input
                  ref={fourthOTP}
                  variant="unstyled"
                  value={otp[3].value}
                  onChange={(e) => handleChange(e.nativeEvent.text, otp[3].id)}
                  size="xl"
                  py={5}
                  // px={6}
                  textAlign="center"
                  borderColor={otp[3].value ? "#13B995" : "white"}
                  backgroundColor="white"
                  borderRadius="lg"
                  borderWidth={1}
                  color="black"
                  width={16}
                  shadow={4}
                  mb={4}
                  maxLength={1}
                  fontSize="4xl"
                  keyboardType="numeric"
                  type="text"
                  _focus={{
                    borderColor: "#13B995",
                  }}
                />
              </Stack>
              <Box>
                <Text color="#13B995" fontSize="lg" textAlign="center">
                  The OTP has been sent on your registered mobile number
                  +92********75
                </Text>
                <Text
                  color="red.500"
                  fontSize="lg"
                  fontWeight="bold"
                  textAlign="center"
                >
                  OOPS! THE OTP SEEMS TO BE INCORRECT
                </Text>
                <Text
                  color="red.500"
                  fontSize="lg"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {finalOTP}
                </Text>
              </Box>
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
                navigation.navigate("Continue Application")
              }
            >
              RESEND OTP
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
                navigation.navigate("Continue Application")
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

export default VerifyOTP;
