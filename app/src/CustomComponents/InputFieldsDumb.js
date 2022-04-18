import { Box, CheckIcon, Text, Input, CloseIcon } from "native-base";
import moment from "moment";
import React, { useState } from "react";

const InputFieldsDumb = ({
  fields,
  title,
  errors,
  name,
  placeholder,
  handleChange,
  icon
}) => {
  return (
    <Box width={{md: "400px"}}>
      <Text
        ml={12}
        pl={3}
        position="relative"
        top="25px"
        zIndex={10}
        color={"emerald.400"}
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
        onChangeText={handleChange}
        InputLeftElement={<Box pl="5">{icon}</Box>}
        pb={2}
        pt={6}
        px={4}
        borderColor={"emerald.200"}
        _focus={{
          borderColor: "emerald.400"
        }}
        borderRadius="lg"
        borderWidth={1}
      />
    </Box>
  );
};

export default InputFieldsDumb;
