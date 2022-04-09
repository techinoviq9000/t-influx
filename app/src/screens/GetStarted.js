import { useFocusEffect } from "@react-navigation/native";
import { Box, Button, CheckIcon, HStack, Image, Text, useToast} from "native-base";
import React, { useState, useRef, useEffect } from "react";
import { Animated, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from "react-native-animatable";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import * as Network from 'expo-network';
import moment from "moment";

const GET_APPLICANT = gql`
query getFields {
  fields(order_by: {id: asc}) {
    id
    field_name
    place_holder
    dropdown_values
  }
}
`;

const GetStarted = ({ route, navigation }) => {
  const toast = useToast();
  const data =  route?.params?.data
  const [nextPage, setNextPage] = useState("Loading Please Wait")

  const [getFields, { data: fieldArray, loading }] = useLazyQuery(
    GET_APPLICANT,
    {
      fetchPolicy: "network-only",
      nextFetchPolicy: "network-only",
      onCompleted: data => {
        setNextPage("I'M READY")
      }
    }
  );

  const mountedAnimation = useRef(new Animated.Value(0)).current;

  const animation = {
    0: { opacity: 0, translateX: 50 },
    1: { opacity: 1, translateX: 0 },
  };
  const fadeOut = () => {
    Animated.timing(mountedAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(mountedAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(
    React.useCallback(() => {
      fadeIn();
    }, [])
  );

  const getNetworkStatus = async () => {
    const res = await Network.getNetworkStateAsync();
    if(!res.isConnected) {
      toast.show({
        title: "No internet connection",
        placement: "top",
        status: "error",
        description: "Please connect to the internet"
      })
    } else {
      getFields()
    }
  }
  useEffect(() => {
    getNetworkStatus()
  }, [])

  const textArray = [
    "Active Mobile number & Email ID",
    "Aged 18 and Above",
    "NADRA CNIC/Passport",
    "Proof of Income",
    "Active Filer",
  ];
  const MyHStack = ({ text }) => (
    <HStack space={2} mb={2}>
      <CheckIcon size="4" mt="0.5" color="emerald.400" />
      <Text color="darkBlue.900" fontSize="sm" fontWeight="medium">
        {text}
      </Text>
    </HStack>
  );
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
      <Box width="full">
        <SharedElement id="1">
          <Box backgroundColor="white" rounded="lg" p={4} pb={2} mt={10}>
            <Animated.View style={{ opacity: mountedAnimation }}>
              {textArray.map((value, index) => (
                <Animatable.View  key={index} 
                  useNativeDriver
                  animation={animation}
                  delay={(index) * 200}
                >
                  <MyHStack text={value} />
                </Animatable.View>
              ))}
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
        <SharedElement id="getStartedBtn1">
        <Button
          size="md"
          rounded="md"
          backgroundColor="#317F6E"
          border={1}
          borderWidth="1"
          borderColor="white"
          shadow={5}
          mb={5}
          onPress={() => navigation.goBack()}
        >
          GO BACK
        </Button>
        </SharedElement>
        <SharedElement id="getStartedBtn2">
        <Button
          size="md"
          rounded="md"
          backgroundColor={"white"}
          border={1}
          isDisabled={nextPage == "Loading Please Wait"}
          borderWidth="1"
          borderColor="white"
          shadow={5}
          _text={{
            color: "darkBlue.900",
          }}
          onPress={() => {
            fadeOut();
            setTimeout(() => {
              navigation.navigate("Basic Account Details", { id: 1, fields: fieldArray.fields, data });
            }, 200);
          }}
        >
          {nextPage}
        </Button>
        </SharedElement>
      </Box>
    </Box>
  );
};

export default GetStarted;
