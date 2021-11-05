import { Box, Button, CheckIcon, HStack, Image, Text } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Inter_900Black,
} from '@expo-google-fonts/inter';

const GetStarted = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  if (!fontsLoaded) 
    return <AppLoading />;
  else
  return (
    <Box flex={1} alignItems="center" minHeight="100%" px={3}>
        <Image
          source={require("../assets/Get_started.png")}
          alt="Alternate Text"
          size="2xl"
          mt={10}
          resizeMode="contain"
        />
        <Text fontSize="3xl" color="white" fontWeight="bold">Before you get started</Text>
        <Text fontSize="2xl" mx={5} mt={1} textAlign="center" color="white" fontWeight="thin">You should have the following documents</Text>
        <Box backgroundColor="white" rounded="lg" p={8} width="100%" mt={10}>
        <HStack space={2}>
          <CheckIcon size="5" mt="0.5" color="emerald.500" />
          <Text color="#414141" fontSize="md" fontWeight="medium">Active Mobile number & Email ID</Text>
        </HStack>
        <HStack space={2} mt={2}>
          <CheckIcon size="5" mt="0.5" color="emerald.500" />
          <Text color="#414141" fontSize="md" fontWeight="medium" >Aged 18 and Above</Text>
        </HStack>
        <HStack space={2} mt={2}>
          <CheckIcon size="5" mt="0.5" color="emerald.500" />
          <Text color="#414141" fontSize="md" fontWeight="medium" >NADRA CNIC/Passport</Text>
        </HStack>
        <HStack space={2} mt={2}>
          <CheckIcon size="5" mt="0.5" color="emerald.500" />
          <Text color="#414141" fontSize="md" fontWeight="medium" >Proof of Income</Text>
        </HStack>
        <HStack space={2} mt={2}>
          <CheckIcon size="5" mt="0.5" color="emerald.500" />
          <Text color="#414141" fontSize="md" fontWeight="medium" >Active Filer</Text>
        </HStack>          
          
        </Box>
        <Box flex={1} width="100%" justifyContent="flex-end" mt={6} mb={5}>
          <Button
            size="md"
            rounded="md"
            backgroundColor="#317F6E"
            border={1}
            borderWidth="1"
            borderColor="white"
            shadow={5}
            mb={5}
            onPress={() =>
              // navigation.goBack()
              navigation.navigate("Continue Registration")
            }
          >
            I'M READY
          </Button>
          <Button
            size="md"
            rounded="md"
            backgroundColor="white"
            border={1}
            borderWidth="1"
            borderColor="white"
            shadow={5}
            _text={{
              color: "#414141",
            }}
            onPress={() =>
              navigation.goBack()
            }
          >
            GO BACK
          </Button>
        </Box>
    </Box>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default GetStarted;