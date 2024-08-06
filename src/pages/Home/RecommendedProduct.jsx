import { useEffect, useState } from 'react';
import { VCard } from '../../components/Card';
import { RollCardList } from '../../components/CardList';
import { getProductRecommend } from '../../apis/Market/getProduct';
import Loading from '../../components/Loading';
import ComingSoonModal from '../../components/ComingSoonModal';

const RecommendedProduct = () => {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1500); // 2000 milliseconds = 2 seconds
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchRecommendedProduct = async () => {
      try {
        const data = await getProductRecommend();
        setProductData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRecommendedProduct();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <ComingSoonModal open={open} onClose={handleClose} />
      <RollCardList title="추천 상품">
        {productData.map((product, index) => (
          <VCard
            key={product.id}
            type="product"
            product={product}
            index={index}
            onClick={handleOpen}
            style={{
              marginRight: index === productData.length - 1 ? '1rem' : '0',
            }}
          />
        ))}
      </RollCardList>
    </>
  );
};

export default RecommendedProduct;
