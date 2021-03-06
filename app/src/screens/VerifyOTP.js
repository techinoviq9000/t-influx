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

import { BackHandler, Animated, Easing } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { SharedElement } from "react-navigation-shared-element";
import { Ionicons } from "@expo/vector-icons";

import OtpFields from "../CustomComponents/OtpFields";
import StepHeader from "../CustomComponents/StepsHeader";
import LoadingModal from "../CustomComponents/LoadingModal";
import moment from "moment";
import CountDown from "react-native-countdown-component";
import { http } from "../utils/http";
import { useFocusEffect } from "@react-navigation/native";

const VERIFY_OTP = gql`
  query verifyOTP($otp: String = "", $cnic: String = "") {
    applicants(
      where: { _and: [{ cnic: { _eq: $cnic } }, { otp: { _eq: $otp } }] }
    ) {
      cnic
      email
      mobile_number
      id
    }
  }
`;

const UPDATE_STATUS = gql`
  mutation updateStatus($status: String = "", $cnic: String = "") {
    update_applicants(
      where: { cnic: { _eq: $cnic } }
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

const INSERT_APPLICANT_ID = gql`mutation insertApplicantId($user_id: Int!) {
  insert_applicant_id_one(object: {user_id: $user_id}) {
    applicant_id
    user_id
    applicant {
      email
    }
  }
}

`

const VerifyOTP = ({ route, navigation }) => {
  const data = route?.params?.data?.insert_applicants_one;
  const mountedAnimation = React.useRef(new Animated.Value(0)).current
  const translateX = React.useRef(new Animated.Value(500)).current
  const [updated_at, setUpdated_at] = useState(null)
  const [disabled, setDisabled] = useState(true);
  const [countDownId, setCountDownId] = useState(1);
  const getDifference = () => {
    const created_at = updated_at ? moment(updated_at) : moment(data?.updated_at)
    let diffInMinutes = moment().diff(created_at, "minutes");
    return Math.abs(diffInMinutes);
  };

  const [getConfig, { data: config }] = useLazyQuery(GET_CONFIG);
  const [insertApplicantId] = useMutation(INSERT_APPLICANT_ID, {
    onCompleted: data => {
      setShowLoadingModal(false);
      navigation.navigate("Get Started", {
        data
      }); //navigate if otp correct
    },
    onError: (error) => {
      setShowLoadingModal(false);
      console.log(error);
      return setOtpError("Something went wrong");
    }
  });
  let expiryDuration = config?.config[0]?.otp_expiry_duration;
  useEffect(() => {
    getConfig();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () =>
      BackHandler.removeEventListener(
        "hardwareBackPress",
        backHandler.remove()
      );
  }, []);

  const [otpError, setOtpError] = useState(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const [updateApplicantStatus] = useMutation(UPDATE_STATUS, {
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "network-only",
    fetchPolicy: "network-only",
    onCompleted: data  => {
      insertApplicantId({
          variables: {
            user_id: verifyOTPData.applicants[0].id
          }
      })
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
        if (data.applicants.length < 1) {
          //If otp does not exist in db
          setShowLoadingModal(false);
          clearOTP();
          return setOtpError("Invalid OTP"); //Set otp error
        } else {
          //Otp exists
          setOtpError(null);
          updateApplicantStatus({
            //Change status to approved
            variables: {
              cnic: data.applicants[0].cnic,
              status: "Approved",
            },
          });
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
  const clearOTP = () => {
    setOtp([
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
    firstOTP.current.focus();
  };
  const resendOTP = async () => {
    try {
      setShowLoadingModal(true);
      setOtpError(null);
      clearOTP();
      const res = await http.post("/resendOTPEmail", {
        email: data?.email,
      });
      setUpdated_at(res.data.data)
      setCountDownId((prevState) => {
        return prevState + 1;
      });
      setShowLoadingModal(false);
    } catch (e) {
      setShowLoadingModal(false);
      clearOTP();
      setOtpError("Something went wrong");
      console.log(e);
    }
  };

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
  };

  const animateFront = () => {
    translationX(-500, 500, 0)
};


  useFocusEffect(
    React.useCallback(() => {
      Animated.parallel([
        translationX(0, 50),
      ]).start()
    }, [])
  );

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
      <SharedElement id="backButton1">
        <Pressable>
          {({ isHovered, isFocused, isPressed }) => {
            return (
              <Ionicons
                name="arrow-back-circle-sharp"
                size={36}
                color={isFocused ? "#87e3ff" : "white"}
                onPress={
                  () => {
                    animateBack()
                    setTimeout(() => {
                      navigation.navigate("Welcome");                      
                    }, 200);
                  }
                  // navigation.navigate("Welcome")
                }
              />
            );
          }}
        </Pressable>
        </SharedElement>
      </Box>
      <SharedElement id="stepHeader">
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
      </SharedElement>
      <SharedElement id="1" style={{flex: 1}}>
      <Box backgroundColor="white"
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
          }}
          keyboardShouldPersistTaps="never"
        >
          <Animated.View style={{transform:[{translateX}]}}>
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
                borderColor={otp[3].value ? "#13B995" : "gray.300"}
                backgroundColor="white"
                borderRadius="lg"
                borderWidth={1}
                color="black"
                width={16}
                mb={4}
                maxLength={1}
                fontSize="4xl"
                keyboardType="phone-pad"
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
              <Box margin="auto" mt="2">
                <CountDown
                  until={60 * 2}
                  id={`${countDownId}`}
                  timeToShow={["M", "S"]}
                  digitStyle={{ width: "auto", height: "auto" }}
                  showSeparator={true}
                  digitTxtStyle={{ color: "white" }}
                  separatorStyle={{
                    padding: 0,
                    color: "white",
                    marginBottom: 2,
                  }}
                  timeLabels={false}
                  style={{
                    backgroundColor: "#34d399",
                    width: 70,
                    borderRadius: 50,
                  }}
                  size={15}
                  onFinish={() => setDisabled(false)}
                />
              </Box>
            </Box>
          </Animated.View>
        </ScrollView>
        </Box>
      </SharedElement>
      <Box justifyContent="flex-end">
      <SharedElement id="footer">
        <Stack backgroundColor="#f7f7f7" p={5} direction="row" space={5}>
        
          <Button
            flex={1}
            size="md"
            rounded="md"
            backgroundColor="#f7f7f7"
            border={1}
            disabled={disabled}
            borderWidth="1"
            borderColor="#f7f7f7"
            _text={
              !disabled
                ? {
                    color: "#13B995",
                    fontWeight: "bold",
                  }
                : {
                    color: "rgba(155,155,155,0.5)",
                  }
            }
            //mb={25}
            // shadow={5}
            onPress={
              () => {
                resendOTP();
                setDisabled(true);
              // navigation.navigate("Basic Account Details")
              }
              // navigation.goBack()
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
            isDisabled={finalOTP.toString().length != 4}
            _disabled={{
              backgroundColor: "gray.400"
            }}
            _text={{
              color: "white"
            }}
            onPress={() => {
              if (parseInt(getDifference()) >= parseInt(expiryDuration)) {
                clearOTP();
                setOtpError("OTP Expired");
              } else {
                setShowLoadingModal(true);
                verifyOTP({
                  variables: {
                    cnic: data.cnic,
                    otp: finalOTP.toString(),
                  },
                });
              }
            }}
          >
            CONFIRM
          </Button>
        </Stack>
        </SharedElement>
      </Box>
      <LoadingModal message="Saving information. Please wait." showModal={showLoadingModal} />
      <ModalOverlay />
    </Box>
  );
};

export default VerifyOTP;
