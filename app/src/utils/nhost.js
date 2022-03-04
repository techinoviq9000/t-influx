import  AsyncStorage from '@react-native-async-storage/async-storage';
import { NhostClient } from '@nhost/nhost-js'
import { HASURA } from "../config";

const nhost = new NhostClient({
  backendUrl: HASURA,
  clientStorageType: 'react-native',
  clientStorage: AsyncStorage
})

export { nhost };