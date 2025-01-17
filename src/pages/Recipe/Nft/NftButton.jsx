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
import getNftPrice from '../../../apis/NFT/getNftPrice';
import { useNavigate } from 'react-router-dom';

const NftButton = ({ recipeInfo }) => {
  const userData = useRecoilValue(userDataState);
  const userId = userData ? userData.id : null;

  const [recipe, setRecipe] = useState(recipeInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(recipe.nftCreateStatus); // NFT 생성 여부
  const [isOnSale, setIsOnSale] = useState(recipe.nftSaleStatus); // NFT 판매 여부
  const [open, setOpen] = useState(false); // 모달 열림 상태
  const [price, setPrice] = useState(1); // 가격 입력 상태
  const [isBtnHidden, setIsBtnHidden] = useState(false); // 버튼 숨김 여부
  const [buttonState, setButtonState] = useState({
    Icon: null,
    buttonText: '',
    modalTitle: '',
    modalMessage: '',
  });
  const [handleConfirm, setHandleConfirm] = useState(() => () => {}); // 버튼 클릭 핸들러

  const [nftPrice, setNftPrice] = useState(0); // NFT 가격
  const [point, setPoint] = useState(0);
  const [available, setAvailable] = useState(false);

  const navigate = useNavigate();

  const fetchRecipeInfo = async (userId) => {
    const json = await getRecipeInfo({ recipeId: recipe.id, memberId: userId });
    setRecipe(json);
    setIsCreated(json.nftCreateStatus);
    setIsOnSale(json.nftSaleStatus);
  };

  const fetchNftPrice = async () => {
    try {
      const json = await getNftPrice({ recipeId: recipe.id, memberId: userId });
      console.log(json);
      setNftPrice(json.nftPrice);
      setPoint(json.point);
      setAvailable(json.available);
    } catch (error) {
      console.error('NFT 가격 정보를 가져오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    if (isCreated && userData) {
      setIsLoading(true);
      fetchRecipeInfo(userId);
      fetchNftPrice();
      setIsLoading(false);
    }
  }, []);

  // NFT 생성 요청
  const createNft = async () => {
    setIsLoading(true);
    try {
      const response = await postNftCreate({
        recipeId: recipe.id,
        memberId: userId,
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
      const response = await postNftPurchase({ recipeId: recipe.id, memberId: userId });
      console.log(response);
    } catch (error) {
      console.error('NFT 구매 실패:', error);
      console.log(error);
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
      if (recipe.creatorId !== userId) {
        setIsBtnHidden(true);
      } else {
        setButtonState({
          Icon: Add,
          buttonText: 'NFT 생성하기',
          modalTitle: 'NFT 생성 확인',
          modalMessage: '정말로 NFT를 생성하시겠어요?',
        });
        setHandleConfirm(() => createNft);
      }
    } else if (isOnSale) {
      if (recipe.nftOwnerId === userId) {
        setButtonState({
          Icon: RemoveShoppingCart,
          buttonText: '판매 중단하기',
          modalTitle: '판매 중단 확인',
          modalMessage: '정말로 NFT 판매를 중단하시겠어요?',
        });
        setHandleConfirm(() => stopSellNft);
      } else {
        setButtonState({
          Icon: ShoppingBag,
          buttonText: 'NFT 구매하기',
          modalTitle: 'NFT 구매 확인',
          modalMessage: `이 요리법 NFT 가격은 ${nftPrice}TC예요. 현재 가지고 있는 포인트는 ${point}TC예요. 구매하시겠어요?`,
        });
        console.log('NFT 구매하기');
        if (available === true) setHandleConfirm(() => purchaseNft);
        else setHandleConfirm(() => {});
      }
    } else {
      if (recipe.nftOwnerId !== userId) {
        setIsBtnHidden(true);
      } else {
        setButtonState({
          Icon: ShoppingBag,
          buttonText: 'NFT 판매하기',
          modalTitle: 'NFT 판매 확인',
          modalMessage: 'NFT를 판매할 가격을 알려주세요.',
        });
        console.log('NFT 판매하기');
        setHandleConfirm(() => () => sellNft(price));
      }
    }
  }, [
    isCreated,
    isOnSale,
    userData,
    price,
    recipe.nftCreateStatus,
    recipe.nftSaleStatus,
    nftPrice,
    point,
    available,
  ]);

  const handlePriceChange = (e) => {
    let value = e.target.value;
    value = Math.max(1, Math.min(value, 1000000)); // 가격 제한

    setPrice(value);
  };

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
        onClick={userId === null ? () => navigate('/login') : handleClickOpen}
        sx={{ width: '11rem' }}>
        {buttonState.Icon && <buttonState.Icon />}
        <Typography variant="body1" sx={{ ml: '0.5rem', mt: '0.25rem' }}>
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
              onChange={handlePriceChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isLoading}>
            취소
          </Button>
          <Button onClick={handleConfirm} color="primary" disabled={isLoading || !available}>
            {isLoading ? '생성 중...' : '확인'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NftButton;
