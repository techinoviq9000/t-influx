import {
  Box,
  Button,
  HStack,
  Text,
  ScrollView,
  Stack,
  Pressable,
  Switch,
  useToast
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
import { gql, useMutation } from "@apollo/client";
import LoadingModal from "../CustomComponents/LoadingModal";
import SelectFieldNoFormik from "../CustomComponents/SelectFieldNoFormik";


const INSERT_DATA = gql`
mutation MyMutation(
  $value_1: String
  $field_id_1: Int!
  $applicant_id_1: uuid!
  $value_2: String
  $field_id_2: Int!
  $applicant_id_2: uuid!
) {
  one: insert_data_table_one(
    object: {
      value: $value_1
      field_id: $field_id_1
      applicant_id: $applicant_id_1
    },
    on_conflict: {constraint: data_table_field_id_applicant_id_key, update_columns: value, where: {field_id: {_eq: $field_id_1}}}
  ) {
    id
  }
  two: insert_data_table_one(
    object: {
      value: $value_2
      field_id: $field_id_2
      applicant_id: $applicant_id_2
    },
    on_conflict: {constraint: data_table_field_id_applicant_id_key, update_columns: value, where: {field_id: {_eq: $field_id_2}}}
  ) {
    id
  }
}
`;

const Services = ({ route, navigation }) => {
  const fieldsArray = route?.params?.fields;
  const applicantData = route?.params?.data;
  const applicant_id = applicantData?.applicant_id;
  // const email = applicantData?.applicant.email;
  // const user_id = applicantData?.user_id;
  const toast = useToast();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [insertData, { data }] = useMutation(INSERT_DATA, {
    onCompleted: (data) => {
      setShowLoadingModal(false);
      navigation.navigate("Personal Details", {
        data: applicantData,
        fields: fieldsArray
      })
    },
    onError: (error) => {
      setShowLoadingModal(false);
      console.log(error);
      toast.show({
        title: "Error",
        placement: "top",
        status: "error",
        description: "Unable to proceed. Please contact support at support@techinoviq.com"
      })
    },
  });
  const [communicateViaEmail, setcommunicateViaEmail] = useState(false);
  const [smsAlert, setsmsAlert] = useState(false);
  const [chequeBookShow, setChequeBookShow] = useState(false);
  const [atmCardShow, setAtmCardShow] = useState(false);
  const [zakatExemption, setzakatExemption] = useState(false);
  const [formValues, setFormValues] = useState({atmCard: null, chequeBook: null})
  const [errors, setErrors] = useState({})
  const handleChange = (value, name) => {
    setFormValues({...formValues, [name]: value })
    setErrors({...errors, [name]: null})
    console.log(value, name)
  }

  const handleSubmit = () => {
    let tempError = {}
    console.log(formValues);
    if(chequeBookShow && !formValues.chequeBook) {
      tempError.chequeBook = "Please select chequebook"
    }
    if(atmCardShow && !formValues.atmCard) {
      tempError.atmCard= "Please select atm card"
    }
    setErrors(tempError)

    if(Object.keys(tempError).length < 1) {
      const vairables = {}
      if(formValues.chequeBook != "") {vairables.value_1 = formValues.chequeBook}
      if(formValues.atmCard != "") {vairables.value_2 = formValues.atmCard}
      vairables.field_id_1= fieldsArray[4].id,
      vairables.field_id_2= fieldsArray[5].id,
      vairables.applicant_id_1= applicant_id,
      vairables.applicant_id_2= applicant_id,

      insertData({
        variables: vairables
      })
    }
  }
    return (
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
                onTrackColor="emerald.300" onThumbColor="emerald.600"

                  mb={0}
                  isChecked={chequeBookShow}
                  onToggle={() => {
                    setChequeBookShow(!chequeBookShow);
                    if(chequeBookShow) handleChange("", "chequeBook")
                  }}
                />
                <Text color={chequeBookShow ? "#13B995" : "black"}>Yes</Text>
              </HStack>
              <SelectFieldNoFormik
                title={fieldsArray[4].field_name}
                name={"chequeBook"}
                placeholder={fieldsArray[4].place_holder}
                handleChange={handleChange}
                isDisabled={!chequeBookShow}
                errors={errors}
                selectValue={chequeBookShow ? fieldsArray[4].dropdown_values : []}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              <Text mt={4} mb={2} fontSize={"sm"} fontWeight={"medium"}>
                ATM/Debit Card Required?
              </Text>
              <HStack alignItems="center" space={2}>
                <Text color={atmCardShow ? "black" : "#13B995"}>No</Text>
                <Switch
                  size="sm"
                onTrackColor="emerald.300" onThumbColor="emerald.600"

                  mb={0}
                  isChecked={atmCardShow}
                  onToggle={() => {
                    setAtmCardShow(!atmCardShow);
                    if(atmCardShow) handleChange("", "atmCard")
                  }}
                />
                <Text color={atmCardShow ? "#13B995" : "black"}>Yes</Text>
              </HStack>
              <SelectFieldNoFormik
                title={fieldsArray[5].field_name}
                name={"atmCard"}
                placeholder={fieldsArray[5].place_holder}
                handleChange={handleChange}
                isDisabled={!atmCardShow}
                errors={errors}
                selectValue={atmCardShow ? fieldsArray[5].dropdown_values : []}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              <Text mt={4} mb={2} fontSize={"sm"} fontWeight={"medium"}>
                Zakaat Exemption (If yes please upload zakat Affidavit)
              </Text>
              <HStack alignItems="center" space={2}>
                <Text color={zakatExemption ? "black" : "#13B995"}>No</Text>

                <Switch
                  size="sm"
                onTrackColor="emerald.300" onThumbColor="emerald.600"

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
                onTrackColor="emerald.300" onThumbColor="emerald.600"

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
                onTrackColor="emerald.300" onThumbColor="emerald.600"

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
      <LoadingModal showModal={showLoadingModal} />

      </Box>
    )
};

export default Services;
