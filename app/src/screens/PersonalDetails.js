import {
  Box,
  Button,
  Text,
  ScrollView,
  Stack,
  Pressable,
  Divider,
  useToast
} from "native-base"
import React, { useState } from "react"
import axios from 'axios'
import { StyleSheet, Animated } from "react-native"
import { SharedElement } from "react-navigation-shared-element"

import { Ionicons } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Formik } from "formik"
import * as yup from "yup"
import InputFields from "../CustomComponents/InputFields"
import StepHeader from "../CustomComponents/StepsHeader"
import SelectField from "../CustomComponents/SelectField"
import { gql, useMutation } from "@apollo/client"
import LoadingModal from "../CustomComponents/LoadingModal"
import { Camera } from "expo-camera";
import * as ImagePicker from 'expo-image-picker'; 
import moment from "moment"
import { useFocusEffect } from "@react-navigation/native"
import INSERT_PERSONAL_DATA from "../Queries/INSERT_PERSONAL_DATA"

const PersonalDetails = ({ route, navigation }) => {
  const translateX = React.useRef(new Animated.Value(500)).current
  const pageData = route?.params?.page
  const fieldsArray = pageData?.pages.filter(
    (page) => page.name == "Personal Details"
  )[0].fields
  const INSERT_DATA = gql`
    ${INSERT_PERSONAL_DATA(fieldsArray)}
  `
  const applicantData = route?.params?.data
  const applicant_id = applicantData?.applicant_id
  // const email = applicantData?.applicant.email;
  // const user_id = applicantData?.user_id;
  const toast = useToast()
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [insertData, { data }] = useMutation(INSERT_DATA, {
    onCompleted: (data) => {
      setShowLoadingModal(false)
      console.log(data)
      navigation.navigate("Begin Document Submission", {
        data: applicantData,
        page: pageData
      })
    },
    onError: (error) => {
      setShowLoadingModal(false)
      console.log(error)
      toast.show({
        title: "Error",
        placement: "top",
        status: "error",
        description:
          "Unable to proceed. Please contact support at support@techinoviq.com"
      })
    }
  })
  const registerValidationSchema = yup
    .object()
    .shape(dynamicRegisterValidationSchema(fieldsArray))

  const translationX = (toValue, delay) => {
    Animated.timing(translateX, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true
    }).start()
  }

  const animateBack = () => {
    translationX(500, 500, 0)
  }

  useFocusEffect(
    React.useCallback(() => {
      Animated.parallel([translationX(0, 50)]).start()
    }, [])
  )

  let analytics = {}
  let initialValues = {}
  fieldsArray.map((item, index) => {
    initialValues[item.name] =  ""
   })

   const __startCamera = async () => {
    try {
      console.log("meow")
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
      }
      
        let formData = new FormData();
        formData.append('file', file);


          const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      }
      // const res  = await http.post("/imageOCR", {data: "123"}, config)
        const res = await axios.post("http://192.168.18.38:5000/imageOCR", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      console.log(res.data.data)
      // setErrorMessage("");
      
    }
  }
    catch(e) {
      console.log(e);
    }
  };

  return (
    <Formik
      id="sign-in-button"
      validateOnChange={false}
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={(values) => {
        setShowLoadingModal(true);
        let variables = {}
        fieldsArray.map((item, i) => {
          variables[item.name] = values[item.name];
          variables[`field_${item.id}`] = item.id;
          variables[`analysis_${item.id}`] = analytics[item.name]
        })
        variables.applicant_id = applicant_id
        console.log(variables)
        insertData({
          variables
        })
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid
      }) => {
        const analysis = (key, startTime, endTime) => {
          let prevTimeTaken = analytics[key]?.timeTaken
          if (!prevTimeTaken) prevTimeTaken = 0
          let timer = {}
          let count = 1
          let errorCount = 0
          let tapped = analytics[key]?.tapped
          if (typeof tapped == "number") {
            count += tapped
          } else {
            tapped = 0
          }
          if (!startTime) {
            //onExit
            let oldStartTime = analytics[key]?.startTime
            errorCount = analytics[key]?.errorCount
            if (typeof errorCount == "number") {
              if (touched[key] && errors[key]) {
                errorCount += 1
              }
            }
            let timeTaken =
              endTime.diff(oldStartTime, "seconds", true) + prevTimeTaken
            timer = {
              startTime: oldStartTime,
              endTime,
              tapped: count,
              errorCount,
              timeTaken,
              avgTime: timeTaken / count
            }
          } else {
            //onEnter
            let previousErrorCount = analytics[key]?.errorCount
            if (typeof previousErrorCount == "number") {
              errorCount = previousErrorCount
            } else {
              errorCount = 0
            }
            let timeTaken =
              endTime.diff(startTime, "seconds", true) + prevTimeTaken
            timer = {
              startTime,
              endTime,
              tapped,
              errorCount,
              timeTaken,
              avgTime: timeTaken / tapped
            }
          }
          analytics[key] = timer
          return analytics
        }
        return (
          <Box flex={1} minHeight="100%" safeAreaTop={5}>
            <Box alignItems="flex-start" px={6} mt={6}>
              <SharedElement id="backButton1">
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
              </SharedElement>
            </Box>
            <SharedElement id="stepHeader">
              <Box alignItems="center">
                <StepHeader
                  title="Personal Details"
                  nextTitle="Next: Upload Documents"
                  step="3"
                />
              </Box>
            </SharedElement>
            <SharedElement id="1" style={{ flex: 1 }}>
              <Box
                backgroundColor="white"
                rounded="xl"
                roundedBottom="none"
                pt={8}
                flex={1}
                // minHeight="100%"
                mt={5}
              >
                <ScrollView
                  _contentContainerStyle={{
                    flexGrow: 1,
                    px: 6,
                    pb: 8
                  }}
                >
                  <Pressable onPress={() =>{ __startCamera(); console.log("meow")}}>
                  {({ isHovered, isFocused, isPressed }) => {
                    return (
                      <Box bgColor={isPressed ? "blue.300" : "#2A6EFF"} rounded="xl" style={{
                        transform: [{
                          scale: isPressed ? 0.96 : 1
                        }]
                      }} p="4">
                    <Text textAlign="center" color="white" fontWeight="bold">Scan CNIC/Passport</Text>
                  </Box>
                    )
                  }}
                </Pressable>
                 
                  <Animated.View style={{ transform: [{ translateX }] }}>
                    {fieldsArray.map((item, i) => {
                      if (item.type == "Select") {
                        return (
                          <SelectField
                            key={item.id}
                            title={item.field_name}
                            name={item.name}
                            placeholder={item.place_holder}
                            handleChange={handleChange(item.name)}
                            errors={errors}
                            touched={touched}
                            selectValue={item.dropdown_values}
                            value={values[item.name]}
                            icon={
                              <MaterialIcons
                                name={item.icon.name}
                                size={item.icon.size}
                                color={item.icon.color}
                              />
                            }
                          />
                        )
                      } else if (item.type == "Input") {
                        return (
                          <InputFields
                          key={item.id}
                          title={item.field_name}
                          name={item.name}
                          placeholder={item.place_holder}
                          value={values[item.name]}
                          onChangeText={handleChange(item.name)}
                          onBlur={handleBlur(item.name)}
                          analysisOnFocus={() =>
                            analysis(item.name, moment(), moment())
                          }
                          analysisOnBlur={() =>
                            analysis(item.name, null, moment())
                          }
                          errors={errors}
                          touched={touched}
                          isValid={isValid}
                          icon={
                            <MaterialIcons
                            name={item.icon.name}
                            size={item.icon.size}
                            color={item.icon.color}
                          />
                          }
                        />
                        )
                      } else {
                        return <></>
                      }
                    })}
                   
                  </Animated.View>
                </ScrollView>
              </Box>
            </SharedElement>
            <Box justifyContent="flex-end">
              <SharedElement id="footer">
                <Stack
                  backgroundColor="#f7f7f7"
                  p={5}
                  direction="row"
                  space={5}
                >
                  <Button
                    flex={1}
                    size="md"
                    rounded="md"
                    backgroundColor="#f7f7f7"
                    border={1}
                    borderWidth="1"
                    borderColor="#f7f7f7"
                    _text={{
                      color: "#13B995"
                    }}
                    //mb={25}
                    // shadow={5}
                    onPress={
                      () =>
                        // navigation.goBack()
                        {
                          console.log(analytics)
                        }
                      // navigation.navigate("VerifyOTP")
                    }
                  >
                    I NEED HELP
                  </Button>
                  <Button
                    flex={1}
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
                      // navigation.navigate("Upload Documents"

                      // submitForm()
                      {
                        console.log(analytics)
                        handleSubmit()
                      }
                    }
                  >
                    CONFIRM
                  </Button>
                </Stack>
              </SharedElement>
            </Box>
            <LoadingModal
              message="Saving information. Please wait. Personal apge"
              showModal={showLoadingModal}
            />
          </Box>
        )
      }}
    </Formik>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  }
})

export default PersonalDetails
