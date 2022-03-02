import { NhostClient } from '@nhost/nhost-js'
import { HASURA } from "../config";

const nhost = new NhostClient({
  backendUrl: HASURA,
  // clientStorageType: 'react-native',
  // clientStorage: 'react-native'
})

export { nhost };