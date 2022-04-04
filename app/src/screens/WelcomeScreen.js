import { Box, Button, Circle, Icon, Image, Pressable, Text } from "native-base"
import React, { useState, useEffect } from "react"

import { gql, useQuery, useLazyQuery } from "@apollo/client"
import { ImageBackground, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { MaterialIcons } from "@expo/vector-icons"
import InputFieldsNoFormik from "../CustomComponents/InputFieldsNoFormik"
import LoadingModal from "../CustomComponents/LoadingModal"
import { http } from "../utils/http"

const GET_CNIC = gql`
  query GetCnic($cnic: String = "4230161551219") {
    applicants(where: { cnic: { _eq: $cnic } }) {
      id
      email
      mobile_number
      cnic
      applicant_ids {
        applicant_id
      }
    }
  }
`

const WelcomeScreen = ({ navigation }) => {
  const [cnic, setCnic] = useState("4230161551228")
  const [showModal, setShowModal] = useState(false)
  const [getApplicant] = useLazyQuery(GET_CNIC, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    onCompleted: async (data) => {
      setShowModal(false)
      const applicantData = data.applicants
      if (applicantData.length == 0) {
        navigation.navigate("Registration", {
          cnic
        })
      } else {
        try {
          const res = await http.post("/sendVerifyLoginEmail", {
            email: data?.email
          })
          navigation.navigate("VerifyOTPLogin", {
            data: data.applicants[0]
          })
        } catch (e) {
          console.log(e)
        }
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // setShowModal(false)
      setCnic("4230161551211")
    })

    return unsubscribe
  }, [navigation])

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
        <InputFieldsNoFormik
          title={"CNIC Number"}
          name={"cnic"}
          placeholder={"XXXXX-XXXXXXX-X"}
          value={cnic}
          onChangeText={(text) => setCnic(text)}
          icon={
            <Icon
              as={MaterialIcons}
              name="credit-card"
              size="23"
              color="white"
            />
          }
        />
        {/* <Button
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
          </Button> */}
        <Button
          size="md"
          rounded="md"
          shadow={5}
          mt={5}
          backgroundColor="white"
          isDisabled={cnic.length != 13}
          _disabled={{
            backgroundColor: "gray.400"
          }}
          _text={{
            color: "darkBlue.900"
          }}
          // onPress={() => navigation.navigate("RegisterRoute")}
          onPress={() => {
            setShowModal(true)

            getApplicant({
              variables: {
                cnic
              }
            })
          }}
        >
          GET STARTED
        </Button>
      </Box>
      <StatusBar translucent backgroundColor={"transparent"} style="light" />
      <LoadingModal
        message="Checking account information"
        showModal={showModal}
      />
    </Box>
  )
}

export default WelcomeScreen
