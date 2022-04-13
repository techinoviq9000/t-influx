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
import { HASURA } from "../config"
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const BeginDocumentSubmission = ({ route, navigation }) => {
  const fieldsArray = route?.params?.fields;
  const applicantData = route?.params?.applicantData;
  let applicant_id = applicantData?.applicant_id;
  let preFilledFields = route?.params?.data;
  if(preFilledFields) {
    preFilledFields = preFilledFields.map((data) => {
      return { field_name: data.field_name, value: data.data_table[0].value };
    });
  }
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

        let localUri = result.uri;
        let filename = localUri.split('/').pop();
      
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
      
        let formData = new FormData();
        const file = {
          uri: localUri, name: filename, type
        }
      //   const config = {
      //     headers: {
      //         'content-type': 'multipart/form-data'
      //     }
      // }
        const res = await nhost.storage.upload({file})
        console.log(res);
        setState({...state, taken: true, image: result.uri, uri: localUri, name: filename, type, value: `${HASURA}/v1/storage/files/${res.id}`})
      }
  }; 


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
                  title={fieldsArray[16].field_name}
                  imagePreview={nicFront}
                  state={nicFront}
                  setState={setNicFront}
                />
                </Pressable>

                <Pressable onPress={() => __startCamera(nicBack, setNicBack) }>
                <Uploader
                  title={fieldsArray[17].field_name}
                  imagePreview={nicBack}
                  state={nicBack}
                  setState={setNicBack}
                />
                </Pressable>

                <Pressable onPress={() => __startCamera(poi, setPoi) }>
                <Uploader
                  title={fieldsArray[18].field_name}
                  imagePreview={poi}
                  state={poi}
                  setState={setPoi}
                />
                </Pressable>

                <Pressable onPress={() => __startCamera(signature, setSigntaure) }>
                <Uploader
                  title={fieldsArray[19].field_name}
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
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default BeginDocumentSubmission;
