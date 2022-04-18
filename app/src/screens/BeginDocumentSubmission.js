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
  useToast,
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
import { gql, useMutation } from "@apollo/client";
import LoadingModal from "../CustomComponents/LoadingModal";

import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

const INSERT_DATA = gql`
  mutation MyMutation(
    $value_1: String
    $field_id_1: Int!
    $applicant_id: uuid!
    $value_2: String
    $field_id_2: Int!
    $value_3: String
    $field_id_3: Int!
    $value_4: String
    $field_id_4: Int!
  ) {
    one: insert_data_table_one(
      object: {
        value: $value_1
        field_id: $field_id_1
        applicant_id: $applicant_id
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_1 } }
      }
    ) {
      id
    }
    two: insert_data_table_one(
      object: {
        value: $value_2
        field_id: $field_id_2
        applicant_id: $applicant_id
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_2 } }
      }
    ) {
      id
    }
    three: insert_data_table_one(
      object: {
        value: $value_3
        field_id: $field_id_3
        applicant_id: $applicant_id
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_3 } }
      }
    ) {
      id
    }
    four: insert_data_table_one(
      object: {
        value: $value_4
        field_id: $field_id_4
        applicant_id: $applicant_id
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_4 } }
      }
    ) {
      id
    }
  }
`;


const BeginDocumentSubmission = ({ route, navigation }) => {
  const fieldsArray = route?.params?.fields;
  const applicantData = route?.params?.applicantData;
  let applicant_id = applicantData?.applicant_id;
  let preFilledFields = route?.params?.data;
  if (preFilledFields) {
    preFilledFields = preFilledFields.map((data) => {
      return { field_name: data.field_name, value: data.data_table[0].value };
    });
  }
  const toast = useToast();
  // console.log(preFilledFields);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pictures, setPictures] = useState([])
  const dummyFields = [
    {
      id: 25,
      field_name: "Nadra NIC Front",
      place_holder: null,
      dropdown_values: null
    },
    {
      id: 26,
      field_name: "Nadra NIC Back",
      place_holder: null,
      dropdown_values: null
    },
    {
      id: 27,
      field_name: "Proof of Income",
      place_holder: null,
      dropdown_values: null
    },
    {
      id: 28,
      field_name:"Upload Signature on White Paper",
      place_holder: null,
      dropdown_values: null
    }
  ]
React.useEffect(() => {
  setPictures(dummyFields.map((item, index) => (
    {name: item.field_name,  id: item.id, edit: false,
      taken: preFilledFields?.[index]?.value ? true : false,
      image: preFilledFields?.[index]?.value,}
  )))

}, [])

  const [insertData, { data }] = useMutation(INSERT_DATA, {
    onCompleted: (data) => {
      setShowLoadingModal(false);
      navigation.navigate("Foreign Tax", {
        data: applicantData,
        fields: fieldsArray
      }); 
    },
    onError: (error) => {
      setShowLoadingModal(false);
      console.log(error);
      toast.show({
        title: "Error",
        placement: "top",
        status: "error",
        description:
          "Unable to proceed. Please contact support at support@techinoviq.com",
      });
    },
  });
  const __startCamera = async (state, setState, name) => {
    try {
    //   const { status } = await MediaLibrary.requestPermissionsAsync()
    // if (status !== "granted") {
    //   alert("Sorry, we need camera roll permissions to make this work!");
    // }
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
      let filename = localUri.split("/").pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      const file = {
        uri: localUri,
        name: filename,
        type,
      };
      setErrorMessage("");
      setState(state.map(item => {if (item.name == name) { return {...item, edit: true, taken: true, image: result.uri, file } } else {return item}}))
    }
  }
    catch(e) {
      console.log(e);
    }
  };

  const Uploader = ({ title, imagePreview, name, mandtory }) => {
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
        width={{ base: "100%", md: "md" }}
      >
        <Box flex={1}>
          {mandtory ? (
            <Text color="#13B995">
              {title}
              <Text color="#dc2626" fontSize="xs">
                {" "}
                *
              </Text>
            </Text>
          ) : (
            <Text color="#13B995">{title}</Text>
          )}
          {!imagePreview.taken ? (
            <Text>No image</Text>
          ) : (
            <Image
              source={{ uri: imagePreview.image }}
              alt="Alternate Text"
              size="xl"
              resizeMode="contain"
              zIndex={10}
            />
          )}
        </Box>
        <Box alignItems="flex-end">
          <Icon
            as={MaterialIcons}
            name="camera-alt"
            size={6}
            color="emerald.500"
          />
          {imagePreview.taken && (
            <Icon
              as={MaterialIcons}
              name="delete"
              size={6}
              color="red.800"
              mt={10}
              onPress={() => {
                console.log(pictures.map(item => {if (item.name == name) { return {...item, edit: true, taken: false, image: null} } else {return item}}))
                setPictures(pictures.map(item => {if (item.name == name) { return {...item, edit: true, taken: false, image: null} } else {return item}}));
              }}
            />
          )}
        </Box>
      </Stack>
    );
  };

  // const handleSubmit = () => {
  //   console.log(pictures)
  // }
  const handleSubmit = async () => {
    if (!pictures[0]?.image && !pictures[1]?.image) {
      // if (false) {
      setErrorMessage("Please add NIC images");
    } else {
      // setShowLoadingModal(true);
      setErrorMessage("");
      // let values = []
      let modifiedPics = await Promise.all(
        pictures.map(async (item) => {
          try {
            let { file, edit, name } = item;
            console.log(item, "item file");
            if (file && edit) {
              const res = await nhost.storage.upload({ file });
              console.log(res?.fileMetadata?.id, "res");
              let id = res?.fileMetadata?.id;
              return {...item, image: `${HASURA}/v1/storage/files/${id}`}
            } else {
              return item
            }
          } catch (e) {
            console.log(e);
          }
        })
      );
      setPictures(modifiedPics)
      let variables = {}
      modifiedPics.map((pic, index) => {
        variables[`value_${index+1}`] = pic.image
        variables[`field_id_${index+1}`] = pic.id
      })
      variables.applicant_id = applicant_id,
      console.log(variables);
      console.log("meow");
      insertData({
        variables
      });
    }
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
            );
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
          <Box flex={1} alignItems={{ md: "center" }}>
            {pictures.map((item, index) => (
                <Pressable onPress={() =>{ __startCamera(pictures, setPictures, item.name); console.log("im pressed")}} key={index}>
                <Uploader
                  title={item.name}
                  mandtory={true}
                  imagePreview={item}
                  setState={setPictures}
                  name={item.name}
                />
              </Pressable>
            ))}
            {/* <Pressable onPress={() => __startCamera(pictures[0]['nicFront'], setPictures, "nicFront")}>
              <Uploader
                title={fieldsArray[16].field_name}
                mandtory={true}
                imagePreview={nicFront}
                state={nicFront}
                setState={setNicFront}
              />
            </Pressable>

            <Pressable onPress={() => __startCamera(pictures[0]['nicBack'], setPictures, "nicBack")}>
              <Uploader
                title={fieldsArray[17].field_name}
                mandtory={true}
                imagePreview={nicBack}
                state={nicBack}
                setState={setNicBack}
              />
            </Pressable>

            <Pressable onPress={() => __startCamera(pictures[0]['poi'], setPictures, "poi")}>
              <Uploader
                title={fieldsArray[18].field_name}
                imagePreview={poi}
                state={poi}
                setState={setPoi}
              />
            </Pressable>

            <Pressable onPress={() => __startCamera(pictures[0]['signature'], setPictures)}>
              <Uploader
                title={fieldsArray[19].field_name}
                imagePreview={signature}
                state={signature}
                setState={setSigntaure}
              />
            </Pressable> */}
            <Text textAlign="center" color="danger.400">
              {errorMessage}
            </Text>
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
                //   navigation.navigate("Foreign Tax")
                {
                  handleSubmit();
                }
              }
            >
              CONFIRM
            </Button>
          </Box>
        </ScrollView>
      </Box>
      <LoadingModal
        message="Saving information. Please wait."
        showModal={showLoadingModal}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default BeginDocumentSubmission;