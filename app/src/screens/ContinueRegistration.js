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

const ContinueRegistration = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  const [list, setList] = useState([
    {
      id: 0,
      title: "Eligibilty Check",
      status: true,
      description: "Candy canesasdsa ofjsa isauf njkasfiuasf asfn",
      collapsed: false,
    },
    {
      id: 1,
      title: "OTP Verification",
      status: true,
      description: "Candy canesasdsa ofjsa isauf njkasfiuasf asfn",
      collapsed: true,
    },
    {
      id: 2,
      title: "Personal Details",
      status: false,
      description: "Candy canesasdsa ofjsa isauf njkasfiuasf asfn",
      collapsed: false,
    },
    {
      id: 3,
      title: "Questions and Answers",
      status: false,
      description: "Candy canesasdsa ofjsa isauf njkasfiuasf asfn",
      collapsed: false,
    },
    {
      id: 4,
      title: "Product Selection",
      status: false,
      description: "Candy canesasdsa ofjsa isauf njkasfiuasf asfn",
      collapsed: false,
    },
  ]);

  const toggleExpanded = (id) => {
    setList(
      list.map((item) => {
        if (item.id == id) {
          return { ...item, collapsed: !item.collapsed };
        } else {
          return { ...item, collapsed: false };
        }
      })
    );
  };
  console.log(list);
  const CheckList = ({
    id,
    title,
    status,
    description,
    collapsed,
    toggleExpanded,
  }) => {
    return (
      <Stack direction="row" mb={5}>
        <Box mr={3}>
          <Ionicons name="checkmark-circle" size={36} color="#317F6E" />
        </Box>
        <Box flex={1}>
          <VStack space={1}>
            <Text
              color="#317F6E"
              fontSize="lg"
              fontWeight="bold"
              flexWrap="wrap"
            >
              {title}
            </Text>
            {status ? (
              <Text color="#13B995" fontSize="sm">
                Completed
              </Text>
            ) : (
              <Text color="#ccc" fontSize="sm">
                Pending
              </Text>
            )}
            <Collapse isOpen={collapsed}>
              <Box>{description}</Box>
            </Collapse>
          </VStack>
        </Box>
        <Box alignItems="flex-end">
          <Ionicons
            name={`chevron-${collapsed ? "up" : "down"}-circle-outline`}
            size={24}
            color="blue"
            onPress={() => toggleExpanded(id)}
          />
        </Box>
      </Stack>
    );
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
          <StepHeader title="Continue Filling Your Application" />
        </Box>

        <Box
          backgroundColor="white"
          rounded="xl"
          py={8}
          width="100%"
          roundedBottom="none"
          flex={1}
          mt={5}
          px={6}
        >
          <ScrollView
            _contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <Box flex={1}>
              {list.map((item) => (
                <CheckList
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  status={item.status}
                  description={item.description}
                  collapsed={item.collapsed}
                  toggleExpanded={toggleExpanded}
                  k
                />
              ))}
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
                  navigation.navigate("Upload Documents")
                }
              >
                CONTINUE REGISTRATION
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
