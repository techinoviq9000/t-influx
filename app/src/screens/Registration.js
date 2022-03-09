import {
  Box,
  Button,
  ScrollView,
  Stack,
  Pressable,
  PresenceTransition,
  Text,
} from "native-base";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";

import StepHeader from "../CustomComponents/StepsHeader";

import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import InputFields from "../CustomComponents/InputFields";
import LoadingModal from "../CustomComponents/LoadingModal";

const GET_APPLICANT = gql`
  query MyQuery(
    $mobile_number: String = ""
    $cnic: String = ""
    $email: String = ""
  ) {
    applicants(
      where: {
        _or: [
          { mobile_number: { _eq: $mobile_number } }
          { cnic: { _eq: $cnic } }
          { email: { _eq: $email } }
        ]
      }
    ) {
      cnic
      email
      mobile_number
      id
    }
  }
`;

const ADD_APPLICANT = gql`
mutation addApplicant($cnic: String = "", $email: String = "", $mobile_number: String = "") {
  insert_applicants_one(object: {cnic: $cnic, email: $email, mobile_number: $mobile_number}) {
    id
    email
    mobile_number
    cnic
    otp
    status
  }
}
`;

const Registration = ({ route, navigation }) => {
  const [getApplicant, { data: applicantData, loading }] = useLazyQuery(
    GET_APPLICANT,
    {
      fetchPolicy: "network-only",
      nextFetchPolicy: "network-only",
    }
  );

  const [addApplicant, {data: addApplicantData}] = useMutation(ADD_APPLICANT, {
    onCompleted: data => {
      setIsOpen(false);
      setShowModal(false);
      navigation.navigate("VerifyOTPRegister", {
        fromRegister: true,
        data: data
      });
      setTimeout(() => {
        setIsOpen(true);
      }, 500);
    }
  })
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formValues, setFormValues] = useState(
    route?.params?.applicantData?.[0]
  );
  let submitForm = false

  const registerValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    cnic: yup
      .string()
      .min(13, ({ min }) => `cnic must be at least ${min} characters`)
      .max(13, ({ max }) => `Cnic must be at least ${max} characters`)
      .required("cnic is required"),
    mobile_number: yup
      .string()
      .min(11, ({ min }) => `Mobile must be at least ${min} characters`)
      .max(11, ({ max }) => `Mobile must be at least ${max} characters`)
      .required("Mobile Number is required"),
  });

  const validate = async (values) => {
    const errors = {}
    console.log("inside validate")
    try {
      const res = await registerValidationSchema.validate(values, { abortEarly: false })
      // setSubmitForm(true)
      console.log(submitForm);
    } catch (error) {
      submitForm = false
        error.inner.map(err => {
          errors[err.path] = err.message
        });
        return errors
    }
  
    if(submitForm) {
    console.log("inside submitform loop")
      setShowModal(true)
      try {
        const response = await getApplicant({
          variables: {
            cnic: values.cnic,
            email: values.email,
            mobile_number: values.mobile_number,
          },
        });
        console.log("hasura data")
        return onCompleteGetApplicant(response.data, values);
      } catch (e) {
        setShowModal(false);
        console.log(e);
        return {};
      }
    } else {
      return {}
    }
    
  };

  const onCompleteGetApplicant = (data, formValues) => {
    const errors = {};
    if (data.applicants[0]?.cnic === formValues.cnic) {
      errors.cnic = "Cnic exists";
    } 
    if (data.applicants[0]?.mobile_number === formValues.mobile_number) {
      errors.mobile_number = "Mobile exists";
    } 
    if (data.applicants[0]?.email === formValues.email) {
      errors.email = "Email Exists";
    }
    console.log("close modal");
    setShowModal(false)
    return errors;
  };

  return (
    <Formik
      id="sign-in-button"
      initialValues={{
        email: "salmanhanif133@gmail.com",
        mobile_number: "03222681575",
        cnic: "4230161551219",
      }}
      validateOnChange={false}
      // validate
      // validateOnBlur={false}
      // validationSchema={registerValidationSchema}
      validate={(values) => validate(values)}
      onSubmit={(values) => {
        //Register new user
        addApplicant({
          variables: {
            email: values.email,
            cnic: values.cnic,
            mobile_number: values.mobile_number
          }
        
        })
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
                );
              }}
            </Pressable>
          </Box>
          <PresenceTransition
            visible={isOpen}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 250,
              },
            }}
          >
            <Box alignItems="center">
              <StepHeader title="Registration" />
              {/* <Text>ASD</Text> */}
            </Box>
          </PresenceTransition>
          <Box
            backgroundColor="white"
            rounded="xl"
            roundedBottom="none"
            py={8}
            flex={1}
            // minHeight="100%"
            mt={5}
            px={6}
          >
            <ScrollView
              _contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <Box alignItems={{ md: "center" }}>
                {/* Mobile Number */}
                <InputFields
                  title={"Mobile Number"}
                  name={"mobile_number"}
                  errors={errors}
                  touched={touched}
                  onChangeText={handleChange("mobile_number")}
                  onBlur={handleBlur("mobile_number")}
                  value={values.mobile_number}
                  placeholder={"03XX-XXXXXX"}
                  isValid={isValid}
                  icon={<MaterialIcons name="person" size={23} color="black" />}
                />

                {/* CNIC NUMBER */}
                <InputFields
                  title={"CNIC Number"}
                  errors={errors}
                  touched={touched}
                  name={"cnic"}
                  placeholder={"XXXXX-XXXXXXX-X"}
                  onChangeText={handleChange("cnic")}
                  onBlur={handleBlur("cnic")}
                  value={values.cnic}
                  isValid={isValid}
                  icon={
                    <MaterialIcons name="credit-card" size={23} color="black" />
                  }
                />

                {/* Email  */}
                <InputFields
                  title={"Email ID"}
                  errors={errors}
                  touched={touched}
                  name={"email"}
                  placeholder={"example@email.com"}
                  isValid={isValid}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  icon={<MaterialIcons name="email" size={23} color="black" />}
                />
              </Box>
              {/* <Box>
                {Object.values(invalidInput).map((value, index) => {
                  return <Text key={index}>{value}</Text>;
                })}
              </Box> */}
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
                  navigation.navigate("VerifyOTP")
                }
              >
                I NEED HELP
              </Button>
              {/* <Box id="sign-in-button"/> */}
              <Button
                flex={1}
                size="md"
                rounded="md"
                backgroundColor="#317F6E"
                border={1}
                borderWidth="1"
                borderColor="white"
                onPress={
                  () => {
                    submitForm = true
                      handleSubmit()
                  }

                  // navigation.goBack()
                  // getUser()

                  // navigation.navigate("VerifyOTPRegister", { fromRegister: true })
                }
              >
                CONFIRM
              </Button>
            </Stack>
          </Box>
          <LoadingModal showModal={showModal} />
        </Box>
      )}
    </Formik>
  );
};

export default Registration;
