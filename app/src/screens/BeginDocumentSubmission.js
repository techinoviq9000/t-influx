import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  ScrollView,
  Stack,
  Pressable,
  Icon,
} from "native-base";
import React, { useState } from "react";
import { Camera } from "expo-camera";
import {
  ImageBackground,
  StyleSheet,
  View
} from "react-native";
import axios from 'axios'
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import StepHeader from "../CustomComponents/StepsHeader";
import * as ImagePicker from 'expo-image-picker'; 
import * as MediaLibrary from "expo-media-library";
import { http } from "../utils/http";
import { nhost } from "../utils/nhost";
import MlkitOcr from 'react-native-mlkit-ocr';
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const BeginDocumentSubmission = ({ navigation }) => {
  let camera;
  const [startCamera, setStartCamera] = React.useState(false);
  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState(null);

  const [nicFront, setNicFront] = useState({
    taken: false,
    image: null
  })

  const [nicBack, setNicBack] = useState({
    taken: false,
    image: null
  })

  const [poi, setPoi] = useState({
    taken: false,
    image: null
  })

  const [signature, setSigntaure] = useState({
    taken: false,
    image: null
  })


  const __startCamera = async (state, setState) => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
  
      const { status: status2 } = await Camera.requestCameraPermissionsAsync();
      if (status2 !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        exif: true,
        quality: 0.5,
      });
      if (!result.cancelled) {
        // const resultFromUri = await MlkitOcr?.detectFromUri("ASd");
        // console.log(resultFromUri);
        // const manipResult = await manipulateAsync(
        //   result.uri,
        //   [
        //     {
        //       resize: {
        //         height: 900
        //       }
        //     }
        //   ],
        //   { compress: 0.5, format: SaveFormat.JPEG }
        // );
        // console.log(manipResult);
        // let localUri = manipResult.uri;
        // let filename = localUri.split('/').pop();
      
        // // Infer the type of the image
        // let match = /\.(\w+)$/.exec(filename);
        // let type = match ? `image/${match[1]}` : `image`;
      
        
        // let formData = new FormData();
        
        // formData.append('file', { uri: localUri, name: filename, type });
        // console.log(formData);
      //   const config = {
      //     headers: {
      //         'content-type': 'multipart/form-data'
      //     }
      // }
      // console.log(await nhost.storage.upload(formData))
      // console.log(fileMetadata)
      // console.log(error)
        // const res  = await http.post("/imageOCR", {data: "123"}, config)
        // const res = await axios.post("http://175.107.200.16:5000/imageOCR", formData, {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // });
        // console.log(res.result)
        setState({...state, taken: true, image: result.uri})
      }
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

  // const [list, setList] = useState([
  //   {
  //     id: 0,
  //     title: "NADRA CNIC FRONT",
  //     status: true,
  //     imagePreview: "../assets/nic_image.jpg",
  //   },
  //   {
  //     id: 1,
  //     title: "NADRA CNIC BACK",
  //     status: true,
  //     imagePreview: "../assets/nic_image.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "Proof Of Income",
  //     status: true,
  //     imagePreview: "../assets/nic_image.jpg",
  //   },
  //   {
  //     id: 2,
  //     title: "Active Filer Certificate",
  //     status: false,
  //     imagePreview: "../assets/nic_image.jpg",
  //   },
  //   {
  //     id: 3,
  //     title: "Upload Signature on White Paper",
  //     status: false,
  //     imagePreview: "../assets/nic_image.jpg",
  //   },
  //   {
  //     id: 3,
  //     title: "Zakaat Affidavit - If Applicable",
  //     status: false,
  //     picturePreview: ,
  //   },
  // ]);

const abc = "../assets/nic_image.jpg"
  const Uploader = ({
    title,
    imagePreview,
    setState,
    state
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
        mb={4}
        width={{base: "100%", md: "md"}}
      >
        <Box flex={1}>
          <Text color="#13B995">{title}</Text>
          {!imagePreview.taken ? <Text>No image</Text> : <Image source={{uri: imagePreview.image}} alt="Alternate Text" size="xl" resizeMode="contain" zIndex={10} />}
        </Box>
        <Box alignItems="flex-end" >
          <Icon as={MaterialIcons} name="camera-alt" size={6} color="emerald.500" />
          {imagePreview.taken && <Icon as={MaterialIcons} name="delete" size={6} color="red.800" mt={10} onPress={() => {setState({...state, taken: false, image: null})}}/>}
        </Box>
      </Stack>
    );
  };

  if(!startCamera) {
    return (
      <Box flex={1} minHeight="100%" safeAreaTop={5}>
        <Box alignItems="flex-start" px={6} mt={6}>
        <Pressable>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Ionicons
          name="arrow-back-circle-sharp"
          size={36}
          color={isFocused ? "#87e3ff" : "white"}
          onPress={
            () => navigation.goBack()
            // navigation.navigate("Welcome")
          }
        />
        )
      }}
    </Pressable>
        </Box>
        <Box alignItems="center">
          <StepHeader
            title="Upload Documents"
            nextTitle="Next: Foreign Account Tax Compliance"
            step="4"
          />
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
                <Pressable onPress={() => __startCamera(nicFront, setNicFront) }>
                <Uploader
                  title="Nadrda NIC Front"
                  imagePreview={nicFront}
                  state={nicFront}
                  setState={setNicFront}
                />
                </Pressable>

                <Pressable onPress={() => __startCamera(nicBack, setNicBack) }>
                <Uploader
                  title="Nadra NIC Back"
                  imagePreview={nicBack}
                  state={nicBack}
                  setState={setNicBack}
                />
                </Pressable>

                <Pressable onPress={() => __startCamera(poi, setPoi) }>
                <Uploader
                  title="Proof of Income"
                  imagePreview={poi}
                  state={poi}
                  setState={setPoi}
                />
                </Pressable>

                <Pressable onPress={() => __startCamera(signature, setSigntaure) }>
                <Uploader
                  title="Upload Signtaure on White Paper"
                  imagePreview={signature}
                  state={signature}
                  setState={setSigntaure}
                />
                </Pressable>
                
              {/* <Stack
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
                <Box flex={1} alignItems="center" alignContent="center">
                <HStack space={1}>
                              <Icon
                      as={MaterialIcons}
                      name={'add'}
                      size="15"
                      color="emerald.500"
                      position="relative"
                      top={1}
                      
                    />
                  <Text color="black" fontWeight="bold">
                    Additional Documents
                  </Text>
                  </HStack>
                </Box>
              </Stack> */}
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
                  navigation.navigate("Foreign Tax")
                }
              >
                CONFIRM
              </Button>
            </Box>
          </ScrollView>
        </Box>
      </Box>
    );
  } if (previewVisible && capturedImage) {
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default BeginDocumentSubmission;
