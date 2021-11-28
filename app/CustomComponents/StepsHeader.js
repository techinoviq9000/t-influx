import {
  Box,
  CheckIcon,
  Text,
  Input,
  CloseIcon,
  Stack,
  Center,
} from "native-base";
import React, { useState } from "react";

const StepHeader = ({title, nextTitle, step}) => {
  return (
    <Stack direction="row" px={6} alignItems="center">
    <Box flex={1}>
      <Text
        fontSize="2xl"
        color="white"
        fontWeight="medium"
        lineHeight="xs"
        mt={2}
      >
        {title}
      </Text>
      {nextTitle && <Text
        fontSize="xl"
        color="#ccc"
        fontWeight="medium"
        lineHeight="xs"
        mt={2}
      >
        {nextTitle}
      </Text>}
    </Box>
    <Center
      borderColor="#a6dfd2"
      borderWidth="6"
      borderRadius="full"
      height="20"
      width="20"
    >
      <Text color="white">{step} of 5</Text>
    </Center>
  </Stack>
  );
};

export default StepHeader;
