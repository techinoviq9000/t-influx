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

const SelectFieldNoFormik = ({
  title,
  placeholder,
  selectValue,
  isDisabled = false,
  icon,
  errors,
  value,
  name,
  handleChange,
}) => {
    return (
      <Box>
        <FormControl
          isRequired
          _focus={{
            borderColor: "#13B995",
          }}
        >
          <Text
            ml={12}
            pl={3}
            position="relative"
            top="25px"
            fontSize="xs"
            color={errors?.[name] ? "red.500" : "#13B995"}
            zIndex={10}
          >
            {title}
          </Text>
          <Select
            isDisabled={isDisabled}
            InputLeftElement={<Box pl="5">{icon}</Box>}
            borderColor={
              errors?.[name] ? "red.500" : "#a4ffc8"
            }
            _focus={{
              borderColor: `${
                errors?.[name] ? "red.500" : "#13B995"
              }`,
            }}
            borderRadius="lg"
            borderWidth={1}
            selectedValue={value}
            InputRightElement={
              <>
                {errors?.[name] ? (
                  <CloseIcon size="5" mt="0.5" color="red.500" mr="4" />
                ) : (
                  <></>
                )}
                <ChevronDownIcon size="5" color="#13B995" mr="2" />
              </>
            }
            fontSize="18px"
            accessibilityLabel={placeholder}
            placeholder={placeholder}
            placeholderTextColor="#ccc"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size={5} />,
              fontSize: "xs",
            }}
            onValueChange={(itemValue) => handleChange(itemValue, name)}
            pb={2}
            style={{ fontSize: "14px" }}
            // py={4}
            pt={6}
            px={4}
          >
            {selectValue.map((value, index) => (
              <Select.Item key={`${value}-${index}`} label={value} value={value} />
            ))}
          </Select>
        </FormControl>
        {errors?.[name] && (
          <Text color="red.500" mt={2} ml={5}>
            {errors?.[name]}
          </Text>
        )}
      </Box>
    );
};

export default SelectFieldNoFormik;
