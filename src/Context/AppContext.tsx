import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  User,
  ImageItem,
} from '../types';

interface AppContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  favorites: ImageItem[];

  register: (user: User) => Promise<void>;

  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  logout: () => Promise<void>;

  updateProfile: (user: User) => Promise<void>;

  toggleFavorite: (
    image: ImageItem
  ) => Promise<void>;

  isFavorite: (id: string) => boolean;
}

const AppContext =
  createContext<AppContextType | undefined>(
    undefined
  );

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [favorites, setFavorites] =
    useState<ImageItem[]>([]);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedUser =
        await AsyncStorage.getItem('user');

      const session =
        await AsyncStorage.getItem('session');

      const storedFavorites =
        await AsyncStorage.getItem('favorites');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      if (session === 'true') {
        setIsLoggedIn(true);
      }

      if (storedFavorites) {
        setFavorites(
          JSON.parse(storedFavorites)
        );
      }
    } catch (error) {
      console.error(
        'Storage loading error:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    newUser: User
  ) => {
    await AsyncStorage.setItem(
      'user',
      JSON.stringify(newUser)
    );

    setUser(newUser);
  };

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const storedUser =
        await AsyncStorage.getItem('user');

      if (!storedUser) {
        return false;
      }

      const parsedUser: User =
        JSON.parse(storedUser);

      if (
        parsedUser.email
          .trim()
          .toLowerCase() ===
          email.trim().toLowerCase() &&
        parsedUser.password === password
      ) {
        await AsyncStorage.setItem(
          'session',
          'true'
        );

        setUser(parsedUser);
        setIsLoggedIn(true);

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(
      'session'
    );

    setIsLoggedIn(false);
  };

  const updateProfile = async (
    updatedUser: User
  ) => {
    await AsyncStorage.setItem(
      'user',
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
  };

  const toggleFavorite = async (
    image: ImageItem
  ) => {
    let updatedFavorites: ImageItem[];

    const exists = favorites.some(
      item => item.id === image.id
    );

    if (exists) {
      updatedFavorites =
        favorites.filter(
          item => item.id !== image.id
        );
    } else {
      updatedFavorites = [
        ...favorites,
        image,
      ];
    }

    setFavorites(updatedFavorites);

    await AsyncStorage.setItem(
      'favorites',
      JSON.stringify(updatedFavorites)
    );
  };

  const isFavorite = (
    id: string
  ): boolean => {
    return favorites.some(
      item => item.id === id
    );
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoggedIn,
        loading,
        favorites,
        register,
        login,
        logout,
        updateProfile,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context =
    useContext(AppContext);

  if (!context) {
    throw new Error(
      'useApp must be used inside AppProvider'
    );
  }

  return context;
};