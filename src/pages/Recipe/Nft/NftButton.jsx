import { useEffect, useState } from 'react';
import {
  Fab,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { RemoveShoppingCart, ShoppingBag, Add } from '@mui/icons-material';
import postNftCreate from '../../../apis/NFT/postNftCreate';
import postNftSaleRegister from '../../../apis/NFT/postNftSaleRegister';
import deleteNft from '../../../apis/NFT/deleteNft';
import postNftPurchase from '../../../apis/NFT/postNftPurchase';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../../recoil/atoms';
import getRecipeInfo from '../../../apis/Recipe/RecipeInfo/getRecipeInfo';

const NftButton = ({ recipeInfo }) => {
  const userData = useRecoilValue(userDataState);

  if (!userData) {
    return null;
  }

  const [recipe, setRecipe] = useState(recipeInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(recipe.nftCreateStatus); // NFT 생성 여부
  const [isOnSale, setIsOnSale] = useState(recipe.nftSaleStatus); // NFT 판매 여부
  const [open, setOpen] = useState(false); // 모달 열림 상태
  const [price, setPrice] = useState(''); // 가격 입력 상태
  const [isBtnHidden, setIsBtnHidden] = useState(false); // 버튼 숨김 여부
  const [buttonState, setButtonState] = useState({
    Icon: null,
    buttonText: '',
    modalTitle: '',
    modalMessage: '',
  });
  const [handleConfirm, setHandleConfirm] = useState(() => () => {}); // 버튼 클릭 핸들러

  const fetchRecipeInfo = async (userId) => {
    const json = await getRecipeInfo({ recipeId: recipe.id, memberId: userId });
    setRecipe(json);
    setIsCreated(json.nftCreateStatus);
    setIsOnSale(json.nftSaleStatus);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchRecipeInfo(userData.id);
  }, [open]);

  // NFT 생성 요청
  const createNft = async () => {
    setIsLoading(true);
    try {
      const response = await postNftCreate({
        recipeId: recipe.id,
        memberId: userData.id,
        price: price,
      });
      console.log(response);
      setIsCreated(true);
    } catch (error) {
      console.error('NFT 생성 실패:', error);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  // NFT 판매 요청
  const sellNft = async () => {
    setIsLoading(true);
    try {
      console.log(price);
      const response = await postNftSaleRegister({ recipeId: recipe.id, price: price });
      console.log(response);
    } catch (error) {
      console.error('NFT 판매 실패:', error);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  // NFT 판매 중단 요청
  const stopSellNft = async () => {
    setIsLoading(true);
    try {
      const response = await deleteNft({ recipeId: recipe.id });
      console.log(response);
    } catch (error) {
      console.error('NFT 판매 중단 실패:', error);
    } finally {
      setIsLoading(false);
      handleClose();
    }
  };

  // NFT 구매 요청
  const purchaseNft = async () => {
    setIsLoading(true);
    try {
      const response = await postNftPurchase({ recipeId: recipe.id, memberId: userData.id });
      console.log(response);
    } catch (error) {
      console.error('NFT 구매 실패:', error);
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

  useEffect(() => {
    if (!isCreated) {
      if (recipe.creatorId !== userData.id) {
        setIsBtnHidden(true);
      } else {
        setButtonState({
          Icon: Add,
          buttonText: 'NFT 생성하기',
          modalTitle: 'NFT 생성 확인',
          modalMessage: 'NFT를 생성하시겠습니까?',
        });
        setHandleConfirm(() => createNft);
      }
    } else if (isOnSale) {
      if (recipe.nftOwnerId !== userData.id) {
        setButtonState({
          Icon: ShoppingBag,
          buttonText: 'NFT 구매하기',
          modalTitle: 'NFT 구매 확인',
          modalMessage: 'NFT를 구매하시겠습니까?',
        });
        setHandleConfirm(() => purchaseNft);
      } else {
        setButtonState({
          Icon: RemoveShoppingCart,
          buttonText: '판매 중단하기',
          modalTitle: '판매 중단 확인',
          modalMessage: '정말로 NFT 판매를 중단하시겠습니까?',
        });
        setHandleConfirm(() => stopSellNft);
      }
    } else {
      if (recipe.creatorId !== userData.id) {
        setIsBtnHidden(true);
      } else {
        setButtonState({
          Icon: ShoppingBag,
          buttonText: 'NFT 판매하기',
          modalTitle: 'NFT 판매 확인',
          modalMessage: 'NFT를 판매하시겠습니까? 가격을 설정하세요!',
        });
        setHandleConfirm(() => () => sellNft(price));
      }
    }
  }, [isCreated, isOnSale, userData, price, recipe.nftCreateStatus, recipe.nftSaleStatus]);

  if (isLoading) {
    return (
      <Backdrop open={true} sx={{ color: '#fff', zIndex: 10000 }}>
        <CircularProgress variantcolor="primary" />
      </Backdrop>
    );
  }

  if (isBtnHidden) {
    return null;
  }

  return (
    <>
      <Fab
        color="primary"
        size="medium"
        variant="extended"
        aria-label="nft-action"
        onClick={handleClickOpen}
        sx={{ width: '10rem' }}>
        {buttonState.Icon && <buttonState.Icon />}
        <Typography variant="body1" sx={{ ml: '0.5rem' }}>
          {buttonState.buttonText}
        </Typography>
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{buttonState.modalTitle}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {buttonState.modalMessage}
          </Typography>
          {isCreated && !isOnSale && (
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
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            취소
          </Button>
          <Button onClick={handleConfirm} color="primary" disabled={isLoading}>
            {isLoading ? '생성 중...' : '확인'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NftButton;
