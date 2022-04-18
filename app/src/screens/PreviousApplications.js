import { useFocusEffect } from "@react-navigation/native"
import {
  Badge,
  Box,
  Button,
  Pressable,
  Divider,
  FlatList,
  HStack,
  Icon,
  Text,
  VStack
} from "native-base"
import React, { useState, useRef, useEffect } from "react"
import { RefreshControl } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { gql, useQuery, useLazyQuery, useMutation } from "@apollo/client"
import moment from "moment"
import LoadingModal from "../CustomComponents/LoadingModal"

const GET_APPLICANT_ID = gql`
  query getApplicantIds($user_id: Int!) {
    applicant_id(
      where: { user_id: { _eq: $user_id } }
      order_by: { updated_at: desc }
    ) {
      id
      applicant_id
      status
      created_at
      updated_at
      custom_updated_at
      user_id
    }
  }
`

const INSERT_APPLICANT_ID = gql`mutation insertApplicantId($user_id: Int!) {
  insert_applicant_id_one(object: {user_id: $user_id}) {
    applicant_id
    user_id
    applicant {
      email
    }
  }
}
`

const GET_FIELDS = gql`
query getFields {
  fields(order_by: {id: asc}) {
    id
    field_name
    place_holder
    dropdown_values
  }
}
`;

const PreviousApplications = ({ route, navigation }) => {
  const data = route?.params?.data
  const [applicantIdData, setApplicantIdData] = useState([])
  const [refreshing, setRefreshing] = React.useState(false)
  const [loadingNewApplicant, setLoadingNewApplicant] = useState(false)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    getApplicantId({
      variables: {
        user_id: data?.id
      }
    })
  }, [])
  const [getApplicantId, { loading }] = useLazyQuery(GET_APPLICANT_ID, {
    notifyOnNetworkStatusChange: true,
    nextFetchPolicy: "network-only",
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setRefreshing(false)
      console.log(data);
      setApplicantIdData(data.applicant_id)
    },
    onError: (data) => {
      console.log(data)
    }
  })

  const [getFields, { data: fieldArray }] = useLazyQuery(
    GET_FIELDS,
    {
      fetchPolicy: "network-only",
      nextFetchPolicy: "network-only",
      onCompleted: data => {
        setLoadingNewApplicant(false)
        navigation.navigate("Basic Account Details", { id: 1, fields: data.fields, data: addApplicantData });
        
      }
    }
  );

  const [insertApplicantId, {data: addApplicantData}] = useMutation(INSERT_APPLICANT_ID, {
    onCompleted: data => {
      getFields()
    },
    onError: (error) => {
      setLoadingNewApplicant(false)
      console.log(error);
    }
  });

  const friendlyId = (id) => {
    const idArray = id.split("-")
    let finalID = idArray[0]
    // idArray.map(item => {
    //   finalID+=item.substr(0,2)
    // })
    return finalID
  }

  useFocusEffect(
    React.useCallback(() => {
      getApplicantId({
        variables: {
          user_id: data.id
        }
      })
    }, [])
  );

  return (
    <Box flex={1} alignItems="center" minHeight="100%" px={3}>
      <Text fontSize="3xl" color="white" fontWeight="bold" mt={20}>
        Your Previous Applications
      </Text>
      <Text
        fontSize="xl"
        mx={5}
        mt={1}
        textAlign="center"
        color="white"
        fontWeight="thin"
      >
        Select any application to view more details
      </Text>
      <Divider my={3} />
      <Text color="white" fontSize="md">
        Or
      </Text>
      <Text color="white" fontSize="xl" fontWeight="bold" pb={2}>
        Create New Application
      </Text>
      <Box flex={1} flexGrow={1} width="full">
        <FlatList
          refreshing={refreshing}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          p={4}
          data={applicantIdData}
          renderItem={({ item }) => (
            <Pressable
            onPress={() => {
              navigation.navigate("Continue Application", {
                data: item
              })
            }}>
              {({ isHovered, isFocused, isPressed }) => (
                <Box
                  // borderBottomWidth="1"
                  style={{
                    transform: [{
                      scale: isPressed ? 0.96 : 1
                    }]
                  }}
                  backgroundColor={isPressed ? "gray.200" : "white"}
                  rounded="lg"
                  shadow={4}
                  shadowR
                  marginBottom={8}
                  // borderColor="coolGray.200"
                  pl="4"
                  pr="5"
                  py="2"
                >
                  <HStack space={3} justifyContent="space-between">
                    <VStack space={1}>
                      <VStack>
                        <Text color="coolGray.400" fontSize="xs">
                          Application ID
                        </Text>
                        <Text color="coolGray.800" fontSize="md" bold>
                          {friendlyId(item.applicant_id)}
                        </Text>
                      </VStack>
                      {/* <Text fontSize="xs">
                    <Badge colorScheme={`${item.recentText == "Completed" ? "success" : "danger"}`}>
                      <Text fontSize="xs" >{item.recentText}</Text>
                    </Badge>
                    </Text> */}
                      <HStack alignItems="center">
                        <Box
                          rounded="full"
                          backgroundColor={`${
                            item.status == "Completed"
                              ? "emerald.500"
                              : "red.500"
                          }`}
                          w={3}
                          h={3}
                          mr={1}
                        ></Box>
                        <Text fontSize="xs">{item.status}</Text>
                      </HStack>
                      <VStack>
                        <Text fontSize="xs" color="coolGray.400">
                          Created: {moment(item.created_at).fromNow()}
                        </Text>
                        {item.custom_updated_at != item.created_at && (
                          <Text fontSize="xs" color="coolGray.400">
                            Updated: {moment(item.custom_updated_at).fromNow()}
                          </Text>
                        )}
                      </VStack>
                    </VStack>
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
        mb={5}
      >
        <Button
          size="md"
          rounded="md"
          backgroundColor="#317F6E"
          border={1}
          borderWidth="1"
          borderColor="white"
          shadow={5}
          mb={5}
          onPress={() => navigation.navigate("Welcome")}
        >
          GO BACK
        </Button>

        <Button
          size="md"
          rounded="md"
          backgroundColor={"white"}
          border={1}
          borderWidth="1"
          borderColor={"white"}
          shadow={5}
          _text={{
            color: "darkBlue.900"
          }}
          onPress={() => {
            setLoadingNewApplicant(true)
            insertApplicantId({
              variables: {
                user_id: data.id
              }
            })
          }}
        >
          Create New Application
        </Button>
      </Box>
      <LoadingModal
        message="Loading your previous applications"
        showModal={loading}
      />
       <LoadingModal
        message="Creating new application"
        showModal={loadingNewApplicant}
      />
    </Box>
  )
}

export default PreviousApplications
