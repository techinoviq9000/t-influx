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

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Collapse } from "native-base";

//import for the collapsible/Expandable view
import Collapsible from "react-native-collapsible";
import { boxShadow } from "styled-system";
import StepHeader from "../CustomComponents/StepsHeader";

const ApplicationID = ({ navigation }) => {
 

  const [list, setList] = useState([
    {
      id: 0,
      title: "ID: 124ewdq32t",
      status: true,
      description: "Your application number 1",
    },
    {
      id: 1,
      title: "ID: 3dsfrq23r32af",
      status: true,
      description: "Your application number 2",
    },
    {
      id: 2,
      title: "ID: 31r8rufjwe283",
      status: false,
      description: "Your application number 3",
    }
  ]);


  console.log(list);
  const CheckList = ({
    id,
    title,
    status,
    description,
    toggleExpanded,
  }) => {
    return (
      <Stack direction="row" mb={5}>
        <Box mr={3}>
          {status ? <Ionicons name="checkmark-circle" size={36} color="#317F6E" /> :  <FontAwesome5 name="exclamation-circle" size={36} color="#ccc" />}
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
              <Box>{description}</Box>
              {!status && <Button  width={{ base: "100%", md: "sm" }} _text={{color: "emerald.300"}} borderColor="emerald.300" variant="outline" onPress={() => navigation.navigate('ExistingCustomer', { screen: 'Continue Application' })}>Continue Application</Button>}
          </VStack>
        </Box>
      </Stack>
    );
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
        )
      }}
    </Pressable>
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
                />
              ))}
            </Box>
            <Box alignItems="center">
            <Box flex={1} width={{base: "100%", md:"md"}} justifyContent="flex-end">
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
                  navigation.navigate("Basic Account Details")
                }
              >
                NEW APPLICATION
              </Button>
            </Box>
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

export default ApplicationID;
