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
import InputFields from "../CustomComponents/InputFields";
import StepHeader from "../CustomComponents/StepsHeader";
import { Formik } from "formik";
import * as yup from "yup";
import SelectField from "../CustomComponents/SelectField";
import { SharedElement } from "react-navigation-shared-element";
import { Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { gql, useMutation } from "@apollo/client";
import LoadingModal from "../CustomComponents/LoadingModal";
import INSERT_DATA_GQL from "../Queries/INSERT_DATA";
import dynamicRegisterValidationSchema from "../utils/dynamicRegisterValidationSchema";
import BtnSaveAndExit from "../CustomComponents/BtnSaveAndExit";
import BtnNext from "../CustomComponents/BtnNext";

const BasicAccountDetails = ({ route, navigation }) => {
  const mountedAnimation = React.useRef(new Animated.Value(0)).current;
  const translateX = React.useRef(new Animated.Value(500)).current;
  const pageData = route?.params?.page;
  const fieldsArray = pageData?.pages.filter(
    (page) => page.name == "Basic Account Details"
  )[0].fields;
  const INSERT_DATA = gql`
    ${INSERT_DATA_GQL(fieldsArray)}
  `;
  const applicantData = route?.params?.data?.insert_applicant_id_one;
  let applicant_id = applicantData?.applicant_id;
  if (!applicant_id) {
    applicant_id = route?.params?.applicant_id;
  }
  const toast = useToast();
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const registerValidationSchema = yup
    .object()
    .shape(dynamicRegisterValidationSchema(fieldsArray));

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
      navigation.navigate("Services", {
        data: applicantData,
        page: pageData,
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
  let analytics = {}
  let initialValues = {};
  fieldsArray.map((item, index) => {
    initialValues[item.name] = "";
  });
  return (
    <Formik
      id="sign-in-button"
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      validateOnChange={false}
      validateOnBlur={true}
      onSubmit={(values) => {
        setShowLoadingModal(true);
        let variables = {};
        fieldsArray.map((item, i) => {
          variables[item.name] = values[item.name];
          variables[`field_${item.id}`] = item.id;
        });
        variables.applicant_id = applicant_id;
        console.log(variables);
        insertData({
          variables,
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
          let prevTimeTaken = analytics[key]?.timeTaken;
          if (!prevTimeTaken) prevTimeTaken = 0;
          let timer = {};
          let count = 1;
          let errorCount = 0;
          let tapped = analytics[key]?.tapped;
          if (typeof tapped == "number") {
            count += tapped;
          } else {
            tapped = 0;
          }
          if (!startTime) {
            //onExit
            let oldStartTime = analytics[key]?.startTime;
            errorCount = analytics[key]?.errorCount;
            if (typeof errorCount == "number") {
              if (touched[key] && errors[key]) {
                errorCount += 1;
              }
            }
            let timeTaken =
              endTime.diff(oldStartTime, "seconds", true) + prevTimeTaken;
            timer = {
              startTime: oldStartTime,
              endTime,
              tapped: count,
              errorCount,
              timeTaken,
              avgTime: timeTaken / count,
            };
          } else {
            //onEnter
            let previousErrorCount = analytics[key]?.errorCount;
            if (typeof previousErrorCount == "number") {
              errorCount = previousErrorCount;
            } else {
              errorCount = 0;
            }
            let timeTaken =
              endTime.diff(startTime, "seconds", true) + prevTimeTaken;
            timer = {
              startTime,
              endTime,
              tapped,
              errorCount,
              timeTaken,
              avgTime: timeTaken / tapped,
            };
          }
          analytics[key] = timer;
          return analytics;
        };
        return (
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
                {fieldsArray.map((item, i) => {
                  if (item.type == "Select") {
                    return (
                      <SelectField
                        key={item.id}
                        title={item.field_name}
                        name={item.name}
                        placeholder={item.place_holder}
                        handleChange={handleChange(item.name)}
                        errors={errors}
                        touched={touched}
                        selectValue={item.dropdown_values}
                        value={values[item.name]}
                        icon={
                          <MaterialIcons
                            name={item.icon.name}
                            size={item.icon.size}
                            color={item.icon.color}
                          />
                        }
                      />
                    );
                  } else if (item.type == "Input") {
                    return (
                      <InputFields
                        key={item.id}
                        title={item.field_name}
                        name={item.name}
                        placeholder={item.place_holder}
                        value={values[item.name]}
                        onChangeText={handleChange(item.name)}
                        onBlur={handleBlur(item.name)}
                        analysisOnFocus={() =>
                          analysis(item.name, moment(), moment())
                        }
                        analysisOnBlur={() =>
                          analysis(item.name, null, moment())
                        }
                        errors={errors}
                        touched={touched}
                        isValid={isValid}
                        icon={
                          <MaterialIcons
                            name={item.icon.name}
                            size={item.icon.size}
                            color={item.icon.color}
                          />
                        }
                      />
                    );
                  } else {
                    return <></>;
                  }
                })}

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
                <BtnSaveAndExit navigation={navigation} toNavigate="Welcome">
                  SAVE & EXIT
                </BtnSaveAndExit>
                <BtnNext handleSubmit={handleSubmit}>CONFIRM</BtnNext>
              </Stack>
            </Box>
            <LoadingModal
              message="Saving information. Please wait."
              showModal={showLoadingModal}
            />
          </Box>
        );
      }}
    </Formik>
  );
};

export default BasicAccountDetails;
