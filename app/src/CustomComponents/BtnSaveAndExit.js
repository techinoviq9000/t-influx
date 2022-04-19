import {
    Button,
  } from "native-base";
  import React, { useState } from "react";
  
  const BtnSaveAndExit = ({navigation, toNavigate, children}) => {
    return (
        <Button
        flex={1}
        size="md"
        rounded="md"
        backgroundColor="#f7f7f7"
        border={1}
        borderWidth="1"
        borderColor="#f7f7f7"
        _text={{
          color: "#13B995",
        }}
        //mb={25}
        // shadow={5}
        onPress={() =>
          // navigation.goBack()
          navigation.navigate(toNavigate)
        }
      >
        {children}
      </Button>
    );
  };
  
  export default BtnSaveAndExit;
  