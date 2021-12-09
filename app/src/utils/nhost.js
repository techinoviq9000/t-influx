import { createClient } from "nhost-js-sdk";
import { HASURA } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const nhostClient = createClient({
  baseURL: HASURA,
  clientStorage: AsyncStorage,
  clientStorageType: "react-native",
})
const { auth, storage } = nhostClient;

export { auth, storage };