import {
  Box,
  Button,
  CloseIcon,
  HStack,
  Image,
  Text,
  VStack,
  ScrollView,
  Wrap,
  Stack,
  Center,
  Input,
  CheckIcon,
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Collapse } from "native-base";

//import for the collapsible/Expandable view
import Collapsible from "react-native-collapsible";
import { boxShadow } from "styled-system";

const EligibiltyCheck = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [cnic, setcnic] = useState("");
  // "#13B995"
  const getColor = (field, color) => {
    if (field?.length >= 1) {
      if (field.match(/^[A-Za-z\s]+$/)) {
        return color;
      } else {
        return "red.500";
      }
    } else {
      return color;
    }
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
                Eligibilty Check
              </Text>
              <Text
                fontSize="xl"
                color="#ccc"
                fontWeight="medium"
                lineHeight="xs"
                mt={2}
              >
                Next: OTP Verification
              </Text>
            </Box>
            <Center
              borderColor="#a6dfd2"
              borderWidth="6"
              borderRadius="full"
              height="20"
              width="20"
            >
              <Text color="white">1 of 5</Text>
            </Center>
          </Stack>
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
            <Box>
              {/* First name */}
              <Box flex={1}>
                <Text
                  ml={12}
                  pl={3}
                  position="relative"
                  top={8}
                  color={
                    getColor(firstName, "#13B995")
                  }
                >
                  First Name
                </Text>
                <Input
                  variant="unstyled"
                  size="xl"
                  placeholder="First Name"
                  color="black"
                  placeholderTextColor="#ccc"
                  value={firstName}
                  type="text"
                  onChange={(e) => setfirstName(e.nativeEvent.text)}
                  InputRightElement={
                    <>
                      {firstName?.length >= 1 ? (
                        firstName.match(/^[A-Za-z\s]+$/) ? (
                          <CheckIcon
                            size="5"
                            mt="0.5"
                            color="emerald.500"
                            mr="4"
                          />
                        ) : (
                          <CloseIcon size="5" mt="0.5" color="red.500" mr="4" />
                        )
                      ) : (
                        <></>
                      )}
                    </>
                  }
                  InputLeftElement={
                    <Box pl="5">
                      <MaterialIcons name="person" size={23} color="black" />
                    </Box>
                  }
                  pb={3}
                  pt={7}
                  px={4}
                  borderColor={
                    getColor(firstName, "#a4ffc8")
                  }
                  borderRadius="lg"
                  borderWidth={1}
                  // "#13B995"
                  _focus={{
                    borderColor: `${
                     getColor(firstName, "#13B995")
                    }`,
                  }}
                />
              </Box>

              {/* Last Name */}
              <Box flex={1}>
                <Text
                  ml={12}
                  pl={3}
                  position="relative"
                  top={8}
                  color="#13B995"
                >
                  Last Name
                </Text>
                <Input
                  variant="unstyled"
                  size="xl"
                  placeholder="Last Name"
                  color="black"
                  placeholderTextColor="#ccc"
                  // InputRightElement={
                  //   <CheckIcon size="5" mt="0.5" color="emerald.500" mr="4"/>
                  // }
                  InputLeftElement={
                    <Box pl="5">
                      <MaterialIcons name="person" size={23} color="black" />
                    </Box>
                  }
                  pb={3}
                  pt={7}
                  px={4}
                  borderColor="#a4ffc8"
                  borderRadius="lg"
                  borderWidth={1}
                  _focus={{
                    borderColor: "#13B995",
                  }}
                />
              </Box>

              {/* CNIC NUMBER */}
              <Box flex={1}>
                <Text
                  ml={12}
                  pl={3}
                  position="relative"
                  top={8}
                  color="#13B995"
                >
                  CNIC Number
                </Text>
                <Input
                  variant="unstyled"
                  size="xl"
                  placeholder="XXXXX-XXXXXXX-X"
                  color="black"
                  placeholderTextColor="#ccc"
                  InputRightElement={
                    // <CheckIcon size="5" mt="0.5" color="emerald.500" mr="4"/>
                    <></>
                  }
                  InputLeftElement={
                    <Box pl="5">
                      <MaterialIcons
                        name="credit-card"
                        size={23}
                        color="black"
                      />
                    </Box>
                  }
                  pb={3}
                  pt={7}
                  px={4}
                  borderColor="#a4ffc8"
                  borderRadius="lg"
                  borderWidth={1}
                  _focus={{
                    borderColor: "#13B995",
                  }}
                />
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
                navigation.navigate("VerifyOTP")
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

export default EligibiltyCheck;
