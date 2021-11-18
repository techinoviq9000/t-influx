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

const VerifyOTP = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  const [list, setList] = useState([
    {
      id: 0,
      title: "First Name",
      status: true,
      description: "CNIC junaid.png",
    },
    {
      id: 1,
      title: "Proof Of Income",
      status: true,
      description: "proof of income.pdf",
    },
    {
      id: 2,
      title: "Active Filer Certificate",
      status: false,
      description: "certificte.pdf",
    },
  ]);

  const Uploader = ({
    id,
    title,
    status,
    description,
    collapsed,
    toggleExpanded,
  }) => {
    return (
      <Stack
        direction="row"
        alignItems="center"
        p={3}
        backgroundColor="white"
        borderColor="#13B995"
        borderRadius="lg"
        borderWidth={1}
        shadow={4}
        mb={4}
      >
        <Box flex={1}>
          <Text color="#13B995">{title}</Text>
          <Text color="#565656">{description}</Text>
        </Box>
        <Box alignItems="flex-end">
          <MaterialIcons name="file-upload" size={24} color="blue" />
        </Box>
      </Stack>
    );
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
                Verify OTP
              </Text>
              <Text
                fontSize="xl"
                color="#ccc"
                fontWeight="medium"
                lineHeight="xs"
                mt={2}
              >
                Next: Personal Details
              </Text>
            </Box>
            <Center
              borderColor="#a6dfd2"
              borderWidth="6"
              borderRadius="full"
              height="20"
              width="20"
            >
              <Text color="white">2 of 5</Text>
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
              <Stack
                direction="row"
                space={5}
                flex={1}
                justifyContent="center"
                mt={2}
                mb={5}
              >
                <Box
                  py={5}
                  px={6}
                  backgroundColor="white"
                  borderColor="#13B995"
                  borderRadius="lg"
                  borderWidth={1}
                  shadow={4}
                  mb={4}
                >
                  <Input variant="unstyled" size="xl" p={0} color="black" width="5" maxLength={1} fontSize="4xl" keyboardType='numeric' />
                  {/* <Text fontSize="4xl" opacity="0" fontWeight="bold">
                    6
                  </Text> */}
                </Box>
                <Box
                  py={5}
                  px={6}
                  backgroundColor="white"
                  // borderColor="#13B995"
                  borderRadius="lg"
                  // borderWidth={1}
                  shadow={4}
                  mb={4}
                >
                  <Input variant="unstyled" size="xl" p={0} color="black" width="5" maxLength={1} fontSize="4xl" keyboardType='numeric' />
                  {/* <Text fontSize="4xl" opacity="0" fontWeight="bold">
                    6
                  </Text> */}
                </Box>
                <Box
                  py={5}
                  px={6}
                  backgroundColor="white"
                  // borderColor="#13B995"
                  borderRadius="lg"
                  // borderWidth={1}
                  shadow={4}
                  mb={4}
                >
                  <Input variant="unstyled" size="xl" p={0} color="black" width="5" maxLength={1} fontSize="4xl" keyboardType='numeric' />
                  {/* <Text fontSize="4xl" opacity="0" fontWeight="bold">
                    6
                  </Text> */}
                </Box>
                <Box
                  py={5}
                  px={6}
                  backgroundColor="white"
                  // borderColor="#13B995"
                  borderRadius="lg"
                  // borderWidth={1}
                  shadow={4}
                  mb={4}
                >
                  <Input variant="unstyled" size="xl" p={0} color="black" width="5" maxLength={1} fontSize="4xl" keyboardType='numeric' />
                  {/* <Text fontSize="4xl" opacity="0" fontWeight="bold">
                    6
                  </Text> */}
                </Box>
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
                navigation.navigate("Personal Details")
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
                navigation.navigate("Personal Details")
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
