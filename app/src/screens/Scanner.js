import {
  Box,
  
  CheckIcon,
  HStack,
  
  
  VStack,
  
  Wrap,
  Stack,
  Center,
  Input,
  Pressable,
  CloseIcon,
  FormControl,
  Switch,
} from "native-base";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  Share,
  ScrollView,
  SafeAreaViewBase,
  Platform,
  Text
} from "react-native";
import Clipboard from '@react-native-community/clipboard';
import AppLoading from "expo-app-loading";
import { Camera } from "expo-camera";

import { useFonts, Inter_900Black } from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import InputFields from "../CustomComponents/InputFields";
import StepHeader from "../CustomComponents/StepsHeader";
import SelectField from "../CustomComponents/SelectField";
import * as ImagePicker from 'expo-image-picker';
// import { nanoid } from 'nanoid'
// import firebase from '../utils/firebase';
import Environment from "../utils/environment";

const Scanner = ({ navigation }) => {
	const [meow, requestPermission] = ImagePicker.useMediaLibraryPermissions();
	console.log(Environment["GOOGLE_CLOUD_VISION_API_KEY"])
// console.log(meow)

  const [state, setState] = useState({
    image: null,
		uploading: false,
		googleResponse: null
  })

  
	const organize = array => {
		return array.map(function(item, i) {
			return (
				<View key={i}>
					<Text>{item}</Text>
				</View>
			);
		});
	};

	const _maybeRenderUploadingOverlay = () => {
		if (state.uploading) {
			return (
				<View
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: 'rgba(0,0,0,0.4)',
							alignItems: 'center',
							justifyContent: 'center'
						}
					]}
				>
					<ActivityIndicator color="#fff" animating size="large" />
				</View>
			);
		} else {
			return <></>
		}
	};

	const _maybeRenderImage = () => {
		let { image, googleResponse } = state;
		if (!image) {
			return <></>
		}

		return (
			<View
				style={{
					marginTop: 20,
					width: 250,
					borderRadius: 3,
					elevation: 2
				}}
			>
				<Button
					style={{ marginBottom: 10 }}
					onPress={submitToGoogle}
					title="Analyze!"
				/>

				<View
					style={{
						borderTopRightRadius: 3,
						borderTopLeftRadius: 3,
						shadowColor: 'rgba(0,0,0,1)',
						shadowOpacity: 0.2,
						shadowOffset: { width: 4, height: 4 },
						shadowRadius: 5,
						overflow: 'hidden'
					}}
				>
					<Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
				</View>
				<Text
					onPress={() => _copyToClipboard}
					onLongPress={() => _share}
					style={{ paddingVertical: 10, paddingHorizontal: 10 }}
				/>

				<Text>Raw JSON:</Text>

				{googleResponse && (
					<Text
						onPress={() => _copyToClipboard}
						onLongPress={ () => _share}
						style={{ paddingVertical: 10, paddingHorizontal: 10 }}
					>
						{JSON.stringify(googleResponse.responses)}
					</Text>
				)}
			</View>
		);
	};

	const _keyExtractor = (item, index) => item.id;

	const _renderItem = item => {
		<Text>response: {JSON.stringify(item)}</Text>;
	};

	const _share = () => {
		Share.share({
			message: JSON.stringify(state.googleResponse.responses),
			title: 'Check it out',
			url: state.image
		});
	};

	const _copyToClipboard = () => {
		Clipboard.setString(state.image);
		alert('Copied to clipboard');
	};

	const _takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});
		_handleImagePicked(pickerResult);
		
	};

	const _pickImage = async () => {
		console.log("meow")
		let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

		_handleImagePicked(result);
		// console.log(result)
	};

	const _handleImagePicked = async pickerResult => {
		try {
			setState({ ...state,  uploading: true });

			if (!pickerResult.cancelled) {
				// uploadUrl = await uploadImageAsync(pickerResult.uri);
				setState({ ...state,  image: pickerResult.uri, uploading: false });
			}
		} catch (e) {
			console.log(e);
			alert('Upload failed, sorry :(');
		} finally {
			console.log(state)
			// setState({ ...state,  uploading: false });
		}
	};

	const submitToGoogle = async () => {
		try {
			setState({ ...state,  uploading: true });
			let { image } = state;
			let body = JSON.stringify({
				requests: [
					{
						features: [
							// { type: 'LABEL_DETECTION', maxResults: 10 },
							// { type: 'LANDMARK_DETECTION', maxResults: 5 },
							// { type: 'FACE_DETECTION', maxResults: 5 },
							// { type: 'LOGO_DETECTION', maxResults: 5 },
							{ type: 'TEXT_DETECTION', maxResults: 5 },
							{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 5 },
							// { type: 'SAFE_SEARCH_DETECTION', maxResults: 5 },
							// { type: 'IMAGE_PROPERTIES', maxResults: 5 },
							{ type: 'CROP_HINTS', maxResults: 5 },
							// { type: 'WEB_DETECTION', maxResults: 5 }
						],
						image: {
							source: {
								imageUri: image
							}
						}
					}
				]
			});
			let response = await fetch(
				'https://vision.googleapis.com/v1/images:annotate?key=' +
					Environment["GOOGLE_CLOUD_VISION_API_KEY"],
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: body
				}
			);
			let responseJson = await response.json();
			console.log(responseJson);
			setState({ ...state, 
				googleResponse: responseJson,
				uploading: false
			});
		} catch (error) {
			console.log(error);
		}
	};

  useEffect(async () => {
    // await Permissions.askAsync(Permissions.CAMERA_ROLL);
		// await Permissions.askAsync(Permissions.CAMERA);
		requestPermission();
		const { status } = await Camera.requestCameraPermissionsAsync();
		// console.log(status)
  }, []);
  

	return (
			<View style={styles.container}>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}
				>
					<View style={styles.getStartedContainer}>
						{state.image ? null : (
							<Text style={styles.getStartedText}>Google Cloud Vision</Text>
						)}
					</View>

					<View style={styles.helpContainer}>
						<Button
							onPress={_pickImage}
							title="Pick an image from camera roll"
						/>

						<Button onPress={() => _takePhoto} title="Take a photo" />
						{state.googleResponse && (
							<FlatList
								data={state.googleResponse.responses[0].labelAnnotations}
								extraData={state}
								keyExtractor={ () => _keyExtractor}
								renderItem={({ item }) => <Text>Item: {item.description}</Text>}
							/>
						)}
						<_maybeRenderImage />
						<_maybeRenderUploadingOverlay />
					</View>
				</ScrollView>
			</View>
		);

async function uploadImageAsync(uri) {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function() {
			resolve(xhr.response);
		};
		xhr.onerror = function(e) {
			console.log(e);
			reject(new TypeError('Network request failed'));
		};
		xhr.responseType = 'blob';
		xhr.open('GET', uri, true);
		xhr.send(null);
	});

	// const ref = firebase
	// 	.storage()
	// 	.ref()
	// 	.child(nanoid());
	// const snapshot = await ref.put(blob);

	blob.close();

	return await snapshot.ref.getDownloadURL();
}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingBottom: 10
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center'
	},
	contentContainer: {
		paddingTop: 30
	},

	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50
	},

	getStartedText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
		textAlign: 'center'
	},

	helpContainer: {
		marginTop: 15,
		alignItems: 'center'
	}
});

export default Scanner;
