import { VCard } from '../../components/Card';
import { RollCardList } from '../../components/CardList';

const RecommendedProduct = () => {
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
    <RollCardList title="추천 상품">
      {productData.list.map((product, index) => (
        <VCard
          key={product.id}
          type="product"
          product={product}
          index={index}
          style={{
            marginRight: index === productData.list.length - 1 ? '1rem' : '0',
          }}
        />
      ))}
    </RollCardList>
  );
};

export default RecommendedProduct;
