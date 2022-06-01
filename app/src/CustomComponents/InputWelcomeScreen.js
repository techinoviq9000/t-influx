import { Box, CheckIcon, Text, Input, CloseIcon } from "native-base";
import moment from "moment";
import React, { useState } from "react";

const InputWelcomeScreen = ({
  title,
  name,
  placeholder,
  icon,
  onChangeText,
  onKeyPress,
  changeTextOnBackPress,
  value,
}) => {
  let length = value.replace(/-/g,"").length
  return (
    <Box width={{md: "400px"}}>
      <Text
        ml={12}
        pl={3}
        position="relative"
        top="25px"
        zIndex={10}
        color="white"
        fontSize="xs"
      >
        {title}
      </Text>
      <Input
        name={name}
        variant="unstyled"
        size="xl"
        placeholder={placeholder}
        color="white"
        selectionColor="white"
        placeholderTextColor="white"
        backgroundColor="white:alpha.20"
        type="text"
        autoComplete="tel"
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        value={value}
        keyboardType='phone-pad'
        InputRightElement={
          <>
           <Text pr={4} fontWeight="bold" color={length != 13 && length != 0 ? "red.300" : "white"}>{`${length}/13`}</Text>
          </>
        }
        InputLeftElement={<Box pl="5">{icon}</Box>}
        pb={2}
        pt={6}
        px={4}
        borderColor="white"
        _focus={{
            borderColor: "emerald.400"
        }}
        borderRadius="lg"
        borderWidth={1}
      />
    </Box>
  );
};

export default InputWelcomeScreen;
