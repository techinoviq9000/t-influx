import {
  Box,
  Button,
  ScrollView,
  Stack,
  Pressable,
  PresenceTransition,
  Text,
  Icon,
} from "native-base";
import { Animated , Easing } from "react-native";
import React, { useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";

import StepHeader from "../CustomComponents/StepsHeader";

import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";
import InputFields from "../CustomComponents/InputFields";
import LoadingModal from "../CustomComponents/LoadingModal";
import { SharedElement } from "react-navigation-shared-element";
import { useFocusEffect } from "@react-navigation/native";

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
      updated_at
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
    updated_at
  }
}
`;

const Registration = ({ route, navigation }) => {
  const mountedAnimation = React.useRef(new Animated.Value(0)).current
  const translateY = React.useRef(new Animated.Value(500)).current
  const translateX = React.useRef(new Animated.Value(0)).current
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
        translationX(-500, 0, 0)
        setTimeout(() => {
          navigation.navigate("VerifyOTP", {
            fromRegister: true,
            data
          });
        },);
        
        setTimeout(() => {
          setIsOpen(true);
        }, 500);
      
      
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
        // const response = await getApplicant({
        //   variables: {
        //     cnic: values.cnic,
        //     email: values.email,
        //     mobile_number: values.mobile_number,
        //   },
        // });
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
    // if (data.applicants[0]?.cnic === formValues.cnic) {
    //   errors.cnic = "Cnic exists";
    // } 
    // if (data.applicants[0]?.mobile_number === formValues.mobile_number) {
    //   errors.mobile_number = "Mobile exists";
    // } 
    // if (data.applicants[0]?.email === formValues.email) {
    //   errors.email = "Email Exists";
    // }
    console.log("close modal");
    setShowModal(false)
    return errors;
  };


  const translationY = (toValue, delay) => {
    Animated.timing(translateY, {
      toValue,
      duration: 500,
      delay,
      easing: Easing.ease,
      useNativeDriver: true 
    }).start()
  }

  const translationX = (toValue, delay, opacityValue) => {
    Animated.parallel([
      Animated.timing(mountedAnimation, {
        toValue: opacityValue,
        duration: 300,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue,
        duration: 300,
        delay,
        easing: Easing.ease,
        useNativeDriver: true 
      })
    ]).start()
  }

  const animateBack = () => {
    Animated.parallel([
      Animated.timing(mountedAnimation, {
        toValue: 0,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
      translationY(500, 0),
    ]).start()
  };
  useFocusEffect(
    React.useCallback(() => {
      Animated.parallel([
        translationX(0, 100, 1),
        translationY(0, 100)
      ]).start()
    }, [])
  );


  return (
    <Formik
      id="sign-in-button"
      initialValues={{
        email: "",
        mobile_number: "",
        cnic: "",
      }}
      validateOnChange={false}
      // validate
      // validateOnBlur={false}
      // validationSchema={registerValidationSchema}
      validate={(values) => validate(values)}
      onSubmit={(values) => {
        //Register new user
        // addApplicant({
        //   variables: {
        //     email: values.email.trim().toLowerCase(),
        //     cnic: values.cnic,
        //     mobile_number: values.mobile_number
        //   }
        
        // })
        setTimeout(() => {
          navigation.navigate("VerifyOTP", {
            fromRegister: true,
            // data
          });
        },);
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
            <SharedElement id="backButton1">
            <Pressable>
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Ionicons
                    name="arrow-back-circle-sharp"
                    size={36}
                    color={isFocused ? "#87e3ff" : "white"}
                    onPress={
                      () => {
                        animateBack()
                        setTimeout(() => {
                          navigation.goBack()                      
                        }, 200);
                      }
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
              <StepHeader title="Registration" />
              {/* <Text>ASD</Text> */}
            </Box>
            </SharedElement>

            <SharedElement id="1" style={{flex: 1}}>
          <Animated.View style={{backgroundColor: "white", borderRadius: 12, borderBottomLeftRadius: 0, borderBottomRightRadius:0, paddingVertical: 32, paddingHorizontal: 24, marginTop: 20, flex:1}}
          >
            <ScrollView
              _contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <Animated.View style={{opacity: mountedAnimation, transform:[{translateY}, {translateX}]}}>
                {/* Mobile Number */}
                <InputFields
                  title={"Mobile Number"}
                  name={"mobile_number"}
                  placeholder={"03XX-XXXXXX"}
                  value={values.mobile_number}
                  onChangeText={handleChange("mobile_number")}
                  onBlur={handleBlur("mobile_number")}
                  errors={errors}
                  touched={touched}
                  isValid={isValid}
                  icon={<Icon as={MaterialIcons} name="person" size="23" color="darkBlue.900" />}
                  
                />

                {/* CNIC NUMBER */}
                <InputFields
                  title={"CNIC Number"}
                  name={"cnic"}
                  placeholder={"XXXXX-XXXXXXX-X"}
                  value={values.cnic}
                  onChangeText={handleChange("cnic")}
                  onBlur={handleBlur("cnic")}
                  errors={errors}
                  touched={touched}
                  isValid={isValid}
                  icon={<Icon as={MaterialIcons} name="credit-card" size="23" color="darkBlue.900" />}

                />

                {/* Email  */}
                <InputFields
                  title={"Email ID"}
                  name={"email"}
                  placeholder={"example@email.com"}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  errors={errors}
                  touched={touched}
                  isValid={isValid}
                  icon={<Icon as={MaterialIcons} name="email" size="23" color="darkBlue.900" />}
                />
              </Animated.View>
              {/* <Box>
                {Object.values(invalidInput).map((value, index) => {
                  return <Text key={index}>{value}</Text>;
                })}
              </Box> */}
            </ScrollView>
          </Animated.View>
          </SharedElement>
          <Box justifyContent="flex-end">
          <SharedElement id="footer">
            <Stack backgroundColor="#f7f7f7" p={5} direction="row" space={5}>
              <SharedElement id="getStartedBtn1" style={{flex: 1}}>
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
              
              >
                I NEED HELP
              </Button>
              </SharedElement>
              {/* <Box id="sign-in-button"/> */}
              <SharedElement id="getStartedBtn2" style={{flex: 1, height: 38}}>
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
              </SharedElement>
            </Stack>
            </SharedElement>
          </Box>
          
          <LoadingModal showModal={showModal} />
        </Box>
      )}
    </Formik>
  );
};

export default Registration;
