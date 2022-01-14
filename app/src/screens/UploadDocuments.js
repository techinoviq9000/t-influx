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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Collapse } from "native-base";

//import for the collapsible/Expandable view
import Collapsible from "react-native-collapsible";
import { boxShadow } from "styled-system";
import StepHeader from "../CustomComponents/StepsHeader";

const UploadDocuments = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

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
        )
      }}
    </Pressable>
        </Box>
        <Box alignItems="center">
          <StepHeader
            title="Upload Documents"
            step="5"
          />
        </Box>
        <Box
          backgroundColor="white"
          rounded="xl"
          roundedBottom="none"
          py={8}
          width="100%"
          flex={1}
          mt={5}
          px={6}
        >
          <ScrollView
            _contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <Box flex={1} mb={5}>
              <Text color="#317F6E" fontSize="lg" fontWeight="bold" mb={5}>
                Please Make sure you have the following documents ready.
              </Text>
              <HStack space={2}>
                <CheckIcon size="5" mt="0.5" color="emerald.500" />
                <Text color="#414141" fontSize="md" fontWeight="medium">
                  Active Mobile number & Email ID
                </Text>
              </HStack>
              <HStack space={2} mt={2}>
                <CheckIcon size="5" mt="0.5" color="emerald.500" />
                <Text color="#414141" fontSize="md" fontWeight="medium">
                  Aged 18 and Above
                </Text>
              </HStack>
              <HStack space={2} mt={2}>
                <CheckIcon size="5" mt="0.5" color="emerald.500" />
                <Text color="#414141" fontSize="md" fontWeight="medium">
                  NADRA CNIC/Passport
                </Text>
              </HStack>
              <HStack space={2} mt={2}>
                <CheckIcon size="5" mt="0.5" color="emerald.500" />
                <Text color="#414141" fontSize="md" fontWeight="medium">
                  Proof of Income
                </Text>
              </HStack>
              <HStack space={2} mt={2}>
                <CheckIcon size="5" mt="0.5" color="emerald.500" />
                <Text color="#414141" fontSize="md" fontWeight="medium">
                  Active Filer
                </Text>
              </HStack>
              <HStack space={2} mt={2}>
                <CheckIcon size="5" mt="0.5" color="emerald.500" />
                <Text color="#414141" fontSize="md" fontWeight="medium">
               Signature on White Paper
                </Text>
              </HStack>
              <HStack space={2} mt={2}>
                <CheckIcon size="5" mt="0.5" color="emerald.500" />
                <Text color="#414141" fontSize="md" fontWeight="medium">
                Zakaat Affidavit - If Applicable
                </Text>
              </HStack>
            </Box>
            <Box flex={1} justifyContent="flex-end">
              <Button
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
                  navigation.navigate("Begin Document Submission")
                }
              >
                CONFIRM
              </Button>
            </Box>
          </ScrollView>
        </Box>
      </Box>
    );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default UploadDocuments;
