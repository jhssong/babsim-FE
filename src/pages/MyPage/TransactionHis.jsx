import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { AppBarWithTitle } from '../../components/AppBar';
import { getTransaction } from '../../apis/user/getTransaction';
import Loading from '../../components/Loading';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../recoil/atoms';
import { Box, Typography } from '@mui/material';

const Container = styled.div`
  display: flex;
  padding: 1rem 0rem;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: calc(100vh - 3rem);
  overflow-y: auto;
`;

const TransactionHis = ({ setTransaction }) => {
  const userData = useRecoilValue(userDataState);
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async (memberId) => {
      try {
        const data = await getTransaction(memberId);
        setLogData(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    console.log(userData);
    fetchTransaction(userData.id);
  }, []);

  // const logData = [
  //   {
  //     id: 1,
  //     pointContent: '신규회원',
  //     pointPrice: 1000,
  //     pointType: 'REWARD',
  //     transactionDate: '2024-08-02T22:31:41.232339',
  //   },
  //   {
  //     id: 2,
  //     pointContent: '구매',
  //     pointPrice: 500,
  //     pointType: 'REWARD',
  //     transactionDate: '2024-08-02T15:20:41.232339',
  //   },
  //   {
  //     id: 3,
  //     pointContent: '리뷰',
  //     pointPrice: 300,
  //     pointType: 'REWARD',
  //     transactionDate: '2024-08-03T12:00:00.000000',
  //   },
  //   {
  //     id: 4,
  //     pointContent: '환불',
  //     pointPrice: 200,
  //     pointType: 'REFUND',
  //     transactionDate: '2024-08-04T10:30:00.000000',
  //   },

  //   {
  //     id: 5,
  //     pointContent: '판매',
  //     pointPrice: 800,
  //     pointType: 'SELL',
  //     transactionDate: '2024-08-05T14:50:00.23424',
  //   },
  //   {
  //     id: 6,
  //     pointContent: '쿠폰 사용',
  //     pointPrice: 150,
  //     pointType: 'DISCOUNT',
  //     transactionDate: '2024-08-09T09:15:00.000000',
  //   },
  //   {
  //     id: 7,
  //     pointContent: '이벤트 참여',
  //     pointPrice: 700,
  //     pointType: 'REWARD',
  //     transactionDate: '2024-08-06T09:15:00.123412',
  //   },
  //   {
  //     id: 8,
  //     pointContent: '구매',
  //     pointPrice: 1200,
  //     pointType: 'REWARD',
  //     transactionDate: '2024-08-08T18:20:00.000000',
  //   },
  //   {
  //     id: 8,
  //     pointContent: '구매',
  //     pointPrice: 1200,
  //     pointType: 'REWARD',
  //     transactionDate: '2024-08-08T18:20:00.000000',
  //   },
  //   {
  //     id: 8,
  //     pointContent: '구매',
  //     pointPrice: 1200,
  //     pointType: 'REWARD',
  //     transactionDate: '2024-08-08T18:20:00.000000',
  //   },
  //   {
  //     id: 8,
  //     pointContent: '구매',
  //     pointPrice: 1200,
  //     pointType: 'REWARD',
  //     transactionDate: '2024-08-08T18:20:00.000000',
  //   },
  // ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${month}월 ${day}일`;
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <>
      <AppBarWithTitle title="거래내역" onBackBtnClick={() => setTransaction(false)} />
      <Container>
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}>
          <Box
            sx={{
              width: '100%',
              padding: '1rem',
            }}>
            <Typography variant="h6" sx={{ color: 'primary.light' }}>
              잔고
            </Typography>
            <Typography variant="h4">{userData.point.toLocaleString()} tc</Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '1rem',
              backgroundColor: 'seperator.light',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '1rem',
              gap: '1rem',
            }}>
            {logData.map((log, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  width: '100%',
                  gap: '0.5rem',
                }}>
                {index === 0 ||
                formatDate(log.transactionDate) !==
                  formatDate(logData[index - 1].transactionDate) ? (
                  <Typography variant="body2" sx={{ color: 'transaction.date' }}>
                    {formatDate(log.transactionDate)}
                  </Typography>
                ) : (
                  <></>
                )}
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Typography variant="h6">{log.pointContent}</Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color:
                          log.pointType === 'REWARD' || log.pointType === 'SELL'
                            ? 'transaction.plus'
                            : 'transaction.minus',
                      }}>
                      {log.pointType === 'REWARD' || log.pointType === 'SELL' ? '+' : '-'}
                      {log.pointPrice.toLocaleString()} tc
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: 'primary.light' }}>
                    {log.pointType}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default TransactionHis;
