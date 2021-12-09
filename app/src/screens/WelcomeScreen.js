import { Box, Button, Image, Text } from "native-base";
import React from "react";
import * as Animatable from 'react-native-animatable';

import { gql, useQuery, useLazyQuery } from "@apollo/client";

const GET_TODOS = gql`
query MyQuery {
  todo {
    id
    created_at
    name
    is_completed
  }
}

`;

const AnimatableBox = Animatable.createAnimatableComponent(Box);


const WelcomeScreen = ({ navigation }) => {
  const { data, loading } = useQuery(GET_TODOS);
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
    <Box alignItems="center" width="100%" minHeight="100%" safeAreaTop={5}>
        <Text fontSize="7xl" color="white" zIndex={1} mt={6}>
          T Influx
        </Text>
        <AnimatableBox >
        <Image
          source={require("../../assets/undraw_on_the_office_fbfs.png")}
          alt="Alternate Text"
          size="2xl"
          mt={24}
          resizeMode="contain"
        />
        </AnimatableBox>
        <Box flex={1} width={{base: "100%", md:"md"}} justifyContent="flex-end" px={3} mb={5} >
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
              navigation.navigate("LoginRoute")
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
            onPress={() =>
              navigation.navigate("RegisterRoute")
            }
          >
            REGISTER
          </Button>
        </Box>
    </Box>
  );
}


// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
// });

export default WelcomeScreen;
