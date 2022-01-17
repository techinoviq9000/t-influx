import { Box, CheckIcon, Text, Input, CloseIcon } from "native-base";
import React, { useState } from "react";

const InputFields = ({
  errors,
  fields,
  title,
  name,
  placeholder,
  handleChange = null,
  icon,
  onChangeText,
  onBlur,
  value,
  touched
}) => {
  console.log(touched['mobile_number'])
  console.log(errors['mobile_number'])
  return (
    <Box>
      <Text
        ml={12}
        pl={3}
        position="relative"
        top="25px"
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
        value={fields?.name}
        type="text"
        onChange={onChangeText}
        onBlur={onBlur}
        value={value}
        // onChange={(e) => handleChange(name, e)}
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
        // py={4}
        pt={6}
        px={4}
        borderColor={touched?.[name] && errors?.[name] ? "red.500" : "#a4ffc8"}
        borderRadius="lg"
        borderWidth={1}
        // "#13B995"
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
