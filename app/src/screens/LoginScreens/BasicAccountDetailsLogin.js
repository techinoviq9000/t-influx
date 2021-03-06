import {
  Box,
  Button,
  Pressable,
  ScrollView,
  Stack,
  useToast,
} from "native-base";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import StepHeader from "../../CustomComponents/StepsHeader";
import { Formik } from "formik";
import * as yup from "yup";
import SelectField from "../../CustomComponents/SelectField";
import { SharedElement } from "react-navigation-shared-element";
import { Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";
import LoadingModal from "../../CustomComponents/LoadingModal";

const INSERT_DATA = gql`
  mutation MyMutation(
    $value_1: String!
    $field_id_1: Int!
    $applicant_id: uuid!
    $value_2: String!
    $field_id_2: Int!
    $value_3: String!
    $field_id_3: Int!
    $value_4: String!
    $field_id_4: Int!
    $status: String!
    $custom_updated_at: String!
  ) {
    one: insert_data_table_one(
      object: {
        value: $value_1
        field_id: $field_id_1
        applicant_id: $applicant_id
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_1 } }
      }
    ) {
      id
    }
    two: insert_data_table_one(
      object: {
        value: $value_2
        field_id: $field_id_2
        applicant_id: $applicant_id
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_2 } }
      }
    ) {
      id
    }
    three: insert_data_table_one(
      object: {
        value: $value_3
        field_id: $field_id_3
        applicant_id: $applicant_id
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_3 } }
      }
    ) {
      id
    }
    four: insert_data_table_one(
      object: {
        value: $value_4
        field_id: $field_id_4
        applicant_id: $applicant_id
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_4 } }
      }
    ) {
      id
    }
    five:update_applicant_id(where: {applicant_id: {_eq: $applicant_id}}, _set: {status: $status, , custom_updated_at: $custom_updated_at}) {
      affected_rows
    }
  }
`;

const BasicAccountDetailsLogin = ({ route, navigation }) => {
  const mountedAnimation = React.useRef(new Animated.Value(0)).current;
  const translateX = React.useRef(new Animated.Value(500)).current;
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

  const registerValidationSchema = yup.object().shape({
    field_1: yup
      .string()
      .required(`Please select ${fieldsArray[0].field_name}`),
    field_2: yup
      .string()
      .required(`Please select ${fieldsArray[1].field_name}`),
    field_3: yup
      .string()
      .required(`Please select ${fieldsArray[2].field_name}`),
    field_4: yup
      .string()
      .required(`Please select ${fieldsArray[3].field_name}`),
  });

  const translationX = (toValue, delay) => {
    Animated.timing(translateX, {
      toValue,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();
  };

  const animateBack = () => {
    translationX(500, 500, 0);
  };

  const [insertData, { data }] = useMutation(INSERT_DATA, {
    onCompleted: (data) => {
      setShowLoadingModal(false);
      navigation.navigate("Continue Application", {
        data: applicantData,
      }); //navigate if otp correct
    },
    onError: (error) => {
      setShowLoadingModal(false);
      console.log(error);
      toast.show({
        title: "Error",
        placement: "top",
        status: "error",
        description:
          "Unable to proceed. Please contact support at support@techinoviq.com",
      });
    },
  });
let initialValues = {}
 if(preFilledFields) {
  preFilledFields.map((item, index) => {
    initialValues[`field_${index+1}`] =  item?.value ?? ""
  })
 } else {
   fieldsArray.map((item, index) => {
    initialValues[`field_${index+1}`] =  ""
   })
 }
 
  return (
    <Formik
      id="sign-in-button"
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={(values) => {
        insertData({
          variables: {
            value_1: values.field_1,
            field_id_1: fieldsArray[0].id,
            value_2: values.field_2,
            field_id_2: fieldsArray[1].id,
            value_3: values.field_3,
            field_id_3: fieldsArray[2].id,
            value_4: values.field_4,
            field_id_4: fieldsArray[3].id,
            applicant_id: applicant_id,
            status: "Incomplete",
            custom_updated_at:  moment(new Date(), "DATETIME_LOCAL_SECONDS").toString()
          },
        });
      }}
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
        <Box flex={1} minHeight="100%" safeAreaTop={10}>
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
                );
              }}
            </Pressable>
          </Box>
          <Box alignItems="center">
            <StepHeader
              title="Basic Account Details"
              nextTitle="Next: Services"
              step="1"
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
              <SelectField
                title={fieldsArray[0].field_name}
                name={"field_1"}
                placeholder={fieldsArray[0].place_holder}
                handleChange={handleChange("field_1")}
                errors={errors}
                touched={touched}
                selectValue={fieldsArray[0].dropdown_values}
                value={values.field_1}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              <SelectField
                title={fieldsArray[1].field_name}
                name={"field_2"}
                placeholder={fieldsArray[1].place_holder}
                handleChange={handleChange("field_2")}
                errors={errors}
                touched={touched}
                selectValue={fieldsArray[1].dropdown_values}
                value={values.field_2}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              <SelectField
                title={fieldsArray[2].field_name}
                name={"field_3"}
                placeholder={fieldsArray[2].place_holder}
                handleChange={handleChange("field_3")}
                errors={errors}
                touched={touched}
                selectValue={fieldsArray[2].dropdown_values}
                value={values.field_3}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              <SelectField
                title={fieldsArray[3].field_name}
                name={"field_4"}
                placeholder={fieldsArray[3].place_holder}
                handleChange={handleChange("field_4")}
                errors={errors}
                touched={touched}
                selectValue={fieldsArray[3].dropdown_values}
                value={values.field_4}
                icon={<MaterialIcons name="person" size={23} color="black" />}
              />

              {/* Account Type (2)
                 <SelectField

                  title={"Account Type (2)"}
                  name={"accType2"}
                  placeholder={"Select Account Type (2)"}
                  handleChange={handleChange}
                  selectValue={[
                    "PKR Current Account",
                    "PKR Savings Account (Monthly)",
                    "USD Current Account",
                    "USD Savings Account (Monthly)",
                    "AED Current Account",
                    "AED Savings Account (Monthly)",
                    "Euro Current Account",
                    "Euro Savings Account (Monthly)",
                    "SAR Current Account",
                    "SAR Savings Account (Monthly)",
                    "GBP Current Account",
                    "GBP Savings Account (Monthly)"
                  ]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                /> */}

              {/* Account Type (3) */}
              {/* <SelectField

                  title={"Account Type (3)"}
                  name={"accType3"}
                  placeholder={"Select Account Type (3)"}
                  handleChange={handleChange}
                  selectValue={[
                    "PKR Current Account",
                    "PKR Savings Account (Monthly)",
                    "USD Current Account",
                    "USD Savings Account (Monthly)",
                    "AED Current Account",
                    "AED Savings Account (Monthly)",
                    "Euro Current Account",
                    "Euro Savings Account (Monthly)",
                    "SAR Current Account",
                    "SAR Savings Account (Monthly)",
                    "GBP Current Account",
                    "GBP Savings Account (Monthly)"
                  ]}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                /> */}
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
                onPress={() => {
                  setShowLoadingModal(true);
                  handleSubmit();
                }}
              >
                CONFIRM
              </Button>
            </Stack>
          </Box>
          <LoadingModal
            message="Saving information. Please wait."
            showModal={showLoadingModal}
          />
        </Box>
      )}
    </Formik>
  );
};

export default BasicAccountDetailsLogin;
