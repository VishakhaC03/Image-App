import { ImageItem } from '../types';

export const fetchImages = async (
  page: number = 1,
  limit: number = 10
): Promise<ImageItem[]> => {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Unable to fetch images');
  }

  return await response.json();
};