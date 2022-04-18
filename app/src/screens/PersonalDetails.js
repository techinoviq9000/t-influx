import {
  Box,
  Button,
  Text,
  ScrollView,
  Stack,
  Pressable,
  Divider,
  useToast,
} from "native-base";
import React, { useState } from "react";
import { StyleSheet, Animated } from "react-native";
import { SharedElement } from "react-navigation-shared-element";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";

import InputFields from "../CustomComponents/InputFields";
import StepHeader from "../CustomComponents/StepsHeader";
import SelectField from "../CustomComponents/SelectField";
import { gql, useMutation } from "@apollo/client";
import LoadingModal from "../CustomComponents/LoadingModal";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";

const INSERT_DATA = gql`
  mutation MyMutation(
    $value_1: String
    $field_id_1: Int!
    $applicant_id_1: uuid!
    $analysis_1: json
    $value_2: String
    $field_id_2: Int!
    $applicant_id_2: uuid!
    $analysis_2: json
    $value_3: String
    $field_id_3: Int!
    $analysis_3: json
    $applicant_id_3: uuid!
    $value_4: String
    $field_id_4: Int!
    $applicant_id_4: uuid!
    $value_5: String
    $field_id_5: Int!
    $applicant_id_5: uuid!
    $analysis_5: json
    $value_6: String
    $field_id_6: Int!
    $applicant_id_6: uuid!
    $value_7: String
    $field_id_7: Int!
    $applicant_id_7: uuid!
    $value_8: String
    $field_id_8: Int!
    $applicant_id_8: uuid!
    $analysis_8: json
    $value_9: String
    $field_id_9: Int!
    $applicant_id_9: uuid!
    $analysis_9: json
    $value_10: String
    $field_id_10: Int!
    $applicant_id_10: uuid!
  ) {
    one: insert_data_table_one(
      object: {
        value: $value_1
        field_id: $field_id_1
        applicant_id: $applicant_id_1
        analysis: $analysis_1
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: [value, analysis]
        where: { field_id: { _eq: $field_id_1 } }
      }
    ) {
      id
    }
    two: insert_data_table_one(
      object: {
        value: $value_2
        field_id: $field_id_2
        applicant_id: $applicant_id_2
        analysis: $analysis_2
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: [value, analysis]
        where: { field_id: { _eq: $field_id_2 } }
      }
    ) {
      id
    }
    three: insert_data_table_one(
      object: {
        value: $value_3
        field_id: $field_id_3
        applicant_id: $applicant_id_3
        analysis: $analysis_3
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: [value, analysis]
        where: { field_id: { _eq: $field_id_3 } }
      }
    ) {
      id
    }
    four: insert_data_table_one(
      object: {
        value: $value_4
        field_id: $field_id_4
        applicant_id: $applicant_id_4
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_4 } }
      }
    ) {
      id
    }
    five: insert_data_table_one(
      object: {
        value: $value_5
        field_id: $field_id_5
        applicant_id: $applicant_id_5
        analysis: $analysis_5
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: [value, analysis]
        where: { field_id: { _eq: $field_id_5 } }
      }
    ) {
      id
    }
    six: insert_data_table_one(
      object: {
        value: $value_6
        field_id: $field_id_6
        applicant_id: $applicant_id_6
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_6 } }
      }
    ) {
      id
    }
    seven: insert_data_table_one(
      object: {
        value: $value_7
        field_id: $field_id_7
        applicant_id: $applicant_id_7
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_7 } }
      }
    ) {
      id
    }
    eight: insert_data_table_one(
      object: {
        value: $value_8
        field_id: $field_id_8
        applicant_id: $applicant_id_8
        analysis: $analysis_8
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: [value, analysis]
        where: { field_id: { _eq: $field_id_8 } }
      }
    ) {
      id
    }
    nine: insert_data_table_one(
      object: {
        value: $value_9
        field_id: $field_id_9
        applicant_id: $applicant_id_9
        analysis: $analysis_9
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: [value, analysis]
        where: { field_id: { _eq: $field_id_9 } }
      }
    ) {
      id
    }
    ten: insert_data_table_one(
      object: {
        value: $value_10
        field_id: $field_id_10
        applicant_id: $applicant_id_10
      }
      on_conflict: {
        constraint: data_table_field_id_applicant_id_key
        update_columns: value
        where: { field_id: { _eq: $field_id_10 } }
      }
    ) {
      id
    }
  }
`;

const PersonalDetails = ({ route, navigation }) => {
  const translateX = React.useRef(new Animated.Value(500)).current;
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
      console.log(data);
      navigation.navigate("Begin Document Submission", {
        applicantData: applicantData,
        fields: fieldsArray,
      });
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
  const registerValidationSchema = yup.object().shape({
    name: yup.string().required("Name is Requried"),
    fatherName: yup.string().required("Father Name is Requried"),
    motherName: yup.string().required("Mother Name is Requried"),
    gender: yup.string().required("Gender is Requried"),
    dob: yup.string().required("Date of Birth is Requried"),
    placeOfBirth: yup.string().required("Place of Birth is Requried"),
    nationality: yup.string().required("Nationalilty is Requried"),
    mailingAddress: yup.string().required("Mailing Address is Required"),
    permanantAddress: yup.string().required("Permanant Address is Requried"),
    postalCommunication: yup
      .string()
      .required("Postal Communication is Requried"),
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

  useFocusEffect(
    React.useCallback(() => {
      Animated.parallel([translationX(0, 50)]).start();
    }, [])
  );

  let analytics = {};

  return (
    <Formik
      id="sign-in-button"
      validateOnChange={false}
      initialValues={{
        name: "",
        fatherName: "",
        motherName: "",
        gender: "",
        dob: "",
        placeOfBirth: "",
        nationality: "",
        mailingAddress: "",
        permanantAddress: "",
        postalCommunication: ""
      }}
      validationSchema={registerValidationSchema}
      onSubmit={(values) => {
        const objKeys = Object.keys(values);
        // navigation.navigate("Begin Document Submission");
        console.log(values);
        console.log(analytics);
        insertData({
            variables: {
            value_1: values.name,
            field_id_1: fieldsArray[6].id,
            applicant_id_1: applicant_id,
            analysis_1: analytics[objKeys[0]],
            value_2: values.fatherName,
            field_id_2: fieldsArray[7].id,
            applicant_id_2: applicant_id,
            analysis_2: analytics[objKeys[1]],
            value_3: values.motherName,
            field_id_3: fieldsArray[8].id,
            applicant_id_3: applicant_id,
            analysis_3: analytics[objKeys[2]],
            value_4: values.gender,
            field_id_4: fieldsArray[9].id,
            applicant_id_4: applicant_id,
            value_5: values.dob,
            field_id_5: fieldsArray[10].id,
            applicant_id_5: applicant_id,
            analysis_5: analytics[objKeys[4]],
            value_6: values.placeOfBirth,
            field_id_6: fieldsArray[11].id,
            applicant_id_6: applicant_id,
            value_7: values.nationality,
            field_id_7: fieldsArray[12].id,
            applicant_id_7: applicant_id,
            value_8: values.mailingAddress,
            field_id_8: fieldsArray[13].id,
            analysis_8: analytics[objKeys[7]],
            applicant_id_8: applicant_id,
            value_9: values.permanantAddress,
            field_id_9: fieldsArray[14].id,
            applicant_id_9: applicant_id,
            analysis_9: analytics[objKeys[8]],
            value_10: values.postalCommunication,
            field_id_10: fieldsArray[15].id,
            applicant_id_10: applicant_id,
          }
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
      }) => {
        const analysis = (key, startTime, endTime) => {
          let prevTimeTaken = analytics[key]?.timeTaken
          if (!prevTimeTaken) prevTimeTaken = 0
          let timer = {}
          let count = 1
          let errorCount = 0
          let tapped = analytics[key]?.tapped
          if (typeof tapped == "number") {
            count += tapped
          } else {
            tapped = 0
          }
          if (!startTime) {
            //onExit
            let oldStartTime = analytics[key]?.startTime
            errorCount = analytics[key]?.errorCount
            if (typeof errorCount == "number") {
              if (touched[key] && errors[key]) {
                errorCount += 1
              }
            }
            let timeTaken = endTime.diff(oldStartTime, "seconds", true) + prevTimeTaken
            timer = {
              startTime: oldStartTime,
              endTime,
              tapped: count,
              errorCount,
              timeTaken,                
              avgTime: timeTaken/count
            }
          } else {
            //onEnter
            let previousErrorCount = analytics[key]?.errorCount
            if (typeof previousErrorCount == "number") {
              errorCount = previousErrorCount
            } else {
              errorCount = 0
            }
              let timeTaken = endTime.diff(startTime, "seconds", true) + prevTimeTaken
            timer = {
              startTime,
              endTime,
              tapped,
              errorCount,
              timeTaken,
              avgTime: timeTaken/tapped
            }
          }
          analytics[key] = timer
          return analytics
        };
        return (
          <Box flex={1} minHeight="100%" safeAreaTop={5}>
            <Box alignItems="flex-start" px={6} mt={6}>
              <SharedElement id="backButton1">
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
              </SharedElement>
            </Box>
            <SharedElement id="stepHeader">
              <Box alignItems="center">
                <StepHeader
                  title="Personal Details"
                  nextTitle="Next: Upload Documents"
                  step="3"
                />
              </Box>
            </SharedElement>
            <SharedElement id="1" style={{ flex: 1 }}>
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
                  <Animated.View style={{ transform: [{ translateX }] }}>
                  <InputFields
                      title={fieldsArray[6].field_name}
                      name={"name"}
                      placeholder={fieldsArray[6].place_holder}
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      analysisOnFocus={analysis}
                      analysisOnBlur={analysis}
                      errors={errors}
                      touched={touched}
                      isValid={isValid}
                      icon={
                        <MaterialIcons name="person" size={23} color="black" />
                      }
                    />

                    <InputFields
                      title={fieldsArray[7].field_name}
                      name={"fatherName"}
                      placeholder={fieldsArray[7].place_holder}
                      value={values.fatherName}
                      onChangeText={handleChange("fatherName")}
                      onBlur={handleBlur("fatherName")}
                      analysisOnFocus={() =>
                        analysis("fatherName", moment(), moment())
                      }
                      analysisOnBlur={() =>
                        analysis("fatherName", null, moment())
                      }
                      errors={errors}
                      touched={touched}
                      isValid={isValid}
                      icon={
                        <MaterialIcons name="person" size={23} color="black" />
                      }
                    />

                    <InputFields
                      title={fieldsArray[8].field_name}
                      name={"motherName"}
                      placeholder={fieldsArray[8].place_holder}
                      value={values.motherName}
                      onChangeText={handleChange("motherName")}
                      onBlur={handleBlur("motherName")}
                      analysisOnFocus={() =>
                        analysis("motherName", moment(), moment())
                      }
                      analysisOnBlur={() =>
                        analysis("motherName", null, moment())
                      }
                      errors={errors}
                      touched={touched}
                      isValid={isValid}
                      icon={
                        <MaterialIcons name="person" size={23} color="black" />
                      }
                    />

                    <SelectField
                      title={fieldsArray[9].field_name}
                      name={"gender"}
                      placeholder={fieldsArray[9].place_holder}
                      handleChange={handleChange("gender")}
                      errors={errors}
                      touched={touched}
                      selectValue={fieldsArray[9].dropdown_values}
                      value={values.gender}
                      icon={
                        <MaterialIcons name="person" size={23} color="black" />
                      }
                    />

                    <InputFields
                      title={fieldsArray[10].field_name}
                      name={"dob"}
                      placeholder={fieldsArray[10].place_holder}
                      value={values.dob}
                      onChangeText={handleChange("dob")}
                      onBlur={handleBlur("dob")}
                      analysisOnFocus={() =>
                        analysis("dob", moment(), moment())
                      }
                      analysisOnBlur={() => analysis("dob", null, moment())}
                      errors={errors}
                      touched={touched}
                      isValid={isValid}
                      icon={
                        <MaterialIcons name="person" size={23} color="black" />
                      }
                    />

                    <SelectField
                      title={fieldsArray[11].field_name}
                      name={"placeOfBirth"}
                      placeholder={fieldsArray[11].place_holder}
                      handleChange={handleChange("placeOfBirth")}
                      errors={errors}
                      touched={touched}
                      selectValue={fieldsArray[11].dropdown_values}
                      value={values.placeOfBirth}
                      icon={
                        <MaterialIcons name="person" size={23} color="black" />
                      }
                    />

                    <SelectField
                      title={fieldsArray[12].field_name}
                      name={"nationality"}
                      placeholder={fieldsArray[12].field_name}
                      handleChange={handleChange("nationality")}
                      errors={errors}
                      touched={touched}
                      selectValue={fieldsArray[12].dropdown_values}
                      value={values.nationality}
                      icon={
                        <MaterialIcons name="person" size={23} color="black" />
                      }
                    />
                    <Divider mt="4" mb="2" bgColor="#c7c7c7" />
                    <Text fontSize="2xl" fontWeight="bold">
                      Address
                    </Text>
                    <InputFields
                      title={fieldsArray[13].field_name}
                      name={"mailingAddress"}
                      placeholder={fieldsArray[13].place_holder}
                      value={values.mailingAddress}
                      onChangeText={handleChange("mailingAddress")}
                      onBlur={handleBlur("mailingAddress")}
                      analysisOnFocus={() =>
                        analysis("mailingAddress", moment(), moment())
                      }
                      analysisOnBlur={() =>
                        analysis("mailingAddress", null, moment())
                      }
                      errors={errors}
                      touched={touched}
                      isValid={isValid}
                      icon={
                        <MaterialIcons name="person" size={23} color="black" />
                      }
                    />

                    <InputFields
                      title={fieldsArray[14].field_name}
                      name={"permanantAddress"}
                      placeholder={fieldsArray[14].place_holder}
                      value={values.permanantAddress}
                      onChangeText={handleChange("permanantAddress")}
                      onBlur={handleBlur("permanantAddress")}
                      analysisOnFocus={() =>
                        analysis("permanantAddress", moment(), moment())
                      }
                      analysisOnBlur={() =>
                        analysis("permanantAddress", null, moment())
                      }
                      errors={errors}
                      touched={touched}
                      isValid={isValid}
                      icon={
                        <MaterialIcons name="person" size={23} color="black" />
                      }
                    />

                    <SelectField
                      title={fieldsArray[15].field_name}
                      name={"postalCommunication"}
                      placeholder={fieldsArray[15].place_holder}
                      handleChange={handleChange("postalCommunication")}
                      touched={touched}
                      errors={errors}
                      selectValue={fieldsArray[15].dropdown_values}
                      value={values.postalCommunication}
                      icon={
                        <MaterialIcons name="person" size={23} color="black" />
                      }
                    />
                  </Animated.View>
                </ScrollView>
              </Box>
            </SharedElement>
            <Box justifyContent="flex-end">
              <SharedElement id="footer">
                <Stack
                  backgroundColor="#f7f7f7"
                  p={5}
                  direction="row"
                  space={5}
                >
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
                    onPress={
                      () =>
                        // navigation.goBack()
                        {
                          console.log(analytics);
                          console.log(fatherRef);
                        }
                      // navigation.navigate("VerifyOTP")
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
                    onPress={() =>
                      // navigation.goBack()
                      // navigation.navigate("Upload Documents"

                      // submitForm()
                      {
                        console.log(analytics);
                        handleSubmit();
                      }
                    }
                  >
                    CONFIRM
                  </Button>
                </Stack>
              </SharedElement>
            </Box>
            <LoadingModal message="Saving information. Please wait. Personal apge" showModal={showLoadingModal} />
          </Box>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default PersonalDetails;
