import { Box, Button, CheckIcon, HStack, Image, Text } from "native-base";
import React, { useState, useRef, useEffect } from "react";
import {Animated, View} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
const GetStarted = ({  navigation }) => {
  const [navigating, setNavigating] = useState(false);
  const myRef = useRef();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const mountedAnimation =  React.useRef(new Animated.Value(1)).current

  useEffect(() => {
    const newWidth = (myRef?.current && myRef.current.offsetWidth) || 0;
    console.log(newWidth);
    setWidth(newWidth);
    const newHeight = myRef.current.clientHeight;
    console.log(newHeight);
    setHeight(newHeight);
  }, []);

  const fadeOut = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(mountedAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start();
  };

  React.useEffect(() => {

    const willFocusSubscription = navigation.addListener('focus', () => {
    Animated.timing(mountedAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();      
  });
  return willFocusSubscription
  }, [])
  
  return (
    <Box flex={1} alignItems="center" minHeight="100%" px={3}>
      <Image
        source={require("../assets/Get_started.png")}
        alt="Alternate Text"
        size="48"
        mt={10}
        resizeMode="contain"
      />
      <Text fontSize="3xl" color="white" fontWeight="bold">
        Before you get started
      </Text>
      <Text
        fontSize="2xl"
        mx={5}
        mt={1}
        textAlign="center"
        color="white"
        fontWeight="thin"
      >
        You should have the following documents
      </Text>
      <Box
        width="full"
        ref={myRef}
        onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          console.log(width)
        }}
      >
        <SharedElement id="1">
          <Box backgroundColor="white" rounded="lg" p={4} mt={10}>
              <Animated.View style={{opacity: mountedAnimation}}>
                <HStack space={2}>
                  <CheckIcon size="4" mt="0.5" color="emerald.400" />
                  <Text color="darkBlue.900" fontSize="sm" fontWeight="medium">
                    Active Mobile number & Email ID
                  </Text>
                </HStack>
                <HStack space={2} mt={2}>
                  <CheckIcon size="4" mt="0.5" color="emerald.400" />
                  <Text color="darkBlue.900" fontSize="sm" fontWeight="medium">
                    Aged 18 and Above
                  </Text>
                </HStack>
                <HStack space={2} mt={2}>
                  <CheckIcon size="4" mt="0.5" color="emerald.400" />
                  <Text color="darkBlue.900" fontSize="sm" fontWeight="medium">
                    NADRA CNIC/Passport
                  </Text>
                </HStack>
                <HStack space={2} mt={2}>
                  <CheckIcon size="4" mt="0.5" color="emerald.400" />
                  <Text color="darkBlue.900" fontSize="sm" fontWeight="medium">
                    Proof of Income
                  </Text>
                </HStack>
                <HStack space={2} mt={2}>
                  <CheckIcon size="4" mt="0.5" color="emerald.400" />
                  <Text color="darkBlue.900" fontSize="sm" fontWeight="medium">
                    Active Filer
                  </Text>
                </HStack>
              </Animated.View>
          </Box>
        </SharedElement>
      </Box>
      <Box
        flex={1}
        width={{ base: "100%", md: "md" }}
        justifyContent="flex-end"
        mt={6}
        mb={5}
      >
        <Button
          size="md"
          rounded="md"
          backgroundColor="#317F6E"
          border={1}
          borderWidth="1"
          borderColor="white"
          shadow={5}
          mb={5}
          onPress={
            () => navigation.goBack()
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
            color: "darkBlue.900",
          }}
          onPress={() => {
            // setNavigating(prev => {
            //   prev = !prev
            //   navigation.navigate("Registration", { id: 1 })
            //   return prev
            // })
            fadeOut()
            setTimeout(() => {
              navigation.navigate("Registration", { id: 1 })
            }, 200);
            // console.log(width);
          }}
        >
          I'M READY
        </Button>
      </Box>
    </Box>
  );
};

export default GetStarted;
