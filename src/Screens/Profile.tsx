import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

import {
  CompositeScreenProps,
} from '@react-navigation/native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {
  BottomTabParamList,
  RootStackParamList,
} from '../Navigation/types';

import CustomButton from '../components/CustomButton';

import { useApp } from '../Context/AppContext';

type Props =
  CompositeScreenProps<
    BottomTabScreenProps<
      BottomTabParamList,
      'Profile'
    >,
    NativeStackScreenProps<
      RootStackParamList
    >
  >;

const Profile:
  React.FC<Props> = ({
    navigation,
  }) => {
    const { user, logout } = useApp();

    if (!user) {
      return null;
    }

    
const handleLogout = async () => {
  if (Platform.OS === 'web') {
    const confirmed = window.confirm(
      'Are you sure you want to logout?'
    );

    if (confirmed) {
      await logout();
    }

    return;
  }

  Alert.alert(
    'Logout',
    'Are you sure you want to logout?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          void logout();
        },
      },
    ]
  );
};


    
return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={styles.content}
    showsVerticalScrollIndicator={true}
  >
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>
        {user.fullName.charAt(0).toUpperCase()}
      </Text>
    </View>

    <Text style={styles.name}>
      {user.fullName}
    </Text>

    <View style={styles.card}>
      <ProfileRow
        label="Email"
        value={user.email}
      />

      <ProfileRow
        label="Mobile"
        value={user.mobile}
      />

      <ProfileRow
        label="Gender"
        value={user.gender}
      />

      <ProfileRow
        label="Address"
        value={user.address}
      />

      <ProfileRow
        label="City"
        value={user.city}
      />
    </View>

    <CustomButton
      title="Edit Profile"
      onPress={() =>
        navigation.navigate('EditProfile')
      }
    />

    <CustomButton
      title="Logout"
      onPress={handleLogout}
    />

  </ScrollView>
);

  };

interface ProfileRowProps {
  label: string;
  value: string;
}

const ProfileRow:
  React.FC<ProfileRowProps> = ({
    label,
    value,
  }) => (
    <View style={styles.row}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: 'center',
    backgroundColor: '#6C4AB6',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },

  name: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  label: {
    color: '#777',
    fontSize: 13,
  },

  value: {
    fontSize: 16,
    marginTop: 3,
    color: '#17132E',
  },
});


export default Profile;