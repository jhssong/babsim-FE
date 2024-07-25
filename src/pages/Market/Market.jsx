import styled from '@emotion/styled';

import { AppBarWithLogo } from '../../components/AppBar';
import NavBar from '../../components/NavBar';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GridCardList, RollCardList } from '../../components/CardList';
import { VCard } from '../../components/Card';
import { useEffect, useState } from 'react';
import getNfts from '../../apis/Market/getNfts';
import { getProductHot } from '../../apis/Market/getProduct';
import { avatarClasses } from '@mui/material';
import Loading from '../../components/Loading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  flex: 1 0 0;
  align-self: stretch;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 7rem);
`;

const Market = () => {
  const bannerImages = [
    { url: '/assets/banners/chip.webp', alt: '감자칩 요리 공모전' },
    { url: '/assets/banners/gyoza.webp', alt: '왕교자 요리 공보전' },
  ];

  // const [productData, setProductData] = useState({});
  // const [nftDatas, setNftDatas] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchNfts = async () => {
  //     try {
  //       const data = await getNfts();
  //       setNftDatas(data);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  //   const fetchProducts = async () => {
  //     try {
  //       const data = await getProductHot();
  //       setNftDatas(data);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  //   const fetchAll = async () => {
  //     try {
  //       await fetchNfts();
  //       await fetchProducts();
  //       setLoading(false); // setLoading은 비동기 작업이 아니므로 await가 필요 없습니다.
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //       setLoading(false); // 에러가 발생해도 로딩 상태를 false로 설정
  //     }
  //   };

  //   fetchAll();
  // }, []);
  // if (loading) return <Loading />;
  // if (error) return <div>Error: {error.message}</div>;

  const nftDates = {
    list: [
      {
        id: 'NFT001',
        img: 'https://img.khan.co.kr/news/2023/05/12/news-p.v1.20230512.e5fffd99806f4dcabd8426d52788f51a_P1.png',
        recipeID: 'recipe001',
        name: 'Delicious Spaghetti NFT',
        price: '10.00 ETH',
      },
      {
        id: 'NFT002',
        img: 'https://img.khan.co.kr/news/2023/05/12/news-p.v1.20230512.e5fffd99806f4dcabd8426d52788f51a_P1.png',
        recipeID: 'recipe002',
        name: 'Tasty Burger NFT',
        price: '12.50 ETH',
      },
      {
        id: 'NFT003',
        img: 'https://img.khan.co.kr/news/2023/05/12/news-p.v1.20230512.e5fffd99806f4dcabd8426d52788f51a_P1.png',
        recipeID: 'recipe003',
        name: 'Yummy Sushi NFT',
        price: '15.00 ETH',
      },
      {
        id: 'NFT004',
        img: 'https://img.khan.co.kr/news/2023/05/12/news-p.v1.20230512.e5fffd99806f4dcabd8426d52788f51a_P1.png',
        recipeID: 'recipe004',
        name: 'Hearty Salad NFT',
        price: '8.75 ETH',
      },
      {
        id: 'NFT005',
        img: 'https://img.khan.co.kr/news/2023/05/12/news-p.v1.20230512.e5fffd99806f4dcabd8426d52788f51a_P1.png',
        recipeID: 'recipe005',
        name: 'Sweet Dessert NFT',
        price: '11.25 ETH',
      },
    ],
  };

  const productData = {
    list: [
      {
        id: '1',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: '시부야 초록 라멘',
        price: '4,300원',
        rate: 3.5,
      },
      {
        id: '2',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: '도쿄 소유 라멘',
        price: '5,200원',
        rate: 4.2,
      },
      {
        id: '3',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: '오사카 돈코츠 라멘',
        price: '5,800원',
        rate: 4.7,
      },
      {
        id: '4',
        img: 'https://img.japankuru.com/prg_img/thumbnail1/img2023101812515081589300.jpg',
        name: '나고야 미소 라멘',
        price: '4,800원',
        rate: 4.0,
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
        <GridCardList title="핫한 상품">
          {productData.list.map((product, index) => (
            <VCard key={product.id} type="product" product={product} index={index} />
          ))}
        </GridCardList>
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
