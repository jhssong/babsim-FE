import { useState } from 'react';
import {
  Fab,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { RemoveShoppingCart, ShoppingBag, Add } from '@mui/icons-material';
import postNftCreate from '../../../apis/NFT/postNftCreate';

const NftButton = ({ recipeInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(recipeInfo.nftCreateStatus); // NFT 생성 여부
  const [isOnSale, setIsOnSale] = useState(recipeInfo.nftSaleStatus); // NFT 판매 여부
  const [open, setOpen] = useState(false); // 모달 열림 상태
  const [price, setPrice] = useState(''); // 가격 입력 상태

  // NFT 생성 요청
  const createNft = async () => {
    setIsLoading(true);
    try {
      const response = await postNftCreate({ recipeId: recipeInfo.id, price: price });
      console.log(response);
      setIsCreated(true);
      setIsOnSale(true);
    } catch (error) {
      console.error('NFT 생성 실패:', error);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (!isCreated) {
      // NFT 생성 요청
      createNft();
    } else {
      // NFT 판매/판매 중단
      setIsOnSale(!isOnSale);
      handleClose();
    }
  };

  const Icon = !isCreated ? Add : isOnSale ? RemoveShoppingCart : ShoppingBag;
  const buttonText = !isCreated ? 'NFT 생성하기' : isOnSale ? '판매 중단하기' : 'NFT 판매하기';
  const modalTitle = !isCreated ? 'NFT 생성 확인' : isOnSale ? '판매 중단 확인' : 'NFT 판매 확인';
  const modalMessage = !isCreated
    ? 'NFT를 생성하시겠습니까?'
    : isOnSale
      ? '정말로 NFT 판매를 중단하시겠습니까?'
      : 'NFT를 판매하시겠습니까? 가격을 설정하세요.';

  return (
    <>
      <Fab
        color="primary"
        size="medium"
        variant="extended"
        aria-label="nft-action"
        onClick={handleClickOpen}
        sx={{ width: '10rem' }}>
        <Icon />
        <Typography variant="body1" sx={{ ml: '0.5rem' }}>
          {buttonText}
        </Typography>
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {modalMessage}
          </Typography>
          {!isCreated || !isOnSale ? (
            <TextField
              autoFocus
              margin="dense"
              label="가격 설정"
              type="number"
              fullWidth
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            color="primary"
            disabled={(!isCreated && !price) || isLoading}>
            {isLoading ? '생성 중...' : '확인'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NftButton;
