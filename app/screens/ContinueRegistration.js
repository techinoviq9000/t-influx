import {
  Box,
  Button,
  CheckIcon,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React from "react";
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

const ContinueRegistration = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  if (!fontsLoaded) return <AppLoading />;
  else
    return (
      <Box flex={1} minHeight="100%">
        <Box alignItems="flex-start" px={6}>
          <Box mt={6}>
            <Ionicons name="arrow-back-circle-sharp" size={36} color="white" onPress={() =>
              navigation.goBack()
              // navigation.navigate("Welcome")
            }/>
          </Box>
          <Text
            fontSize="2xl"
            color="white"
            fontWeight="medium"
            lineHeight="xs"
            mt={2}
          >
            Continue Filling Your Application
          </Text>
        </Box>
          <Box
            backgroundColor="white"
            rounded="xl"
            py={8}
            width="100%"
            minHeight="100%"
            mt={5}
            >
            <ScrollView _contentContainerStyle={{
              pb: 20,
              px: 6
            }}> 
            <Box flex={1}>
            <HStack space={4} mb={4}>
              <Ionicons name="checkmark-circle" size={36} color="#317F6E" />
              <VStack space={1}>
                <Text color="#317F6E" fontSize="lg" fontWeight="bold">
                  Eligibilty Check
                </Text>
                <Text color="#13B995" fontSize="sm">
                  Completed
                </Text>
              </VStack>
              <Box flex={1} alignItems="flex-end">
                <Ionicons
                  name="chevron-down-circle-outline"
                  size={24}
                  color="blue"
                />
              </Box>
            </HStack>

            <HStack space={4} mb={4}>
              <Ionicons name="checkmark-circle" size={36} color="#317F6E" />
              <VStack space={1}>
                <Text color="#317F6E" fontSize="lg" fontWeight="bold">
                  OTP Verification
                </Text>
                <Text color="#13B995" fontSize="sm">
                  Completed
                </Text>
              </VStack>
              <Box flex={1} alignItems="flex-end">
                <Ionicons
                  name="chevron-down-circle-outline"
                  size={24}
                  color="blue"
                />
              </Box>
            </HStack>

            <HStack space={4} mb={4}>
              <Ionicons name="checkmark-circle" size={36} color="#317F6E" />
              <VStack space={1}>
                <Text color="#317F6E" fontSize="lg" fontWeight="bold">
                  Personal Details
                </Text>
                <Text color="#ccc" fontSize="sm">
                  Pending
                </Text>
              </VStack>
              <Box flex={1} alignItems="flex-end">
                <Ionicons
                  name="chevron-down-circle-outline"
                  size={24}
                  color="blue"
                />
              </Box>
            </HStack>

            <HStack space={4} mb={4}>
              <Ionicons name="checkmark-circle" size={36} color="#317F6E" />
              <VStack space={1}>
                <Text color="#317F6E" fontSize="lg" fontWeight="bold">
                  Questions and Answers
                </Text>
                <Text color="#ccc" fontSize="sm">
                  Pending
                </Text>
              </VStack>
              <Box flex={1} alignItems="flex-end">
                <Ionicons
                  name="chevron-down-circle-outline"
                  size={24}
                  color="blue"
                />
              </Box>
            </HStack>

            <HStack space={4} mb={4}>
              <Ionicons name="checkmark-circle" size={36} color="#317F6E" />
              <VStack space={1}>
                <Text color="#317F6E" fontSize="lg" fontWeight="bold">
                  Product Selection
                </Text>
                <Text color="#ccc" fontSize="sm">
                  Pending
                </Text>
              </VStack>
              <Box flex={1} alignItems="flex-end">
                <Ionicons
                  name="chevron-down-circle-outline"
                  size={24}
                  color="blue"
                />
              </Box>
            </HStack>
            </Box>
            <Box flex={1} minHeight="100%">
            <Button
            size="md"
            rounded="md"
            backgroundColor="#317F6E"
            border={1}
            borderWidth="1"
            borderColor="white"
            mb={25}
            shadow={5}
            onPress={() =>
              // navigation.goBack()
              navigation.navigate("Welcome")
            }
          >
            I'M READY
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

export default ContinueRegistration;
