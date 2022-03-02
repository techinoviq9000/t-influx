import { Box, Button, CheckIcon, HStack, Image, Text } from "native-base";
import React from "react";
const GetStarted = ({ navigation }) => {
  return (
    <Box flex={1} alignItems="center" minHeight="100%" px={3}>
        <Image
          source={require("../assets/Get_started.png")}
          alt="Alternate Text"
          size="48"
          mt={10}
          resizeMode="contain"
        />
        <Text fontSize="3xl" color="white" fontWeight="bold">Before you get started</Text>
        <Text fontSize="2xl" mx={5} mt={1} textAlign="center" color="white" fontWeight="thin">You should have the following documents</Text>
        <Box backgroundColor="white" rounded="lg" p={4} width={{base: "100%", md: "md"}} mt={10}>
        <HStack space={2}>
          <CheckIcon size="4" mt="0.5" color="emerald.500" />
          <Text color="#414141" fontSize="sm" fontWeight="medium">Active Mobile number & Email ID</Text>
        </HStack>
        <HStack space={2} mt={2}>
          <CheckIcon size="4" mt="0.5" color="emerald.500" />
          <Text color="#414141" fontSize="sm" fontWeight="medium" >Aged 18 and Above</Text>
        </HStack>
        <HStack space={2} mt={2}>
          <CheckIcon size="4" mt="0.5" color="emerald.500" />
          <Text color="#414141" fontSize="sm" fontWeight="medium" >NADRA CNIC/Passport</Text>
        </HStack>
        <HStack space={2} mt={2}>
          <CheckIcon size="4" mt="0.5" color="emerald.500" />
          <Text color="#414141" fontSize="sm" fontWeight="medium" >Proof of Income</Text>
        </HStack>
        <HStack space={2} mt={2}>
          <CheckIcon size="4" mt="0.5" color="emerald.500" />
          <Text color="#414141" fontSize="sm" fontWeight="medium" >Active Filer</Text>
        </HStack>          
          
        </Box>
        <Box flex={1} width={{base: "100%", md:"md"}}  justifyContent="flex-end" mt={6} mb={5}>
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
              navigation.goBack()
              // navigation.navigate("Registration")
            }
          >
            GO BACK
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
              navigation.navigate("Registration")
            }
          >
            I'M READY
          </Button>
        </Box>
    </Box>
  );
}

export default GetStarted;