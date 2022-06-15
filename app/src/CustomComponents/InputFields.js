import { Box, CheckIcon, Text, Input, CloseIcon } from "native-base";
import moment from "moment";
import React, { useState } from "react";

const InputFields = ({
  errors,
  title,
  name,
  placeholder,
  icon,
  onChangeText,
  onBlur,
  value,
  analysisOnFocus,
  analysisOnBlur,
  isValid,
  touched
}) => {
  return (
    <Box width={{md: "400px"}}>
      <Text
        ml={12}
        pl={3}
        position="relative"
        top="25px"
        zIndex={10}
        color={errors?.[name] ? "red.500" : "emerald.400"}
        fontSize="xs"
      >
        {title}
      </Text>
      <Input
        name={name}
        variant="unstyled"
        size="xl"
        placeholder={placeholder}
        color="darkBlue.900"
        placeholderTextColor="#ccc"
        type="text"
        autoComplete={name}
        onChangeText={onChangeText}
        onBlur={(e) => {onBlur(e); analysisOnBlur(name, null, moment())}}
        onFocus={() => analysisOnFocus(name, moment(), moment())}
        value={value}
        InputRightElement={
          <>
            {errors?.[name] ? (
              <CloseIcon size="5" mt="0.5" color="red.500" mr="4" />
            ) : (
              <></>
            )}
          </>
        }
        InputLeftElement={<Box pl="5">{icon}</Box>}
        pb={2}
        pt={6}
        px={4}
        borderColor={errors?.[name] ? "red.500" : "emerald.200"}
        borderRadius="lg"
        borderWidth={1}
        _focus={{
          borderColor: `${errors?.[name] ? "red.500" : "emerald.400"}`,
        }}
      />
      {errors?.[name] && (
        <Text color="red.500" mt={2} ml={5}>
          {errors?.[name]}
        </Text>
      )}
    </Box>
  );
};

export default InputFields;
