import { useEffect } from 'react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../apis/firebase/firebase';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ImageCard({ imageUrls, setImageUrls, maxImageCount }) {
  useEffect(() => {
    if (imageUrls.length > maxImageCount) {
      setImageUrls((prevUrls) => prevUrls.slice(0, maxImageCount));
    }
    console.log(imageUrls.length);
  }, [imageUrls]);

  const onchangeImageUpload = async (e) => {
    const newFiles = Array.from(e.target.files);
    const totalFiles = newFiles.length + imageUrls.length;

    const urls = [];
    for (const file of newFiles) {
      const downloadUrl = await useUploadImage(file);
      if (downloadUrl !== 'undefined') {
        urls.push(downloadUrl);
      }
    }
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
  };

  async function useUploadImage(file) {
    const imgId = v4();
    const storagePath = `test/${imgId}`;
    const storageRef = ref(storage, storagePath);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl; // 실제 다운로드 URL 반환
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  const handleRemoveImage = (index) => {
    setImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  console.log(imageUrls);
  return (
    <>
      <div>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
            <img src={url} alt="Uploaded" style={{ width: '100px', height: '100px' }} />
            <IconButton
              style={{ position: 'absolute', top: '0', right: '0' }}
              onClick={() => handleRemoveImage(index)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
      {imageUrls.length >= maxImageCount ? (
        <Button variant="contained" disabled>
          사진 업로드
        </Button>
      ) : (
        <div>
          <input
            style={{ display: 'none' }}
            accept="image/*"
            multiple
            id="upload-button-file"
            type="file"
            onChange={onchangeImageUpload}
          />
          <label htmlFor="upload-button-file">
            <Button variant="contained" component="span">
              사진 업로드
            </Button>
          </label>
        </div>
      )}
    </>
  );
}
