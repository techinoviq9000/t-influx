import {
  Box,
  CheckIcon,
  Text,
  Input,
  CloseIcon,
} from "native-base";
import React, { useState } from "react";

const InputFields = ({errors, fields, title, name, placeholder, handleChange, icon}) => {
  return (
    <Box>
      <Text
        ml={12}
        pl={3}
        position="relative"
        top={8}
        color={errors?.[`${name}`] ? "red.500" : "#13B995"}
      >
        {title}
      </Text>
      <Input
        name={name}
        variant="unstyled"
        size="xl"
        placeholder={placeholder}
        color="black"
        placeholderTextColor="#ccc"
        value={fields?.[`${name}`]}
        type="text"
        onChange={(e) => handleChange(name, e)}
        InputRightElement={
          <>
            {errors?.[`${name}`] ? (
              <CloseIcon size="5" mt="0.5" color="red.500" mr="4" />
            ) : errors?.[`${name}Active`] ? (
              <CheckIcon size="5" mt="0.5" color="emerald.500" mr="4" />
            ) : (
              <></>
            )}
          </>
        }
        InputLeftElement={
          <Box pl="5">
            {icon}
          </Box>
        }
        pb={3}
        pt={7}
        px={4}
        borderColor={errors?.[`${name}`] ? "red.500" : "#a4ffc8"}
        borderRadius="lg"
        borderWidth={1}
        // "#13B995"
        _focus={{
          borderColor: `${errors?.[`${name}`] ? "red.500" : "#13B995"}`,
        }}
      />
      {errors?.[`${name}`] && (
        <Text color="red.500" mt={2} ml={5}>
          {errors?.[`${name}`]}
        </Text>
      )}
    </Box>
  );
};

export default InputFields;
