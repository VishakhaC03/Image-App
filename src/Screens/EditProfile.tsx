import React, { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  Alert,
  Text,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {
  RootStackParamList,
} from '../Navigation/types';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

import { useApp } from '../Context/AppContext';

import {
  validateEmail,
  validateMobile,
} from '../utils/validation';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'EditProfile'
  >;

const EditProfile:
  React.FC<Props> = ({
    navigation,
  }) => {
    const {
      user,
      updateProfile,
    } = useApp();

    const [fullName, setFullName] =
      useState(user?.fullName ?? '');

    const [email, setEmail] =
      useState(user?.email ?? '');

    const [mobile, setMobile] =
      useState(user?.mobile ?? '');

    const [address, setAddress] =
      useState(user?.address ?? '');

    const [city, setCity] =
      useState(user?.city ?? '');

    if (!user) {
      return null;
    }

    const handleSave = async () => {
      if (
        !fullName.trim() ||
        !email.trim() ||
        !mobile.trim() ||
        !address.trim() ||
        !city.trim()
      ) {
        Alert.alert(
          'Validation Error',
          'All fields are mandatory.'
        );

        return;
      }

      if (!validateEmail(email)) {
        Alert.alert(
          'Invalid Email',
          'Please enter a valid email address.'
        );

        return;
      }

      if (!validateMobile(mobile)) {
        Alert.alert(
          'Invalid Mobile',
          'Mobile number must contain exactly 10 digits.'
        );

        return;
      }

      await updateProfile({
        ...user,
        fullName: fullName.trim(),
        email: email.trim(),
        mobile,
        address: address.trim(),
        city: city.trim(),
      });

      Alert.alert(
        'Profile Updated',
        'Your profile has been updated successfully.'
      );

      navigation.goBack();
    };

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
      >
        <Text style={styles.heading}>
          Edit your information
        </Text>

        <CustomInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <CustomInput
          placeholder="Mobile Number"
          value={mobile}
          onChangeText={text =>
            setMobile(
              text
                .replace(/[^0-9]/g, '')
                .slice(0, 10)
            )
          }
          keyboardType="number-pad"
          maxLength={10}
        />

        <CustomInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          multiline
        />

        <CustomInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />

        <CustomButton
          title="Save Changes"
          onPress={handleSave}
        />
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
  },

  content: {
    padding: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#17132E',
  },
});

export default EditProfile;