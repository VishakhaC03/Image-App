import { ImageItem } from '../types';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;

  ImageDetails: {
    image: ImageItem;
  };

  EditProfile: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Favorites: undefined;
  Profile: undefined;
};