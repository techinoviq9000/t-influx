import {
  Box,
  Button,
  CheckIcon,
  HStack,
  Image,
  Text,
  VStack,
  ScrollView,
  Wrap,
  Stack,
  Center,
  Pressable,
  Icon,
  Divider,
  FlatList,
  Spacer,
} from "native-base";
import { RefreshControl } from "react-native"

import React, { useState, useEffect } from "react";

import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client";

import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import StepHeader from "../CustomComponents/StepsHeader";
import LoadingModal from "../CustomComponents/LoadingModal";
import { iterateObserversSafely } from "@apollo/client/utilities";
import { useFocusEffect } from "@react-navigation/native";

const GET_DATA = gql`
  query getData($applicant_id: uuid = "") {
    pages(order_by: { id: asc }) {
      id
      name
      fields(order_by: { id: asc }) {
        id
        field_name
        data_table(where: { applicant_id: { _eq: $applicant_id } }) {
          id
          value
        }
      }
    }
  }
`;

const GET_APPLICANT = gql`
  query getFields {
    fields(order_by: { id: asc }) {
      id
      field_name
      place_holder
      dropdown_values
    }
  }
`;

const ContinueRegistration = ({ route, navigation }) => {
  const applicantData = route?.params?.data;
  const [dataList, setDataList] = useState([]);
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getData({
      variables: {
        applicant_id: applicantData.applicant_id,
      },
    });
  }, [])

  const [getFields, { data: fieldArray, loading }] = useLazyQuery(
    GET_APPLICANT,
    {
      fetchPolicy: "network-only",
      nextFetchPolicy: "network-only",
      onCompleted: (data) => {
        // console.log(data);
      },
    }
  );

  const [getData, { loading: dataLoading }] = useLazyQuery(GET_DATA, {
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "network-only",
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setRefreshing(false)
      const newList = [];
      data?.pages?.map((page) => {
        let status = false;
        if (page.fields.length == 0) {
          newList.push({
            id: page.id,
            title: page.name,
            status,
            collapsed: false,
            applicantData
          });
        } else if (page.fields[0]?.data_table.length == 0) {
          newList.push({
            id: page.id,
            title: page.name,
            status,
            collapsed: false,
            applicantData
          });
        } else {
          newList.push({
            id: page.id,
            title: page.name,
            status: true,
            collapsed: false,
            data: page.fields,
            applicantData
          });
        }
      });
      setDataList(newList);
      getFields();
      // setRefreshing(false)
      // setApplicantIdData(data.applicant_id)
    },
    onError: (error) => {
      setRefreshing(false)
      console.log(error);
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      getData({
        variables: {
          applicant_id: applicantData.applicant_id,
        },
      });
    }, [])
  );


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
                  () => navigation.navigate("Previous Applications", {
                    data: applicantData.applicant_id
                  })
                  // navigation.navigate("Welcome")
                }
              />
            );
          }}
        </Pressable>
      </Box>
      <Box alignItems="center">
        <StepHeader title="Continue Filling Your Application" />
      </Box>

      <Box
        backgroundColor="white"
        rounded="xl"
        py={8}
        width="100%"
        roundedBottom="none"
        flex={1}
        mt={5}
        flexGrow={1}
        // px={6}
      >
        <Box flex={1} flexGrow={1} width="full">
          <FlatList
            showsVerticalScrollIndicator={false}
            p={4}
            data={dataList}
            refreshing={refreshing}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  switch (item.title) {
                    case "Basic Account Details":
                      navigation.navigate("Basic Account Details LoginRoute", {
                        data: item.data,
                        fields: fieldArray.fields,
                        applicantData: applicantData
                      });
                      break;
                    case "Services":
                      navigation.navigate("Services LoginRoute", {
                        data: item.data,
                        fields: fieldArray.fields,
                        applicantData: applicantData
                      });
                      break;
                    case "Personal Details":
                      navigation.navigate("Personal Details", {
                        data: item,
                        fields: fieldArray.fields
                      });
                      break;
                    case "Upload Documents":
                      navigation.navigate("Begin Document Submission", {
                        data: item.data,
                        fields: fieldArray.fields,
                        applicantData: applicantData
                      });
                      break;
                  }
                }}
              >
                {({ isHovered, isFocused, isPressed }) => (
                  <Box
                    borderBottomWidth="1"
                    backgroundColor={isPressed ? "gray.100" : "white"}
                    py={3}
                    px={3}
                    borderColor="coolGray.200"
                  >
                    <HStack space={3} justifyContent="space-between">
                      {item.status ? (
                        <Icon
                          as={Ionicons}
                          name="checkmark-circle"
                          size={8}
                          alignSelf="center"
                          color="#317F6E"
                        />
                      ) : (
                        <Icon
                          as={FontAwesome5}
                          name="exclamation-circle"
                          size={8}
                          alignSelf="center"
                          color="amber.300"
                        />
                      )}
                      <VStack space={1}>
                        <Text
                          color="#317F6E"
                          fontSize="lg"
                          fontWeight="bold"
                          flexWrap="wrap"
                        >
                          {item.title}
                        </Text>
                        {item.status ? (
                          <Text color="#13B995" fontSize="sm">
                            Completed
                          </Text>
                        ) : (
                          <Text color="#ccc" fontSize="sm">
                            Pending
                          </Text>
                        )}
                      </VStack>
                      <Spacer />
                      <Text alignSelf="center">
                        <Icon
                          as={MaterialIcons}
                          name="navigate-next"
                          size="30"
                          color="emerald.400"
                        />
                      </Text>
                    </HStack>
                  </Box>
                )}
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
        <Box
          flex={1}
          flexGrow={0}
          minHeight={"24"}
          width={{ base: "100%", md: "md" }}
          justifyContent="flex-end"
          mt={6}
          px={3}
        >
          <Button
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
              navigation.navigate("Upload Documents")
            }
          >
            CONTINUE REGISTRATION
          </Button>
        </Box>
      </Box>
      <LoadingModal message="Loading. Please wait." showModal={dataLoading} />
      {/* <LoadingModal
        message="Loading. Please wait."
        showModal={loading}
      /> */}
    </Box>
  );
};

export default ContinueRegistration;
