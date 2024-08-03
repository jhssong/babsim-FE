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
import Loading from '../../components/Loading';
import ComingSoonModal from '../../components/ComingSoonModal';
import { useNavigate } from 'react-router-dom';

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

  const [open, setOpen] = useState(false);
  let navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1500); // 2000 milliseconds = 2 seconds
  };

  const handleClose = () => setOpen(false);

  const [productData, setProductData] = useState({});
  // const [nftDatas, setNftDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // const fetchNfts = async () => {
    //   try {
    //     const data = await getNfts();
    //     setNftDatas(data);
    //     setLoading(false);
    //   } catch (error) {
    //     setError(error);
    //     setLoading(false);
    //   }
    // };

    const fetchProducts = async () => {
      try {
        const data = await getProductHot();
        setProductData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
    // fetchNfts();
  }, []);
  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const nftDatas = {
    list: [
      {
        nftId: 1,
        uri: 'f4308714-b5d4-49f2-a575-e72212621b3b',
        recipeId: 6,
        recipeName: '누구나 맛있게 만들수 있는 김치볶음밥',
        price: 1000.0,
      },
      {
        nftId: 2,
        uri: 'e7821fd7-c710-4386-84a5-c19e7dd675a9',
        recipeId: 7,
        recipeName: '비엔나 만두 강정',
        price: 1000.0,
      },
    ],
  };
  return (
    <>
      <ComingSoonModal open={open} onClose={handleClose} />

      <AppBarWithLogo />
      <Container>
        <Banner images={bannerImages} />
        <RollCardList title="NFT 상품">
          {nftDatas.list.map((nft, index) => (
            <VCard
              key={nft.id}
              type="nft"
              product={nft}
              index={index}
              style={{
                marginRight: index === nftDatas.length - 1 ? '1rem' : '0',
              }}
              onClick={() => navigate(`/recipe/${nft.recipeId}`)}
            />
          ))}
        </RollCardList>
        <GridCardList title="핫한 상품">
          {productData.map((product, index) => (
            <VCard
              key={product.id}
              type="product"
              product={product}
              index={index}
              onClick={handleOpen}
            />
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
