import styled from '@emotion/styled';

import { AppBarWithTitle } from '../../components/AppBar';
import { Rating } from '@mui/material';
import { Box, Button, Typography } from '@mui/material';
import Slider from 'react-slick';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100vh - 7rem);
`;

const Product = () => {
  const data = {
    id: '상품 ID',
    img: [
      'https://cdn.hankyung.com/photo/202401/BF.35541769.1.jpg',
      'https://upload.wikimedia.org/wikipedia/ko/thumb/b/b3/이세계아이돌_LockDown_인터뷰.png/250px-이세계아이돌_LockDown_인터뷰.png',
      'https://newsimg-hams.hankookilbo.com/2022/04/25/8cc97778-819b-422d-8370-1e69fb197c12.jpg',
    ],
    name: '상품 이름',
    desc: '상품 상세 정보',
    price: '상품 가격',
    rate: 3.5,
    stock: '상품 재고',
    sellerID: '판매자 ID',
    sellerName: '판매자 이름',
  };

  return (
    <>
      <AppBarWithTitle rightIcon="share" />

      <Container>
        <Banner images={data.img} />
        <Info data={data} />
      </Container>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          padding: '1rem',
          gap: '1rem',
        }}>
        <Button
          variant="outlined"
          sx={{
            width: '50%',
            height: '100%',
          }}>
          <Typography variant="body1">장바구니 담기</Typography>
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'primary.light',
            width: '100%',
            height: '100%',
          }}>
          <Typography variant="body1">구매하기</Typography>
        </Button>
      </Box>
    </>
  );
};

const BannerContainer = styled.div`
  width: 100%;
  margin: 0 auto; /* 중앙 정렬 */
`;

const BannerImageWrapper = styled.img`
  width: 100%; /* 이미지가 컨테이너를 꽉 채우도록 */
  height: 300px; /* 원하는 높이 설정 */
  object-fit: cover; /* 이미지가 컨테이너를 채우도록 */
  display: block; /* 블록 레벨 요소로 표시 */
`;

const Banner = ({ images }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <BannerContainer>
      <Slider {...settings}>
        {images.map((img, index) => (
          <BannerImageWrapper key={index} src={img} />
        ))}
      </Slider>
    </BannerContainer>
  );
};

const Info = ({ data }) => {
  const CustomRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#f57c00', // 채워진 별 색상
    },
    '& .MuiRating-iconEmpty': {
      color: '#000000', // 빈 별 색상
    },
    '& .MuiRating-iconHover': {
      color: '#ffb74d', // 호버 시 별 색상 (선택 사항)
    },
    fontSize: '0.75rem', // caption 크기로 설정
  });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '1rem',
      }}>
      <Box
        sx={{
          width: '100%',
          padding: '1rem',
          border: '1px solid',
          borderRadius: '0.25rem',
          borderColor: 'primary.main',
        }}>
        <Box
          sx={{
            borderRadius: '0.25rem',
            borderColor: 'primary.main',
          }}>
          <Box>
            <Typography variant="body1">
              {data.sellerName}
              <CustomRating
                name="custom-rating"
                value={data.rate}
                precision={0.5} // 별점을 0.5 단위로 설정
                sx={{}}
              />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
