import { Box, Button, Circle, Image, Pressable, Text } from "native-base";
import React from "react";
import { Camera } from "expo-camera";

import { SafeAreaView } from 'react-native-safe-area-context';

// import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { ImageBackground, View } from "react-native";
import { StatusBar } from "expo-status-bar";

// const GET_TODOS = gql`
//   query MyQuery {
//     todo {
//       id
//       created_at
//       name
//       is_completed
//     }
//   }
// `;



const WelcomeScreen = ({ navigation }) => {
  let camera;
  // const { data, loading } = useQuery(GET_TODOS);

    return (
      <Box alignItems="center" width="100%" minHeight="100%" safeAreaTop={5}>
        <Text fontSize="7xl" color="white" zIndex={1} mt={6}>
          T Influx
        </Text>
        <Box>
          <Image
            source={require("../assets/undraw_on_the_office_fbfs.png")}
            alt="Alternate Text"
            size="2xl"
            mt={24}
            resizeMode="contain"
          />
        </Box>
        <Box
          flex={1}
          width={{ base: "100%", md: "md" }}
          justifyContent="flex-end"
          px={3}
          mb={5}
        >
          <Button
            size="md"
            rounded="md"
            backgroundColor="#317F6E"
            border={1}
            borderWidth="1"
            borderColor="white"
            mb={5}
            shadow={5}
            onPress={() => navigation.navigate("LoginRoute")}
          >
            LOGIN
          </Button>
          <Button
            size="md"
            rounded="md"
            shadow={5}
            backgroundColor="white"
            _text={{
              color: "darkBlue.900",
            }}
            onPress={() => navigation.navigate("RegisterRoute")}
          >
            REGISTER
          </Button>
        </Box>
        <StatusBar translucent backgroundColor={'transparent'} style="light" />
      </Box>
    );
};

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
// });

export default WelcomeScreen;
