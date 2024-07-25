import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { v4 } from 'uuid';
import { storage } from '../utils/firebase/firebase';

export default function ImageCard() {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);

  const onchangeImageUpload = (e) => {
    const files = e.target.files;
    console.log(files[0]);
    if (!files) return null;
    setFile(files[0]);
  };

  async function useUploadImage(file) {
    const imgId = v4();
    const storagePath = `test/${imgId}`;
    const storageRef = ref(storage, storagePath);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      console.log(downloadUrl);
      return imgId;
    } catch (error) {
      console.error(error);
      return 'undefined';
    }
  }

  async function handleUpload() {
    console.log('trying to upload');
    if (file) {
      console.log('file was found');
      const downloadUrl = await useUploadImage(file);
      console.log(downloadUrl);
      setImageUrl(downloadUrl);
    } else {
      console.log("file doesn't uploaded yet");
    }
  }

  return (
    <>
      <div>
        <img src={imageUrl} img="img" alt="alt" />
      </div>
      <div>
        <input type="file" accept="image/*" onChange={onchangeImageUpload} />
      </div>
      <div>
        <button onClick={handleUpload}>Upload!</button>
      </div>
    </>
  );
}
