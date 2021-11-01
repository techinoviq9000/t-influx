// import { Box, Button, Image, Text } from "native-base";
// import React from "react";
// import { ImageBackground, StyleSheet, View } from "react-native";
// import { SharedElement } from "react-navigation-shared-element";

// export default function Background(props) {
//   return (
//     <Box
//       width="100%"
//       height="100%"
//       // zIndex="-5"
//       alignItems="center"
//       bg={{
//         linearGradient: {
//           colors: ["#13B995", "#317F6E"],
//           // colors: ["#FFFFFF", "#FFFFFF"],
//           start: [0.3, 0],
//           end: [1, 0.1],
//           locations: [0.5, 0.5],
//         },
//       }}
//     >
//       <Box
//         width="100%"
//         height="100%"
//         alignItems="center"
//         position="absolute"
//         bg={{
//           linearGradient: {
//             colors: ["#13B995", "#5D7D76", "#317F6E"],
//             start: [0.9, 0],
//             end: [1, 0.1],
//             locations: [0.4, 0.9, 1],
//           },
//         }}
//         opacity={0.8}
//       ></Box>
//       {props.children}
//     </Box>
//   );
// }

import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";


export default function Background(props) {
  return (
  <View style={styles.container}>
    <ImageBackground source={require('../assets/background.jpg')} resizeMode="cover" style={styles.image}>
      {/* <Text style={styles.text}>Inside</Text> */}
      {props.children}
    </ImageBackground>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  }
});