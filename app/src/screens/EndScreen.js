import { Box, Button, Circle, Image, Pressable, Text } from "native-base";
import React from "react";
import { Camera } from "expo-camera";

// import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { ImageBackground, View } from "react-native";

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

const EndScreen = ({ navigation }) => {
  let camera;
  // const { data, loading } = useQuery(GET_TODOS);
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);

  const __startCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status === "granted") {
      // start the camera
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };

  const __takePicture = async () => {
    const photo = await camera.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const CameraPreview = ({ photo }) => {
    return (
      <View
        style={{
          backgroundColor: "transparent",
          flex: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <ImageBackground
          source={{ uri: photo && photo.uri }}
          style={{
            flex: 1,
          }}
        />

        <Pressable onPressOut={__retakePicture}>
          {({ isHovered, isFocused, isPressed }) => {
            return (
              <Text
                bg={isPressed ? "red.500" : isHovered ? "cyan.900" : "white"}
                borderWidth="2"
                borderColor={isPressed ? "white" : "black"}
                mb="2"
              >
                Retake
              </Text>
            );
          }}
        </Pressable>
      </View>
    );
  };

  if (!startCamera) {
    return (
      <Box alignItems="center" width="100%" minHeight="100%" safeAreaTop={5}>
        <Text fontSize="5xl" color="white" fontWeight="bold" zIndex={1} mt={6}>
         Congratulations
        </Text>
        <Box>
          <Image
            source={require("../assets/end_screen_image.png")}
            alt="Alternate Text"
            size="2xl"
            mt={24}
            // resizeMode="contain"
            style={{width: 350}}
          />
          <Text fontSize="2xl" color="white" lineHeight="sm" textAlign="center" fontWeight="bold" zIndex={1} mt={6} mb={2} >
          Journey has been{"\n"}
          successfully completed 

        </Text>
        <Text fontSize="lg" color="white" textAlign="center" zIndex={1}>
We are working on your profile
        </Text>
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
            shadow={5}
            backgroundColor="white"
            _text={{
              color: "darkBlue.900",
            }}
            onPress={() => navigation.navigate("Welcome")}
          >
            OKAY
          </Button>
          {/* <Button
            size="md"
            rounded="md"
            shadow={5}
            backgroundColor="white"
            _text={{
              color: "#414141",
            }}
            onPress={() => __startCamera()}
          >
            Open Camera
          </Button> */}
        </Box>
      </Box>
    );
  }
  if (previewVisible && capturedImage) {
    return (
      <CameraPreview photo={capturedImage} retakePicture={__retakePicture} />
    );
  } else {
    return (
      <Camera
        style={{ flex: 1, width: "100%" }}
        ref={(r) => {
          camera = r;
        }}
      >
        <Box
          alignItems="flex-end"
          width="100%"
          minHeight="100%"
          flexDirection="row"
          justifyContent="space-between"
          px={10}
        >
          {/* <Pressable onPressOut={__retakePicture}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Text
                  bg={isPressed ? "red.500" : isHovered ? "cyan.900" : "white"}
                  borderWidth="2"
                  borderColor={isPressed ? "white" : "black"}
                  mb="2"
                >
                  Retake
                </Text>
              );
            }}
          </Pressable>
          <Pressable onPressOut={__takePicture}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Circle
                  size={98}
                  bg={isPressed ? "red.500" : isHovered ? "cyan.900" : "white"}
                  borderWidth="2"
                  borderColor={isPressed ? "white" : "black"}
                  mb="2"
                  opacity={0.5}
                />
              );
            }}
          </Pressable>
          <Pressable onPressOut={__takePicture}>
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Circle
                  size={98}
                  bg={isPressed ? "red.500" : isHovered ? "cyan.900" : "white"}
                  borderWidth="2"
                  borderColor={isPressed ? "white" : "black"}
                  mb="2"
                  opacity={0.5}
                />
              );
            }}
          </Pressable> */}
        </Box>
      </Camera>
    );
  }
};

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },
// });

export default EndScreen;
