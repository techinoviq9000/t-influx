import { Box, Button, Image, Text } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

export default function Background(props) {
  return (
    <Box
      width="100%"
      height="100%"
      alignItems="center"
      bg={{
        linearGradient: {
          colors: ["#13B995", "#317F6E"],
          // colors: ["#FFFFFF", "#FFFFFF"],
          start: [0.3, 0],
          end: [1, 0.1],
          locations: [0.5, 0.5],
        },
      }}
      _text={{
        fontSize: "md",
        fontWeight: "medium",
        color: "warmGray.50",
        textAlign: "center",
      }}
    >
      <Box
        width="100%"
        height="100%"
        alignItems="center"
        position="absolute"
        bg={{
          linearGradient: {
            colors: ["#13B995", "#5D7D76", "#317F6E"],
            start: [0.9, 0],
            end: [1, 0.1],
            locations: [0.4, 0.9, 1],
          },
        }}
        opacity={0.8}
      ></Box>
      {props.children}
    </Box>
  );
}
