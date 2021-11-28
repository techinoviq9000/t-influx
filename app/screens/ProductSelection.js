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
  FontAwesome5,
} from "@expo/vector-icons";
import { Collapse } from "native-base";

//import for the collapsible/Expandable view
import Collapsible from "react-native-collapsible";
import { boxShadow } from "styled-system";
import { flushSync } from "react-dom";
import StepHeader from "../CustomComponents/StepsHeader";

const ProductSelection = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  const [plan, setPlan] = useState("startup");
  const [groupOne, setGroupOne] = useState([
    {
      id: 0,
      name: "Current Account",
      recommended: true,
      selected: false,
      icon: <FontAwesome name="bank" size={24} color="#13B995" />,
    },
    {
      id: 1,
      name: "Saving Account",
      selected: false,
      icon: <FontAwesome5 name="piggy-bank" size={24} color="#13B995" />,
    },
    {
      id: 2,
      name: "Aasaan Current Account",
      selected: false,
      icon: <MaterialIcons name="bolt" size={24} color="#13B995" />,
    },
    {
      id: 3,
      name: "FCY Account",
      selected: false,
      icon: <FontAwesome name="bank" size={24} color="#13B995" />,
    },
  ]);

  const toggleButton = (setState, currentState, id) => {
    setState(
      currentState.map((item) => {
        if (item.id == id) {
          return { ...item, selected: !item.selected };
        } else {
          return { ...item, selected: false };
        }
      })
    );
  };
  const ButtonGroup = ({ setState, currentState, toggleButton }) => {
    return (
      <Box mb={10}>
        {currentState.map(
          ({ id, name, icon, selected, recommended } = group) => (
            <Pressable onPress={() => toggleButton(setState, currentState, id)}>
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Stack
                    direction="row"
                    alignItems={`${!recommended && "center"}`}
                    py={5}
                    px={4}
                    // backgroundColor="white"
                    bg={isHovered ? "#6b968d" : "white"}
                    borderColor="#13B995"
                    borderRadius="lg"
                    borderWidth={1}
                    shadow={4}
                    mb={4}
                  >
                    <Box mr={3}>{icon}</Box>

                    <Box flex={1}>
                      <Text
                        fontSize="lg"
                        color={isHovered ? "#acfbe9" : "#414141"}
                      >
                        {name}
                      </Text>

                      {recommended && (
                        <Box mt={2}>
                          <Text>
                            Lorem ispumLorem ispumLorem ispumLorem ispumLorem
                            ispumLorem ispumLorem ispumLorem ispumLorem
                            ispumLorem ispumLorem ispum
                          </Text>
                          <Box mt={2}>
                            <HStack space={2}>
                              <Feather name="check" size={20} color="#317F6E" />
                              <Text color="#317F6E" fontSize="sm">
                                Savings Account
                              </Text>
                            </HStack>
                            <HStack space={2}>
                              <Feather name="check" size={20} color="#317F6E" />
                              <Text color="#317F6E" fontSize="sm">
                                10% APR
                              </Text>
                            </HStack>
                            <HStack space={2}>
                              <Feather name="check" size={20} color="#317F6E" />
                              <Text color="#317F6E" fontSize="sm">
                                Platinum Access
                              </Text>
                            </HStack>
                            <HStack space={2}>
                              <Feather name="check" size={20} color="#317F6E" />
                              <Text color="#317F6E" fontSize="sm">
                                Some other Feature
                              </Text>
                            </HStack>
                          </Box>
                        </Box>
                      )}
                            {/* <Box bg="#13B995" borderRadius="sm" marginRight="auto"><Text color="white" fontSize="sm" px={3} py={1}>TAG</Text></Box> */}
                    </Box>
                    <Box alignItems="flex-end">
                      {selected ? (
                        <FontAwesome
                          name="check-circle-o"
                          size={24}
                          color="#13B995"
                        />
                      ) : (
                        <FontAwesome name="circle-o" size={24} color="#aaa" />
                      )}
                    </Box>
                  </Stack>
                );
              }}
            </Pressable>
          )
        )}
      </Box>
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
          <StepHeader
            title="Choose a product that suits your needs"
            step="5"
          />
        </Box>
        <Box
          backgroundColor="transparent"
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
              <ButtonGroup
                currentState={groupOne}
                setState={setGroupOne}
                toggleButton={toggleButton}
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

export default ProductSelection;
