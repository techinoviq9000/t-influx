import {
  Box,
  Button,
  Text,
  ScrollView,
  Stack,
  Pressable,
  Modal,
  Input,
} from "native-base";

import { BackHandler } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";

import { Ionicons } from "@expo/vector-icons";

import OtpFields from "../CustomComponents/OtpFields";
import StepHeader from "../CustomComponents/StepsHeader";
import LoadingModal from "../CustomComponents/LoadingModal";
import moment from "moment";
import CountDown from "react-native-countdown-component";

const VERIFY_OTP = gql`
  query verifyOTP($otp: String = "", $email: String = "") {
    applicants(
      where: { _and: [{ email: { _eq: $email } }, { otp: { _eq: $otp } }] }
    ) {
      cnic
      email
      mobile_number
      id
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation updateStatus($status: String = "", $email: String = "") {
    update_applicants(
      where: { email: { _eq: $email } }
      _set: { status: $status }
    ) {
      affected_rows
    }
  }
`;

const GET_CONFIG = gql`
  query getConfig {
    config {
      otp_expiry_duration
    }
  }
`;

const VerifyOTPRegister = ({ route, navigation }) => {
  const data = route?.params?.data?.insert_applicants_one;

  const getDifference = () => {
    const created_at = moment(data?.otp_created_time)
    let diffInMinutes = moment().diff(created_at, 'minutes');
    return diffInMinutes
  }
 
  const [getConfig, {data: config}] = useLazyQuery(GET_CONFIG)
  let expiryDuration = config?.config[0]?.otp_expiry_duration
  useEffect(() => {
    getConfig()
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => BackHandler.removeEventListener("hardwareBackPress", backHandler.remove());
  }, [])

  const [otpError, setOtpError] = useState(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const [updateApplicantStatus] = useMutation(UPDATE_STATUS, {
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "network-only",
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setShowLoadingModal(false);
      console.log(data);
      navigation.navigate("Basic Account Details") //navigate if otp correct
    },
    onError: (error) => {
      setShowLoadingModal(false);
      console.log(error);
      return setOtpError("Something went wrong");
    },
  });

  const [verifyOTP, { data: verifyOTPData, loading }] = useLazyQuery(
    VERIFY_OTP,
    {
      notifyOnNetworkStatusChange: true, 
      nextFetchPolicy: "network-only",
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        if (data.applicants.length < 1) { //If otp does not exist in db
          setShowLoadingModal(false);
          return setOtpError("Invalid OTP"); //Set otp error
        } else { //Otp exists
          setOtpError(null);
          updateApplicantStatus({ //Change status to approved
            variables: {
              // email: data.applicants[0].email,
              email: "asdas",
              status: "Approved",
            },
          });
          return console.log(data);
        }
      },
      onError: (error) => {
        setShowLoadingModal(false);
        console.log(error);
        return setOtpError("Something went wrong");
      },
    }
  );

  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState([
    {
      id: 0,
      value: "",
    },
    {
      id: 1,
      value: "",
    },
    {
      id: 2,
      value: "",
    },
    {
      id: 3,
      value: "",
    },
  ]);

  const applicationID = [
    { id: 0, value: "124ewdq32t", description: "This is 1" },
    { id: 1, value: "3dsfrq23r32af", description: "This is 2" },
    { id: 2, value: "31r8rufjwe283", description: "This is 3" },
  ];

  const firstOTP = useRef();
  const secondOTP = useRef();
  const thirdOTP = useRef();
  const fourthOTP = useRef();

  const otpArrayFields = [firstOTP, secondOTP, thirdOTP, fourthOTP];

  const handleChange = (inputValue, id, secondRef) => {
    setOtp(
      otp.map((item) => {
        if (item.id == id) {
          return { ...item, value: inputValue };
        } else {
          return { ...item };
        }
      })
    );
    if (inputValue.length == 1) {
      secondRef?.current.focus();
    }
  };
  let finalOTP = otp.map((otpItem) => otpItem.value).join("");

  const ModalOverlay = () => {
    return (
      <Modal isOpen={showModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Your Previous ApplicationID</Modal.Header>
          <Modal.Body>
            {applicationID.map((item) => (
              <Box key={item.id}>
                <Text>{item.value}</Text>
              </Box>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Continue Previous
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                  // onPress={() =>
                  //   // navigation.goBack()
                  navigation.navigate("Basic Account Details");
                  // }
                }}
              >
                New Application
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
                  () => {
                    navigation.navigate({
                      name: "Registration",
                      params: route.params.data,
                    });
                  }
                  // navigation.navigate("Welcome")
                }
              />
            );
          }}
        </Pressable>
      </Box>
      <Box alignItems="center">
        {route?.params?.fromRegister ? (
          <StepHeader title="Verify OTP" />
        ) : (
          <StepHeader
            title="Verify OTP"
            nextTitle="Next: Personal Details"
            step="2"
          />
        )}
      </Box>
      <Box
        backgroundColor="white"
        rounded="xl"
        roundedBottom="none"
        py={8}
        flex={1}
        // minHeight="100%"
        mt={5}
        px={6}
      >
        <ScrollView
          _contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="never"
        >
          <Box>
            <Stack
              direction="row"
              space={5}
              flex={1}
              justifyContent="center"
              mt={2}
              mb={5}
            >
              {otpArrayFields.map((item, index) => {
                const nextRef = otpArrayFields[index + 1];
                if (nextRef) {
                  return (
                    <OtpFields
                      otpRef={item}
                      secondRef={nextRef}
                      otp={otp}
                      handleChange={handleChange}
                      key={index}
                      index={index}
                    />
                  );
                }
              })}
              <Input
                ref={fourthOTP}
                variant="unstyled"
                value={otp[3].value}
                onChange={(e) => handleChange(e.nativeEvent.text, otp[3].id)}
                size="xl"
                py={5}
                // px={6}
                textAlign="center"
                borderColor={otp[3].value ? "#13B995" : "white"}
                backgroundColor="white"
                borderRadius="lg"
                borderWidth={1}
                color="black"
                width={16}
                shadow={4}
                mb={4}
                maxLength={1}
                fontSize="4xl"
                keyboardType="numeric"
                type="text"
                _focus={{
                  borderColor: "#13B995",
                }}
              />
            </Stack>
            <Box>
              <Text color="#13B995" fontSize="md" textAlign="center">
                The OTP has been sent on your email address{" "}
                <Text fontWeight="bold">{data?.email}</Text>
              </Text>
              {otpError && (
                <Text
                  color="red.500"
                  fontSize="md"
                  mt="2"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {otpError}
                </Text>
              )}
              <CountDown
        until={60*2}
        onFinish={() => alert('finished')}
        onPress={() => alert('hello')}
        size={20}
      />
            </Box>
          </Box>
        </ScrollView>
      </Box>
      <Box justifyContent="flex-end">
        <Stack backgroundColor="#f7f7f7" p={5} direction="row" space={5}>
          <Button
            flex={1}
            size="md"
            rounded="md"
            backgroundColor="#f7f7f7"
            border={1}
            borderWidth="1"
            borderColor="#f7f7f7"
            _text={{
              color: "#13B995",
            }}
            //mb={25}
            // shadow={5}
            onPress={() =>
              // navigation.goBack()
              navigation.navigate("Continue Application")
            }
          >
            RESEND OTP
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
            onPress={() => {
              if(parseInt(getDifference()) >= parseInt(expiryDuration)) {
                console.log(getDifference())
                console.log(expiryDuration)
                setOtpError("OTP Expired")
              } else {
              setShowLoadingModal(true);
                verifyOTP({
                  variables: {
                    email: data.email,
                    otp: finalOTP.toString(),
                  },
                });
              }
              
            }}
          >
            CONFIRM
          </Button>
        </Stack>
      </Box>
      <LoadingModal showModal={showLoadingModal} />
      <ModalOverlay />
    </Box>
  );
};

export default VerifyOTPRegister;
