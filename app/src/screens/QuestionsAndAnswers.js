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

import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { Collapse } from "native-base";

//import for the collapsible/Expandable view
import Collapsible from "react-native-collapsible";
import { boxShadow } from "styled-system";
import { flushSync } from "react-dom";
import StepHeader from "../CustomComponents/StepsHeader";

const QuestionsAndAnswers = ({ navigation }) => {
 
  const [plan, setPlan] = useState("startup");
  const [groupOne, setGroupOne] = useState([
    {
      id: 0,
      name: "A",
      text: "Option A",
      selected: false,
    },
    {
      id: 1,
      name: "B",
      text: "Option B",
      selected: false,
    },
    {
      id: 2,
      name: "C",
      text: "Option C",
      selected: false,
    },
    {
      id: 3,
      name: "D",
      text: "Option D",
      selected: false,
    },
  ]);

  const [groupTwo, setGroupTwo] = useState([
    {
      id: 4,
      name: "A",
      text: "Option A",
      selected: false,
    },
    {
      id: 5,
      name: "B",
      text: "Option B",
      selected: false,
    },
    {
      id: 6,
      name: "C",
      text: "Option C",
      selected: false,
    },
    {
      id: 7,
      name: "D",
      text: "Option D",
      selected: false,
    },
  ]);

  const toggleButton = (setState, currentState, id) => {
    setState(currentState.map(item => {
      if(item.id == id) {
        return {...item, selected: !item.selected}
      } else {
        return {...item, selected: false}
      }
    }))
  };
  const ButtonGroup = ({ setState, currentState, toggleButton }) => {
    return (
      <Box mb={10}>
        {currentState.map(({ id, name, text, selected } = group) => (
          <Pressable onPress={() => toggleButton(setState, currentState, id)}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Stack
                  direction="row"
                  alignItems="center"
                  py={5}
                  px={4}
                  // backgroundColor="white"
                  bg={selected ? "#13B995" : isHovered ? "#6b968d" : "white"}
                  borderColor="#13B995"
                  borderRadius="lg"
                  borderWidth={1}
                  shadow={4}
                  mb={4}
                >
                  <Box mr={3}>
                    <Text fontSize="md" fontWeight="medium" color={selected ? "#acfbe9" : isHovered ? "#acfbe9" : "#414141"}>{name}</Text>
                  </Box>
                  <Box flex={1}>
                    <Text fontSize="md" fontWeight="medium" color={selected ? "white" : isHovered ? "white" : "#414141"}>{text}</Text>
                  </Box>
                  <Box alignItems="flex-end">
                    {selected && <CheckIcon size="5" mt="0.5" color="white" />}
                  </Box>
                </Stack>
              );
            }}
          </Pressable>
        ))}
      </Box>
    );
  };

  
  
    return (
      <Box flex={1} minHeight="100%" safeAreaTop={5}>
        <Box>
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
          <StepHeader title="Questions & Answers" nextTitle="Next: Product Selection" step="4" />
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
              pb: 8
            }}
          >
            <Box>
              <Text color="black" fontSize="xl" mb={2}>What is your yearly income?</Text>
              <ButtonGroup currentState={groupOne} setState={setGroupOne} toggleButton={toggleButton} />    
              <Text color="black" fontSize="xl" mb={2}>What is your yearly income?</Text>
              <ButtonGroup currentState={groupTwo} setState={setGroupTwo} toggleButton={toggleButton}/>           
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
              // onPress={() =>
              //   // navigation.goBack()
              //   navigation.navigate("Product Selection")
              // }
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
                navigation.navigate("Product Selection")
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

export default QuestionsAndAnswers;
