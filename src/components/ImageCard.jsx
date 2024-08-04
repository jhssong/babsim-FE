import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../apis/firebase/firebase';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { getImageFromStorage } from '../apis/firebase/storage';

export default function ImageCard({ mode, initialImageIds, maxImageCount, onCancel, onDone }) {
  const [localImageUrls, setLocalImageUrls] = useState([]);
  const [localImageIds, setLocalImageIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        // Firebase에서 이미지 URL을 가져옵니다.
        const imageUrls = await Promise.all(
          initialImageIds.map(async (imgId) => {
            return await getImageFromStorage(imgId);
          })
        );
        setLocalImageUrls(imageUrls);
        setLocalImageIds(initialImageIds);
        console.log('Image URLs loaded:', imageUrls);
        console.log('Image IDs loaded:', initialImageIds);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, [initialImageIds]); // `initialImageIds`가 변경될 때마다 호출

  useEffect(() => {
    if (localImageUrls.length > maxImageCount) {
      setLocalImageUrls((prevUrls) => prevUrls.slice(0, maxImageCount));
      setLocalImageIds((prevIds) => prevIds.slice(0, maxImageCount));
    }
  }, [localImageUrls, maxImageCount]);

  const onchangeImageUpload = async (e) => {
    const newFiles = Array.from(e.target.files);
    const urls = [];
    const ids = [];
    for (const file of newFiles) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { downloadUrl, id } = await useUploadImage(file);
      if (downloadUrl !== 'undefined') {
        urls.push(downloadUrl);
        ids.push(id);
      }
    }
    setLocalImageUrls((prevUrls) => [...prevUrls, ...urls]);
    setLocalImageIds((prevIds) => [...prevIds, ...ids]);
  };

  async function useUploadImage(file) {
    const imgId = v4();
    const storagePath = `${imgId}.jpg`; // 경로 수정
    const storageRef = ref(storage, storagePath);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return { downloadUrl, id: imgId }; // 실제 다운로드 URL과 이미지 ID 반환
    } catch (error) {
      console.error('Error uploading image:', error);
      return { downloadUrl: '', id: imgId };
    }
  }

  const handleRemoveImage = (index) => {
    setLocalImageUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
    setLocalImageIds((prevIds) => prevIds.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 상태
  }

  return (
    <>
      <div>
        {localImageUrls.map((url, index) => (
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
      {localImageUrls.length >= maxImageCount ? (
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
      {mode === 'cookery' ? (
        <Button onClick={() => onDone(localImageUrls, localImageIds)}>적용</Button>
      ) : (
        <>
          <Button onClick={onCancel} color="primary">
            취소
          </Button>
          <Button onClick={() => onDone(localImageUrls, localImageIds)} color="primary">
            확인
          </Button>
        </>
      )}
    </>
  );
}
