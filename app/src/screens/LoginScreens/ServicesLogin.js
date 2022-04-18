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
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialIcons,
} from "@expo/vector-icons";
import StepHeader from "../../CustomComponents/StepsHeader";
import { gql, useMutation } from "@apollo/client";
import LoadingModal from "../../CustomComponents/LoadingModal";
import SelectFieldNoFormik from "../../CustomComponents/SelectFieldNoFormik";


const INSERT_DATA = gql`
mutation MyMutation(
  $value_1: String
  $field_id_1: Int!
  $applicant_id: uuid!
  $value_2: String
  $field_id_2: Int!
  $status: String!
  $custom_updated_at: String!
) {
  one: insert_data_table_one(
    object: {
      value: $value_1
      field_id: $field_id_1
      applicant_id: $applicant_id
    },
    on_conflict: {constraint: data_table_field_id_applicant_id_key, update_columns: value, where: {field_id: {_eq: $field_id_1}}}
  ) {
    id
  }
  two: insert_data_table_one(
    object: {
      value: $value_2
      field_id: $field_id_2
      applicant_id: $applicant_id
    },
    on_conflict: {constraint: data_table_field_id_applicant_id_key, update_columns: value, where: {field_id: {_eq: $field_id_2}}}
  ) {
    id
  }
  three: update_applicant_id(where: {applicant_id: {_eq: $applicant_id}}, _set: {status: $status, , custom_updated_at: $custom_updated_at}) {
    affected_rows
  }
}
`;

const ServicesLogin = ({ route, navigation }) => {
    const fieldsArray = route?.params?.fields;
    const applicantData = route?.params?.applicantData;
    let applicant_id = applicantData?.applicant_id;
    let preFilledFields = route?.params?.data;
    if(preFilledFields) {
      preFilledFields = preFilledFields.map((data) => {
        return { field_name: data.field_name, value: data.data_table[0].value };
      });
    }
  const toast = useToast();
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [insertData, { data }] = useMutation(INSERT_DATA, {
    onCompleted: (data) => {
      setShowLoadingModal(false);
      navigation.navigate("Continue Application", {
        data: applicantData,
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
  const [chequeBookShow, setChequeBookShow] = useState(preFilledFields?.[0]?.value ? true : false );
  const [atmCardShow, setAtmCardShow] = useState(preFilledFields?.[1]?.value ? true : false);
  const [zakatExemption, setzakatExemption] = useState(false);
  const [formValues, setFormValues] = useState({atmCard: preFilledFields?.[1]?.value, chequeBook: preFilledFields?.[0]?.value})
  const [errors, setErrors] = useState({})
  const handleChange = (value, name) => {
    setFormValues({...formValues, [name]: value })
    setErrors({...errors, [name]: null})
    console.log(value, name)
  }
console.log(formValues)
  const handleSubmit = () => {
    let tempError = {}
    console.log(formValues, "form values");
    if(chequeBookShow && !formValues.chequeBook) {
      tempError.chequeBook = "Please select chequebook"
    }
    if(atmCardShow && !formValues.atmCard) {
      tempError.atmCard= "Please select atm card"
    }
    setErrors(tempError)

    if(Object.keys(tempError).length < 1) {
      const variables = {}
      if(formValues.chequeBook != "") {variables.value_1 = formValues.chequeBook}
      if(formValues.atmCard != "") {variables.value_2 = formValues.atmCard}
      variables.field_id_1= fieldsArray[4].id,
      variables.field_id_2= fieldsArray[5].id,
      variables.applicant_id= applicant_id,
      variables.applicant_id= applicant_id,
      variables.status = "Incomplete",
      variables.custom_updated_at= moment(new Date(), "DATETIME_LOCAL_SECONDS").toString()
      insertData({
        variables
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
                value={formValues.chequeBook}
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
                value={formValues.atmCard}
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
                navigation.navigate("Continue Application", {
                  data: applicantData
                })
              }
            >
              SAVE & EXIT
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
      <LoadingModal message="Saving information. Please wait. servicves page" showModal={showLoadingModal} />

      </Box>
    )
};

export default ServicesLogin;
