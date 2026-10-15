import React, { useState } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

//import * as FileSystem from 'expo-file-system/legacy';
//import * as MediaLibrary from 'expo-media-library';

import {
  RootStackParamList,
} from '../Navigation/types';

import CustomButton from '../components/CustomButton';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'ImageDetails'
  >;

const ImageDetails:
  React.FC<Props> = ({ route }) => {
    const { image } = route.params;

    const [downloading, setDownloading] =
      useState(false);

const downloadImage = async () => {
  if (Platform.OS === 'web') {
    try {
      const response = await fetch(image.download_url);

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `image-${image.id}.jpg`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      window.alert('Unable to download image.');
    }

    return;
  }

  try {
    setDownloading(true);

    // Import native modules only when running on mobile.
    const FileSystem = await import(
      'expo-file-system/legacy'
    );

    const MediaLibrary = await import(
      'expo-media-library'
    );

    const permission =
      await MediaLibrary.requestPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permission Required',
        'Please allow access to save images.'
      );
      return;
    }

    const fileUri =
      `${FileSystem.cacheDirectory}image-${image.id}.jpg`;

    const result =
      await FileSystem.downloadAsync(
        image.download_url,
        fileUri
      );

    await MediaLibrary.saveToLibraryAsync(result.uri);

    Alert.alert(
      'Success',
      'Image saved to your device gallery!'
    );
  } catch (error) {
    console.error(error);

    Alert.alert(
      'Error',
      'Unable to download image.'
    );
  } finally {
    setDownloading(false);
  }
};

    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: image.download_url,
          }}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.details}>
          <Text style={styles.author}>
            {image.author}
          </Text>

          <Text style={styles.id}>
            Image ID: {image.id}
          </Text>

          {downloading ? (
            <ActivityIndicator
              size="large"
              color="#6C4AB6"
              style={{ marginTop: 20 }}
            />
          ) : (
            <CustomButton
              title="Download Image"
              onPress={downloadImage}
            />
          )}
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
  },

  image: {
    flex: 1,
    width: '100%',
  },

  details: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  author: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#17132E',
  },

  id: {
    marginTop: 5,
    marginBottom: 10,
    color: '#777',
  },
});

export default ImageDetails;