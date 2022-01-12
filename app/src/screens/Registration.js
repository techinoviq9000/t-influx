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
import StepHeader from "../CustomComponents/StepsHeader";

import { gql, useQuery, useLazyQuery } from "@apollo/client";
import InputFields from "../CustomComponents/InputFields";

const GET_TODOS = gql`
  query MyQuery {
    users {
      display_name
    }
  }
`;

const Registration = ({ navigation }) => {
  const { data, loading } = useQuery(GET_TODOS);
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
          <StepHeader title="Registration" />
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
            <Box alignItems={{ md: "center" }}>
              {/* Mobile Number */}
              <InputFields
                // fields={fields}
                title={"Mobile Number"}
                // errors={errors}
                name={"Mobile Number"}
                placeholder={"03XX-XXXXXX"}
                // handleChange={handleChange}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              {/* CNIC NUMBER */}
              <InputFields
                // fields={fields}
                title={"CNIC Number"}
                // errors={errors}
                name={"CNIC Number"}
                placeholder={"XXXXX-XXXXXXX-X"}
                // handleChange={handleChange}
                icon={
                  <MaterialIcons name="credit-card" size={23} color="black" />
                }
              />

              {/* Email  */}
              <InputFields
                // fields={fields}
                title={"Email ID"}
                // errors={errors}
                name={"Email ID"}
                placeholder={"example@email.com"}
                // handleChange={handleChange}
                icon={<MaterialIcons name="email" size={23} color="black" />}
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
              onPress={() =>
                // navigation.goBack()
                // getUser()
                navigation.navigate("VerifyOTPRegister", { fromRegister: true })
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

export default Registration;
