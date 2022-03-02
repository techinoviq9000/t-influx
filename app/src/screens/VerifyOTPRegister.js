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
import React, { useRef, useState } from "react";


import { Ionicons } from "@expo/vector-icons";

import OtpFields from "../CustomComponents/OtpFields";
import StepHeader from "../CustomComponents/StepsHeader";

const VerifyOTPRegister = ({ route, navigation }) => {
  console.log(route.params);
 

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
          <Modal.Body>{applicationID.map(item => (<Box key={item.id}><Text>{item.value}</Text></Box>))}</Modal.Body>
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
              navigation.navigate("Basic Account Details")
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
            () => navigation.goBack()
            // navigation.navigate("Welcome")
          }
        />
        )
      }}
    </Pressable>
        </Box>
        <Box alignItems="center">
          {route.params.fromRegister ? (
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
                <Text color="#13B995" fontSize="lg" textAlign="center">
                  The OTP has been sent on your registered mobile number
                  +92********75
                </Text>
                <Text
                  color="red.500"
                  fontSize="lg"
                  fontWeight="bold"
                  textAlign="center"
                >
                  OOPS! THE OTP SEEMS TO BE INCORRECT
                </Text>
                <Text
                  color="red.500"
                  fontSize="lg"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {finalOTP}
                </Text>
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
              onPress={() =>
                // navigation.goBack()
                navigation.navigate("Basic Account Details")
              }
              // onPress={() => setShowModal(true)}
            >
              CONFIRM
            </Button>
          </Stack>
        </Box>
        <ModalOverlay />
      </Box>
    );
};


export default VerifyOTPRegister;
