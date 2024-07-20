import styled from '@emotion/styled';

import { AppBarWithLogo } from '../../components/AppBar';
import NavBar from '../../components/NavBar';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  const images = [
    { url: '/assets/banners/chip.webp', alt: '감자칩 요리 공모전' },
    { url: '/assets/banners/gyoza.webp', alt: '왕교자 요리 공보전' },
  ];

  return (
    <>
      <AppBarWithLogo />
      <Container>
        <Banner images={images} />
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
