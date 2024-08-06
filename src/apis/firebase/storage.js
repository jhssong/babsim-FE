import { getDownloadURL, ref, storage } from './firebase';

export async function getImageFromStorage(imgId) {
  try {
    const url = await getDownloadURL(ref(storage, imgId + '.jpg'));
    return url;
  } catch (error) {
    console.error('Error getting download URL:', error);
    return null;
  }
}
