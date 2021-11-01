import { Box, Button, Image, Text } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import Background from "../CustomComponents/Background";

const GetStarted = ({ navigation }) => {
  return (
    <Box flex={1} alignItems="center" minHeight="100%">
      <Background>
        <Text fontSize="7xl" color="white" zIndex={1} mt={6}>
          T Influx
        </Text>
        <Image
          source={require("../assets/Get_started.png")}
          alt="Alternate Text"
          size="2xl"
          mt={24}
          resizeMode="contain"
        />
        <Box flex={1} width="100%" justifyContent="flex-end" px={3} mb={5}>
          <Button
            size="md"
            rounded="md"
            backgroundColor="#317F6E"
            border={1}
            borderWidth="1"
            borderColor="white"
            mb={20}
            shadow={5}
            onPress={() =>
              navigation.push("Details", { name: "salman", age: 12 })
            }
          >
            LOGIN
          </Button>
          <Button
            size="md"
            rounded="md"
            shadow={5}
            backgroundColor="white"
            _text={{
              color: "#414141",
            }}
            onPress={() => navigation.goBack()}
          >
            Go back
          </Button>
        </Box>
      </Background>
    </Box>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default GetStarted;