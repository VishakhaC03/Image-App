import React from 'react';

import {
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
  RootStackParamList,
  BottomTabParamList,
} from './types';

import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Home from '../Screens/Home';
import Favorites from '../Screens/Favorites';
import Profile from '../Screens/Profile';
import EditProfile from '../Screens/EditProfile';
import ImageDetails from '../Screens/ImageDetails';

import { useApp } from '../Context/AppContext';

const Stack =
  createNativeStackNavigator<
    RootStackParamList
  >();

const Tab =
  createBottomTabNavigator<
    BottomTabParamList
  >();


const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6C4AB6',
        },
        headerTintColor: '#FFFFFF',
        tabBarActiveTintColor: '#6C4AB6',
        tabBarInactiveTintColor: '#777777',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Image Gallery',
          tabBarLabel: 'Home',
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: 'My Favorites',
          tabBarLabel: 'Favorites',
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'My Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};


const AppNavigator = () => {
  const {
    isLoggedIn,
    loading,
  } = useApp();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color="#6C4AB6"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                title: 'Register',
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ImageDetails"
              component={
                ImageDetails
              }
              options={{
                title: 'Image Details',
              }}
            />

            <Stack.Screen
              name="EditProfile"
              component={
                EditProfile
              }
              options={{
                title: 'Edit Profile',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;