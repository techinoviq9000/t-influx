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
} from "native-base";
import React, { useState, useEffect } from "react";

import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client"


import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Collapse } from "native-base";

//import for the collapsible/Expandable view
import Collapsible from "react-native-collapsible";
import { boxShadow } from "styled-system";
import StepHeader from "../CustomComponents/StepsHeader";

const GET_DATA = gql`
query getData($applicant_id: uuid = "") {
  pages(order_by: {id: asc}) {
    id
    name
    fields(order_by: {id: asc}) {
      id
      field_name
      data_table(where: {applicant_id: {_eq: $applicant_id}}) {
        id
        value
      }
    }
  }
}`

const ContinueRegistration = ({ route, navigation }) => {
  const data = route?.params?.data
  console.log(data.applicant_id)
  const [dataList, setDataList] = useState([])
  const [getData, { loading }] = useLazyQuery(GET_DATA, {
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "network-only",
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      const newList = []
      data?.pages?.map(page => {
        let status = false
        if(page.fields.length == 0) {
          newList.push({id: page.id, title: page.name, description: "asd", status, collapsed: false})
        } else if(page.fields[0]?.data_table.length == 0) {
          newList.push({id: page.id, title: page.name, description: "asd", status, collapsed: false})
        } else {
          newList.push({id: page.id, title: page.name, description: "asd", status: true, collapsed: false})
        }
      })

      setDataList(newList)
      // setRefreshing(false)
      // setApplicantIdData(data.applicant_id)
    },
    onError: (data) => {
      console.log(data)
    }
  })
  const [list, setList] = useState([
    {
      id: 0,
      title: "Eligibilty Check",
      status: true,
      description: "Candy canesasdsa ofjsa isauf njkasfiuasf asfn",
      collapsed: false,
    },
    {
      id: 1,
      title: "OTP Verification",
      status: true,
      description: "Candy canesasdsa ofjsa isauf njkasfiuasf asfn",
      collapsed: true,
    },
    {
      id: 2,
      title: "Personal Details",
      status: false,
      description: "Candy canesasdsa ofjsa isauf njkasfiuasf asfn",
      collapsed: false,
    },
    {
      id: 3,
      title: "Questions and Answers",
      status: false,
      description: "Candy canesasdsa ofjsa isauf njkasfiuasf asfn",
      collapsed: false,
    },
    {
      id: 4,
      title: "Product Selection",
      status: false,
      description: "Candy canesasdsa ofjsa isauf njkasfiuasf asfn",
      collapsed: false,
    },
  ]);

  const toggleExpanded = (id) => {
    setList(
      list.map((item) => {
        if (item.id == id) {
          return { ...item, collapsed: !item.collapsed };
        } else {
          return { ...item, collapsed: false };
        }
      })
    );
  };
  
  useEffect(() => {
    getData({
      variables: {
        applicant_id: data.applicant_id
      }
    })
  }, [])
  
  const CheckList = ({
    id,
    title,
    status,
    description,
    collapsed,
    toggleExpanded,
  }) => {
    return (
      <Stack direction="row" mb={5}>
        <Box mr={3}>
          <Ionicons name="checkmark-circle" size={36} color="#317F6E" />
        </Box>
        <Box flex={1}>
          <VStack space={1}>
            <Text
              color="#317F6E"
              fontSize="lg"
              fontWeight="bold"
              flexWrap="wrap"
            >
              {title}
            </Text>
            {status ? (
              <Text color="#13B995" fontSize="sm">
                Completed
              </Text>
            ) : (
              <Text color="#ccc" fontSize="sm">
                Pending
              </Text>
            )}
            <Collapse isOpen={collapsed}>
              <Box>{description}</Box>
            </Collapse>
          </VStack>
        </Box>
        <Box alignItems="flex-end">
        <Icon
                        as={MaterialIcons}
                        name="navigate-next"
                        size="30"
                        color="emerald.400"
                      />
          
        </Box>
      </Stack>
    );
  };
  
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
          px={6}
        >
          <ScrollView
            _contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <Box flex={1}>
              {dataList.map((item) => (
                <CheckList
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  status={item.status}
                  description={item.description}
                  collapsed={item.collapsed}
                  toggleExpanded={toggleExpanded}
                  
                />
              ))}
            </Box>
            <Box flex={1} justifyContent="flex-end">
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
          </ScrollView>
        </Box>
      </Box>
    );
};


export default ContinueRegistration;
