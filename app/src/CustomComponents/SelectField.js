import {
  Box,
  CheckIcon,
  Text,
  Input,
  CloseIcon,
  FormControl,
  Select,
  WarningOutlineIcon,
  ChevronDownIcon,
} from "native-base";
import React, { useState } from "react";

const SelectField = ({
  errors,
  fields,
  title,
  name,
  placeholder,
  handleChange,
  selectValue,
  isDisabled = false,
  icon,
}) => {
  return (
    <Box>
      <FormControl
        isInvalid={false}
        isRequired
        _focus={{
          borderColor: "#13B995",
        }}
      >
        <Text ml={12} pl={3} position="relative" top="25px" fontSize="xs" color={"#13B995"} zIndex={10}>
          {title}
        </Text>
        <Select
        isDisabled={isDisabled}
          InputLeftElement={<Box pl="5">{icon}</Box>}
          borderColor={"#a4ffc8"}
          borderRadius="lg"
          borderWidth={1}
          // "#13B995"
          fontSize="18px"
          accessibilityLabel={placeholder}
          placeholder={placeholder}
          // placeholderTextColor="#ccc"
          
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size={5} />,
            fontSize: "xs"
          }}
          pb={2}
          style={{fontSize: "14px"}}
          // py={4}
          pt={6}
          px={4}
        >
          {selectValue.map(value => (
            <Select.Item label={value} value={value} />
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectField;