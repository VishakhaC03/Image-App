import React, {
  useMemo,
  useState,
} from 'react';

import {
  View,
  FlatList,
  Text,
  StyleSheet,
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

import SearchBar from '../components/SearchBar';
import ImageCard from '../components/ImageCard';

import { useApp } from '../Context/AppContext';

type Props =
  CompositeScreenProps<
    BottomTabScreenProps<
      BottomTabParamList,
      'Favorites'
    >,
    NativeStackScreenProps<
      RootStackParamList
    >
  >;

const Favorites:
  React.FC<Props> = ({
    navigation,
  }) => {
    const {
      favorites,
      toggleFavorite,
      isFavorite,
    } = useApp();

    const [search, setSearch] =
      useState('');

    const filteredFavorites =
      useMemo(() => {
        const value = search
          .trim()
          .toLowerCase();

        if (!value) {
          return favorites;
        }

        return favorites.filter(
          image =>
            image.author
              .toLowerCase()
              .includes(value)
        );
      }, [favorites, search]);

    return (
      <View style={styles.container}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search favorites..."
        />

        <FlatList
          data={filteredFavorites}
          keyExtractor={item =>
            item.id
          }
          renderItem={({ item }) => (
            <ImageCard
              image={item}
              favorite={isFavorite(
                item.id
              )}
              onFavorite={() =>
                toggleFavorite(item)
              }
              onPress={() =>
                navigation.navigate(
                  'ImageDetails',
                  { image: item }
                )
              }
            />
          )}
          ListEmptyComponent={
            <Text
              style={
                styles.empty
              }
            >
              {favorites.length === 0
                ? 'You have not added any favorites yet.'
                : 'No matching favorites found.'}
            </Text>
          }
        />
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5FF',
  },

  empty: {
    textAlign: 'center',
    marginTop: 80,
    paddingHorizontal: 30,
    color: '#777',
    fontSize: 16,
  },
});

export default Favorites;