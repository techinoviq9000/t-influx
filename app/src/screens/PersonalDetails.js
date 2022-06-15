import {
  Box,
  Button,
  Text,
  ScrollView,
  Stack,
  Pressable,
  Divider,
  useToast,
  Image
} from "native-base"
import React, { useState } from "react"
import { nhost } from "../utils/nhost"
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
import { Camera } from "expo-camera"
import * as ImagePicker from "expo-image-picker"
import moment from "moment"
import { useFocusEffect } from "@react-navigation/native"
import INSERT_PERSONAL_DATA from "../Queries/INSERT_PERSONAL_DATA"
import { HASURA } from "../config"

const INSERT_CNIC_IMAGE = gql`
  mutation MyMutation($value: String, $field_id: Int!, $applicant_id: uuid!) {
    insert_data_table_one(
      object: {
        value: $value
        field_id: $field_id
        applicant_id: $applicant_id
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id } }
      }
    ) {
      id
    }
  }
`

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
  let applicant_id = applicantData?.applicant_id
  if (!applicant_id) {
    applicant_id = route?.params?.applicant_id
  }
  console.log(route?.params?.data, "meow")
  // const email = applicantData?.applicant.email;
  // const user_id = applicantData?.user_id;
  const toast = useToast()
  const [showLoadingModal, setShowLoadingModal] = useState(false)
  const [image, setImage] = useState("")
  const [imageDetails, setImageDetails] = useState({})
  const imageData = {
    customerName: "Muhammad Danish",
    fatherName: "Muhammad Hussain",
    gender: "Male",
    dob: "10.10.1995",
    doe: "15.01.2032",
    placeOfBirth: "Pakistan"
  }

  console.log(image.uri)
  const [insertCnicImage] = useMutation(INSERT_CNIC_IMAGE)
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
    initialValues[item.name] = ""
  })

  const __startCamera = async () => {
    try {
      //   const { status } = await MediaLibrary.requestPermissionsAsync()
      // if (status !== "granted") {
      //   alert("Sorry, we need camera roll permissions to make this work!");
      // }
      const { status: status2 } = await Camera.requestCameraPermissionsAsync()
      if (status2 !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!")
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        exif: true,
        quality: 0.5
      })
      if (!result.cancelled) {
        let localUri = result.uri
        let filename = localUri.split("/").pop()

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`
        const file = {
          uri: localUri,
          name: filename,
          type
        }

        let formData = new FormData()
        formData.append("file", file)

        //     const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }
        // // const res  = await http.post("/imageOCR", {data: "123"}, config)
        //   const res = await axios.post("http://45.249.8.201:5000/imageOCR", formData, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //   });
        // console.log(res.data.data)
        setImage(file)

        for (const [key, value] of Object.entries(imageData)) {
          initialValues[key] = value
          console.log(`${key}: ${value}`)
        }
        setImageDetails(imageData)
        // setErrorMessage("");
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Formik
      id="sign-in-button"
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={async (values) => {
        setShowLoadingModal(true)
        let variables = {}
        const file = image
        const res = await nhost.storage.upload({ file })
        console.log(res?.fileMetadata?.id, "res")
        let id = res?.fileMetadata?.id
        insertCnicImage({
          variables: {
            value: `${HASURA}/v1/storage/files/${id}`,
            applicant_id,
            field_id: 25
          }
        })
        fieldsArray.map((item, i) => {
          variables[item.name] = values[item.name]
          variables[`field_${item.id}`] = item.id
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
                  <Animated.View style={{ transform: [{ translateX }] }}>
                    {!image?.uri && (
                      <Pressable
                        onPress={() => {
                          __startCamera()
                        }}
                      >
                        {({ isHovered, isFocused, isPressed }) => {
                          return (
                            <Box
                              bgColor={
                                isPressed ? "emerald.200" : "emerald.400"
                              }
                              rounded="xl"
                              style={{
                                transform: [
                                  {
                                    scale: isPressed ? 0.96 : 1
                                  }
                                ]
                              }}
                              p="4"
                            >
                              <Text
                                textAlign="center"
                                color="white"
                                fontWeight="bold"
                              >
                                Scan CNIC
                              </Text>
                            </Box>
                          )
                        }}
                      </Pressable>
                    )}
                    {image?.uri && (
                      <Box>
                        <Text
                          textAlign="center"
                          fontSize="lg"
                          color="emerald.600"
                          fontWeight="bold"
                        >
                          Please Verify the details
                        </Text>
                      </Box>
                    )}
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
              message="Saving information. Please wait."
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
