import { Box, Button, Image, Text } from "native-base";
import React from "react";
import { ImageBackground, Share, StyleSheet, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import Background from "../CustomComponents/Background";
import * as Animatable from 'react-native-animatable';
const AnimatableBox = Animatable.createAnimatableComponent(Box);
const AnimatableButton = Animatable.createAnimatableComponent(Button);


const WelcomeScreen = ({ navigation }) => {
  const slideOut = {
    0: {
      transform: [
        {
          translateX: 0,
        },
      ],
    },
    1: {
      transform: [
        {
          translateX: -400,
        },
      ],
    },
  };

  return (
    <Box flex={1} alignItems="center" minHeight="100%">
      <Background>
        <Text fontSize="7xl" color="white" zIndex={1} mt={6}>
          T Influx
        </Text>
        <AnimatableBox >
        <Image
          source={require("../assets/undraw_on_the_office_fbfs.png")}
          alt="Alternate Text"
          size="2xl"
          mt={24}
          resizeMode="contain"
        />
        </AnimatableBox>
        <AnimatableBox flex={1} width="100%" justifyContent="flex-end" px={3} mb={5} >
          <Button
            size="md"
            rounded="md"
            backgroundColor="#317F6E"
            border={1}
            borderWidth="1"
            borderColor="white"
            mb={5}
            shadow={5}
            onPress={() =>
              navigation.navigate("Details", { name: "salman", age: 12 })
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
          >
            REGISTER
          </Button>
        </AnimatableBox>
        
      </Background>
    </Box>
  );
}


// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
// });

export default WelcomeScreen;
