import { getDownloadURL, ref, storage, uploadBytes } from './firebase';

export async function getImageFromStorage(imgId) {
  try {
    const url = await getDownloadURL(ref(storage, imgId));
    return url;
  } catch (error) {
    console.error('Error getting download URL:', error);
    return 'undefined';
  }
}
