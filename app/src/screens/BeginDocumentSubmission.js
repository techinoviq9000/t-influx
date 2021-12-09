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
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Collapse } from "native-base";

//import for the collapsible/Expandable view
import Collapsible from "react-native-collapsible";
import { boxShadow } from "styled-system";
import StepHeader from "../CustomComponents/StepsHeader";

const BeginDocumentSubmission = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  const [list, setList] = useState([
    {
      id: 0,
      title: "NADRA CNIC PASSPORT",
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
        width={{base: "100%", md: "md"}}
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
          <StepHeader title="Upload Documents" />
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
            <Box flex={1} alignItems={{md: "center"}}>
              {list.map((item) => (
                <Uploader
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  status={item.status}
                  description={item.description}
                />
              ))}
              <Stack
                direction="row"
                p={3}
                textAlign="center"
                backgroundColor="white"
                borderColor="#13B995"
                borderRadius="lg"
                borderWidth={1}
                shadow={4}
                mb={4}
                width={{base: "100%", md: "md"}}
              >
                <Box flex={1} alignItems="center">
                  <Text color="blue.600" fontWeight="bold">
                    <MaterialIcons name="add" size={15} color="blue" />
                    Additional Documents
                  </Text>
                </Box>
              </Stack>
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
                  navigation.navigate("EligibiltyCheck")
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

export default BeginDocumentSubmission;
