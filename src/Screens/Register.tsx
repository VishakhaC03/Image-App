import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

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
  validatePassword,
} from '../utils/validation';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'Register'
  >;

const Register: React.FC<Props> = ({
  navigation,
}) => {
  const { register } = useApp();

  const [fullName, setFullName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [gender, setGender] =
    useState('');

  const [mobile, setMobile] =
    useState('');

  const [address, setAddress] =
    useState('');

  const [city, setCity] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState('');

  const handleRegister = async () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !gender ||
      !mobile.trim() ||
      !address.trim() ||
      !city ||
      !password ||
      !confirmPassword
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
        'Invalid Mobile Number',
        'Mobile number must contain exactly 10 digits.'
      );

      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Invalid Password',
        'Password must contain at least 6 characters.'
      );

      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        'Password Error',
        'Password and Confirm Password must match.'
      );

      return;
    }

    try {
      await register({
        fullName: fullName.trim(),
        email: email.trim(),
        gender,
        mobile,
        address: address.trim(),
        city,
        password,
      });

      Alert.alert(
        'Registration Successful',
        'Your account has been created. Please login.'
      );

      navigation.navigate('Login');
    } catch {
      Alert.alert(
        'Error',
        'Unable to register user.'
      );
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        Create Account
      </Text>

      <Text style={styles.subtitle}>
        Register to explore PixelVault
      </Text>

      <CustomInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <CustomInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>
        Gender
      </Text>

      <View style={styles.genderContainer}>
        {['Male', 'Female', 'Other'].map(
          item => (
            <TouchableOpacity
              key={item}
              style={styles.genderOption}
              onPress={() =>
                setGender(item)
              }
            >
              <View
                style={[
                  styles.radio,
                  gender === item &&
                    styles.radioSelected,
                ]}
              />

              <Text>{item}</Text>
            </TouchableOpacity>
          )
        )}
      </View>

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

      <Text style={styles.label}>
        City
      </Text>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={city}
          onValueChange={setCity}
        >
          <Picker.Item
            label="Select City"
            value=""
          />

          <Picker.Item
            label="Pune"
            value="Pune"
          />

          <Picker.Item
            label="Mumbai"
            value="Mumbai"
          />

          <Picker.Item
            label="Bengaluru"
            value="Bengaluru"
          />

          <Picker.Item
            label="Hyderabad"
            value="Hyderabad"
          />

          <Picker.Item
            label="Delhi"
            value="Delhi"
          />
        </Picker>
      </View>

      <CustomInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <CustomInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <CustomButton
        title="Register"
        onPress={handleRegister}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Login')
        }
      >
        <Text style={styles.loginText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
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
    paddingBottom: 40,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#17132E',
    marginTop: 20,
  },

  subtitle: {
    color: '#666',
    marginBottom: 25,
    marginTop: 5,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },

  genderContainer: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },

  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#6C4AB6',
    marginRight: 6,
  },

  radioSelected: {
    backgroundColor: '#6C4AB6',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    backgroundColor: '#FFF',
    marginBottom: 12,
    overflow: 'hidden',
  },

  loginText: {
    textAlign: 'center',
    marginTop: 15,
    color: '#6C4AB6',
    fontWeight: '600',
  },
});

export default Register;