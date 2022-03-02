import {
  Box,
  Button,
  HStack,
  Text,
  ScrollView,
  Stack,
  Pressable,
  Switch,
} from "native-base";
import React, { useState } from "react";

import { Formik } from "formik";
import * as yup from 'yup'
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialIcons,
} from "@expo/vector-icons";
import InputFields from "../CustomComponents/InputFields";
import StepHeader from "../CustomComponents/StepsHeader";
import SelectField from "../CustomComponents/SelectField";

const Services = ({ navigation }) => {
 
  const [communicateViaEmail, setcommunicateViaEmail] = useState(false);
  const [smsAlert, setsmsAlert] = useState(false);
  const [chequeBookShow, setChequeBookShow] = useState(false);
  const [atmCardShow, setAtmCardShow] = useState(false);
  const [zakatExemption, setzakatExemption] = useState(false);
  
  const registerValidationSchema = yup.object().shape({
    atmCard: yup
      .string()
      .required('Please Select'),
    chequeBook: yup
    .string()
    .required('Please Select'),
  })

  
    return (
      <Formik
      id="sign-in-button"
      initialValues={{ atmCard: "", chequeBook: "No Chequebook"}}
      validationSchema={registerValidationSchema}
      onSubmit={(values) => navigation.navigate("Personal Details")}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
      <Box flex={1} minHeight="100%" safeAreaTop={5}>
        <Box alignItems="flex-start" px={6} mt={6}>
        <Pressable>
      {({ isHovered, isFocused, isPressed }) => {
        return (
          <Ionicons
          name="arrow-back-circle-sharp"
          size={36}
          color={isFocused ? "#87e3ff" : "white"}
          onPress={
            () => navigation.goBack()
            // navigation.navigate("Welcome")
          }
        />
        )
      }}
    </Pressable>
        </Box>
        <Box alignItems="center">
          <StepHeader
            title="Services"
            nextTitle="Next: Personal Details"
            step="2"
          />
        </Box>
        <Box
          backgroundColor="white"
          rounded="xl"
          roundedBottom="none"
          pt={8}
          flex={1}
          // minHeight="100%"
          mt={5}
        >
          <ScrollView
            _contentContainerStyle={{
              flexGrow: 1,
              px: 6,
              pb: 8,
            }}
          >
            <Box>
              <Text mt={2} mb={1} fontSize={"sm"} fontWeight={"medium"}>
                Cheque Book Required?
              </Text>
              <HStack alignItems="center" space={2}>
                <Text color={chequeBookShow ? "black" : "#13B995"}>No</Text>
                <Switch
                  size="sm"
                  mb={0}
                  isChecked={chequeBookShow}
                  onToggle={() => {
                    setChequeBookShow(!chequeBookShow);
                    if(chequeBookShow) handleChange("chequeBook")(null)
                  }}
                />
                <Text color={chequeBookShow ? "#13B995" : "black"}>Yes</Text>
              </HStack>
              <SelectField
                isDisabled={!chequeBookShow}
                title={"Cheque Book Leafs"}
                name={"chequeBook"}
                handleChange={handleChange("chequeBook")}
                errors={errors}
                touched={touched}
                placeholder={"Select Cheque Book Leafs"}
                selectValue={["25", "50", "100"]}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              <Text mt={4} mb={2} fontSize={"sm"} fontWeight={"medium"}>
                ATM/Debit Card Required?
              </Text>
              <HStack alignItems="center" space={2}>
                <Text color={atmCardShow ? "black" : "#13B995"}>No</Text>
                <Switch
                  size="sm"
                  mb={0}
                  isChecked={atmCardShow}
                  onToggle={() => {
                    setAtmCardShow(!atmCardShow);
                  }}
                />
                <Text color={atmCardShow ? "#13B995" : "black"}>Yes</Text>
              </HStack>
              <SelectField
                isDisabled={!atmCardShow}
                title={"ATM / Debit Card"}
                name={"atmCard"}
                placeholder={"Select ATM / Debit Card"}
                handleChange={handleChange("atmCard")}
                errors={errors}
                touched={touched}
                selectValue={["Master Card", "Paypak"]}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              <Text mt={4} mb={2} fontSize={"sm"} fontWeight={"medium"}>
                Zakaat Exemption (If yes please upload zakat Affidavit)
              </Text>
              <HStack alignItems="center" space={2}>
                <Text color={zakatExemption ? "black" : "#13B995"}>No</Text>

                <Switch
                  size="sm"
                  mb={0}
                  isChecked={zakatExemption}
                  onToggle={() => {
                    setzakatExemption(!zakatExemption);
                  }}
                />
                <Text color={zakatExemption ? "#13B995" : "black"}>Yes</Text>
              </HStack>

              <Text mt={4} mb={2} fontSize={"sm"} fontWeight={"medium"}>
                SMS Alert
              </Text>
              <HStack alignItems="center" space={2}>
                <Text color={smsAlert ? "black" : "#13B995"}>No</Text>
                <Switch
                  size="sm"
                  mb={0}
                  isChecked={smsAlert}
                  onToggle={() => {
                    setsmsAlert(!smsAlert);
                  }}
                />
                <Text color={smsAlert ? "#13B995" : "black"}>Yes</Text>
              </HStack>
              <Text mt={4} mb={2} fontSize={"sm"} fontWeight={"medium"}>
                Communication via Email
              </Text>
              <HStack alignItems="center" space={2}>
                <Text color={communicateViaEmail ? "black" : "#13B995"}>
                  No
                </Text>
                <Switch
                  size="sm"
                  mb={0}
                  isChecked={communicateViaEmail}
                  onToggle={() => {
                    console.log(communicateViaEmail);
                    setcommunicateViaEmail(!communicateViaEmail);
                  }}
                />
                <Text color={communicateViaEmail ? "#13B995" : "black"}>
                  Yes
                </Text>
              </HStack>
            </Box>
          </ScrollView>
        </Box>
        <Box justifyContent="flex-end">
          <Stack backgroundColor="#f7f7f7" p={5} direction="row" space={5}>
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
                handleSubmit()
              }
            >
              I NEED HELP
            </Button>
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
              onPress={
                () =>

                  handleSubmit()
              }
            >
              CONFIRM
            </Button>
          </Stack>
        </Box>
      </Box>
     )}
     </Formik>
   );
};

export default Services;
