import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { ImageItem } from '../types';

interface Props {
  image: ImageItem;
  favorite: boolean;
  onPress: () => void;
  onFavorite: () => void;
}

const ImageCard: React.FC<Props> = ({
  image,
  favorite,
  onPress,
  onFavorite,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: image.download_url }}
        style={styles.image}
      />

      <View style={styles.info}>
        <View style={styles.textArea}>
          <Text
            style={styles.author}
            numberOfLines={1}
          >
            {image.author}
          </Text>

          <Text style={styles.id}>
            Image ID: {image.id}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={event => {
            event.stopPropagation();
            onFavorite();
          }}
        >
          <Text
            style={[
              styles.heart,
              favorite &&
                styles.favoriteHeart,
            ]}
          >
            {favorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 14,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  image: {
    width: '100%',
    height: 220,
    backgroundColor: '#EEE',
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },

  textArea: {
    flex: 1,
  },

  author: {
    fontSize: 17,
    fontWeight: '700',
    color: '#17132E',
  },

  id: {
    color: '#777',
    marginTop: 4,
  },

  favoriteButton: {
    padding: 8,
  },

  heart: {
    fontSize: 30,
    color: '#777',
  },

  favoriteHeart: {
    color: '#E63946',
  },
});

export default ImageCard;