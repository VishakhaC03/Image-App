import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
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
import { validateEmail } from '../utils/validation';

type Props =
  NativeStackScreenProps<
    RootStackParamList,
    'Login'
  >;

const Login: React.FC<Props> = ({
  navigation,
}) => {
  const { login } = useApp();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [errorMessage, setErrorMessage] = useState('');

  
const handleLogin = async () => {
  setErrorMessage('');

  if (!email.trim() || !password) {
    setErrorMessage(
      'Please enter your email and password.'
    );
    return;
  }

  if (!validateEmail(email)) {
    setErrorMessage(
      'Please enter a valid email address.'
    );
    return;
  }

  try {
    const success = await login(email, password);

    if (!success) {
      setErrorMessage(
        'Invalid email or password. Please try again.'
      );
    }
  } catch {
    setErrorMessage(
      'Something went wrong. Please try again.'
    );
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
        Image Application
      </Text>

      <Text style={styles.title}>
        Welcome to our Gallery
      </Text>

      <Text style={styles.subtitle}>
        Login to continue exploring images
      </Text>

      <CustomInput
        placeholder="Email Address"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <CustomInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage ? (
  <Text style={styles.errorText}>
    {errorMessage}
  </Text>
) : null}

      <CustomButton
        title="Login"
        onPress={handleLogin}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            'Register'
          )
        }
      >
        <Text style={styles.register}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#8176ad',
  },

  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#381a79',
    marginBottom: 35,
  },

  errorText: {
  color: '#e00b0b',
  fontSize: 14,
  marginBottom: 10,
  marginTop: -5,
},

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#17132E',
  },

  subtitle: {
    color: '#1e226c',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 25,
  },

  register: {
    textAlign: 'center',
    marginTop: 15,
    color: '#321b63',
    fontWeight: '600',
  },
});

export default Login;