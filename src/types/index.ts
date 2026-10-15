export interface User {
  fullName: string;
  email: string;
  gender: string;
  mobile: string;
  address: string;
  city: string;
  password: string;
}

export interface ImageItem {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}