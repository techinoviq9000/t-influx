import { Box, CheckIcon, Text, Input, CloseIcon } from "native-base";
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
        color={touched?.[name] && errors?.[name] ? "red.500" : "#13B995"}
        fontSize="xs"
      >
        {title}
      </Text>
      <Input
        name={name}
        variant="unstyled"
        size="md"
        placeholder={placeholder}
        color="black"
        placeholderTextColor="#ccc"
        type="text"
        onChange={onChangeText}
        onBlur={onBlur}
        value={value}
        InputRightElement={
          <>
            {touched?.[name] && errors?.[name] ? (
              <CloseIcon size="5" mt="0.5" color="red.500" mr="4" />
            ) : touched?.[name] ? (
              <CheckIcon size="5" mt="0.5" color="emerald.500" mr="4" />
            ) : (
              <></>
            )}
          </>
        }
        InputLeftElement={<Box pl="5">{icon}</Box>}
        pb={2}
        pt={6}
        px={4}
        borderColor={touched?.[name] && errors?.[name] ? "red.500" : "#a4ffc8"}
        borderRadius="lg"
        borderWidth={1}
        _focus={{
          borderColor: `${touched?.[name] && errors?.[name] ? "red.500" : "#13B995"}`,
        }}
      />
      {touched?.[name] && errors?.[name] && (
        <Text color="red.500" mt={2} ml={5}>
          {errors?.[name]}
        </Text>
      )}
    </Box>
  );
};

export default InputFields;
