import {
    Button,
  } from "native-base";
  import React, { useState } from "react";
  
  const BtnNext = ({handleSubmit, children}) => {
    return (
        <Button
                flex={1}
                size="md"
                rounded="md"
                backgroundColor="#317F6E"
                border={1}
                borderWidth="1"
                borderColor="white"
                //mb={25}
                // shadow={5}
                onPress={() => {
                  handleSubmit()
                }
                }
              >
                {children}
              </Button>
    );
  };
  
  export default BtnNext;
  