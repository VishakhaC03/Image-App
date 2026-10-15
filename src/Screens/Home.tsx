import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Platform,
  Alert,
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

import { ImageItem } from '../types';

import { fetchImages } from '../Services/api';

import ImageCard from '../components/ImageCard';
import SearchBar from '../components/SearchBar';

import useDebounce from '../Hooks/useDebounce';

import { useApp } from '../Context/AppContext';

type Props =
  CompositeScreenProps<
    BottomTabScreenProps<
      BottomTabParamList,
      'Home'
    >,
    NativeStackScreenProps<
      RootStackParamList
    >
  >;

type FilterType =
  | 'ALL'
  | 'A-M'
  | 'N-Z';

const Home: React.FC<Props> = ({
  navigation,
}) => {
  const {
    toggleFavorite,
    isFavorite,
    logout,
  } = useApp();

  const [images, setImages] =
    useState<ImageItem[]>([]);

  const [page, setPage] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState('');

  const [search, setSearch] =
    useState('');

  const [filter, setFilter] =
    useState<FilterType>('ALL');

  const [hasMore, setHasMore] =
    useState(true);

  const debouncedSearch =
    useDebounce(search, 350);

  const loadInitialImages =
    useCallback(async () => {
      try {
        setLoading(true);
        setError('');

        const data =
          await fetchImages(1, 10);

        setImages(data);
        setPage(1);
        setHasMore(data.length === 10);
      } catch {
        setError(
          'Unable to load images. Please check your internet connection.'
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadInitialImages();
  }, [loadInitialImages]);

  const loadMore = async () => {
    if (
      loading ||
      loadingMore ||
      refreshing ||
      !hasMore
    ) {
      return;
    }

    try {
      setLoadingMore(true);

      const nextPage = page + 1;

      const data =
        await fetchImages(
          nextPage,
          10
        );

      setImages(previous => {
        const existingIds = new Set(
          previous.map(item => item.id)
        );

        const newImages =
          data.filter(
            item =>
              !existingIds.has(item.id)
          );

        return [
          ...previous,
          ...newImages,
        ];
      });

      setPage(nextPage);

      if (data.length < 10) {
        setHasMore(false);
      }
    } catch {
      setError(
        'Unable to load additional images.'
      );
    } finally {
      setLoadingMore(false);
    }
  };

  const handleRefresh =
    useCallback(async () => {
      if (refreshing) {
        return;
      }

      try {
        setRefreshing(true);
        setError('');

        const data =
          await fetchImages(1, 10);

        setImages(data);
        setPage(1);
        setHasMore(
          data.length === 10
        );
      } catch {
        setError(
          'Unable to refresh images.'
        );
      } finally {
        setRefreshing(false);
      }
    }, [refreshing]);

  const filteredImages =
    useMemo(() => {
      const searchValue =
        debouncedSearch
          .trim()
          .toLowerCase();

      return images.filter(image => {
        const author =
          image.author.toLowerCase();

        const matchesSearch =
          searchValue === '' ||
          author.includes(searchValue);

        const firstLetter =
          image.author
            .trim()
            .charAt(0)
            .toUpperCase();

        let matchesFilter = true;

        if (filter === 'A-M') {
          matchesFilter =
            firstLetter >= 'A' &&
            firstLetter <= 'M';
        }

        if (filter === 'N-Z') {
          matchesFilter =
            firstLetter >= 'N' &&
            firstLetter <= 'Z';
        }

        return (
          matchesSearch &&
          matchesFilter
        );
      });
    }, [
      images,
      debouncedSearch,
      filter,
    ]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#6C4AB6"
        />

        <Text style={styles.loadingText}>
          Loading images...
        </Text>
      </View>
    );
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
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          void logout();
        },
      },
    ]
  );
};

  return (
    <View style={styles.container}>
       {/* Header */}
    <View style={styles.header}>
      <Text style={styles.headerTitle}>
        Image Application
      </Text>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
      <SearchBar
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filters}>
        {(
          [
            'ALL',
            'A-M',
            'N-Z',
          ] as FilterType[]
        ).map(item => (
          <TouchableOpacity
            key={item}
            style={[
              styles.filterButton,
              filter === item &&
                styles.activeFilter,
            ]}
            onPress={() =>
              setFilter(item)
            }
          >
            <Text
              style={[
                styles.filterText,
                filter === item &&
                  styles.activeFilterText,
              ]}
            >
              {item === 'ALL'
                ? 'All Images'
                : item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {error ? (
        <Text style={styles.error}>
          {error}
        </Text>
      ) : null}

      <FlatList
        data={filteredImages}
        keyExtractor={item => item.id}
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={
              handleRefresh
            }
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListEmptyComponent={
          <Text
            style={
              styles.emptyText
            }
          >
            No images found.
          </Text>
        }
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              style={{ margin: 20 }}
              color="#6C4AB6"
            />
          ) : null
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

  // Header styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6C4AB6',
  },

  logoutButton: {
    backgroundColor: '#6C4AB6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Loading screen
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    color: '#666',
  },

  // Image filters
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 12,
  },

  filterButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 3,
    borderRadius: 8,
    backgroundColor: '#E8E2F7',
    alignItems: 'center',
  },

  activeFilter: {
    backgroundColor: '#6C4AB6',
  },

  filterText: {
    color: '#4D3A70',
    fontWeight: '600',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  // Error and empty state
  error: {
    color: '#C62828',
    textAlign: 'center',
    padding: 10,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#777',
    fontSize: 16,
  },
});


export default Home;