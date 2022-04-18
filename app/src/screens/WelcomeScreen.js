import { Box, Button, Circle, Icon, Image, Pressable, Text } from "native-base"
import React, { useState, useEffect } from "react"
import moment from "moment"
import { gql, useQuery, useLazyQuery } from "@apollo/client"
import { ImageBackground, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { MaterialIcons } from "@expo/vector-icons"
import InputWelcomeScreen from "../CustomComponents/InputWelcomeScreen"
import LoadingModal from "../CustomComponents/LoadingModal"
import { http } from "../utils/http"

const GET_CNIC = gql`
  query GetCnic($cnic: String!) {
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
const VERSION = "1.0.1"
const WelcomeScreen = ({ navigation }) => {
  const [backspace, setBackspace] = useState(false)
  const [cnic, setCnic] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [getApplicant] = useLazyQuery(GET_CNIC, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    nextFetchPolicy: "network-only",
    onCompleted: async (data) => {
      setShowModal(false)
      const applicantData = data.applicants
      if (applicantData.length == 0) {
        navigation.navigate("Registration", {
          cnic: cnic.replace(/-/g,"")
        })
      } else {
        const updated_at = moment(new Date(), "DATETIME_LOCAL_SECONDS").toString()
        navigation.navigate("VerifyOTPLogin", {
          data: applicantData[0],
          updated_at: updated_at
        })
        // 2022-04-13T10:19:38.627806+00:00
        try {
          const res = await http.post("/sendVerifyLoginEmail", {
            email: data?.applicants[0].email
          })
          // console.log(res)
        } catch (e) {
          setShowModal(false)
          console.log(e)
        }
      }
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const changeText = (text) => {
    if(text.length == 5 && !backspace) {
      setCnic((prevState) => {
        if(prevState.length < text.length) {
          return text+"-"
        } else {
          return text
        }
      })
    } else if(text.length == 13 && !backspace) {
      setCnic((prevState) => {
        if(prevState.length < text.length) {
          return text+"-"
        } else {
          return text
        }
      })
    } else {
      setCnic(text)
    }
  }
  const changeTextOnBackPress = () => {
    return ({nativeEvent: {key: value}}) => {
      if(value == "Backspace") {
        let charAt = cnic.charAt(cnic.length-1)
        setBackspace(true)
        if(charAt != '-') {
          setBackspace(false)
        }
    }
  }
}
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setShowModal(false)
      setCnic("")
    })

    return unsubscribe
  }, [navigation])

  return (
    <Box alignItems="center" width="100%" minHeight="100%" safeAreaTop={5}>
      <Text fontSize="7xl" color="white" zIndex={1} mt={6}>
        T Influx
      </Text>
      <Text fontSize="xs" color="gray.100">Version: {VERSION}</Text>
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
        <InputWelcomeScreen
          title={"CNIC Number"}
          name={"cnic"}
          placeholder={"XXXXX-XXXXXXX-X"}
          value={cnic}
          onChangeText={(text) => changeText(text)}
          onKeyPress={changeTextOnBackPress()}
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
          isDisabled={cnic.replace(/-/g,"").length != 13}
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
                cnic: cnic.replace(/-/g,"")
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
