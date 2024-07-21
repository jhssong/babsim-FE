import styled from '@emotion/styled';

import { AppBarWithLogo } from '../../components/AppBar';
import NavBar from '../../components/NavBar';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RollCardList } from '../../components/CardList';
import { VCard } from '../../components/Card';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;
  height: calc(100vh - 7rem);
`;

const Market = () => {
  const bannerImages = [
    { url: '/assets/banners/chip.webp', alt: '감자칩 요리 공모전' },
    { url: '/assets/banners/gyoza.webp', alt: '왕교자 요리 공보전' },
  ];
  const nftDates = {
    list: [
      {
        id: 'NFT001',
        img: 'https://example.com/nft001.jpg',
        recipeID: 'recipe001',
        name: 'Delicious Spaghetti NFT',
        price: '10.00 ETH',
      },
      {
        id: 'NFT002',
        img: 'https://example.com/nft002.jpg',
        recipeID: 'recipe002',
        name: 'Tasty Burger NFT',
        price: '12.50 ETH',
      },
      {
        id: 'NFT003',
        img: 'https://example.com/nft003.jpg',
        recipeID: 'recipe003',
        name: 'Yummy Sushi NFT',
        price: '15.00 ETH',
      },
      {
        id: 'NFT004',
        img: 'https://example.com/nft004.jpg',
        recipeID: 'recipe004',
        name: 'Hearty Salad NFT',
        price: '8.75 ETH',
      },
      {
        id: 'NFT005',
        img: 'https://example.com/nft005.jpg',
        recipeID: 'recipe005',
        name: 'Sweet Dessert NFT',
        price: '11.25 ETH',
      },
    ],
  };

  return (
    <>
      <AppBarWithLogo />
      <Container>
        <Banner images={bannerImages} />
        <RollCardList title="NFT 상품">
          {nftDates.list.map((nft, index) => (
            <VCard
              key={nft.id}
              type="nft"
              product={nft}
              index={index}
              style={{
                marginRight: index === nftDates.list.length - 1 ? '1rem' : '0',
              }}
            />
          ))}
        </RollCardList>
      </Container>

      <NavBar page="market" />
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
    autoplay: true,
    autoplaySpeed: 3000, // 3초마다 자동 전환
  };

  return (
    <BannerContainer>
      <Slider {...settings}>
        {images.map((image, index) => (
          <BannerImageWrapper key={index} src={image.url} alt={image.alt} />
        ))}
      </Slider>
    </BannerContainer>
  );
};

export default Market;
