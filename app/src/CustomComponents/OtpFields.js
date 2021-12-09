import {
  Box,
  CheckIcon,
  Text,
  Input,
  CloseIcon,
} from "native-base";
import React, { useState } from "react";

const OtpFields = ({otpRef, secondRef, otp, handleChange, index}) => {
  return (
    <Input
    ref={otpRef}
    returnKeyType="next"
    onSubmitEditing={() => {secondRef.current.focus()}}
    variant="unstyled"
    value={otp[index].value}
    onChange={(e) => handleChange(e.nativeEvent.text, otp[index].id, secondRef)}
    size="xl"
    py={5}
    // px={6}
    textAlign="center"
    borderColor={otp[index].value ? "#13B995" : "white"}
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
  );
};

export default OtpFields;
