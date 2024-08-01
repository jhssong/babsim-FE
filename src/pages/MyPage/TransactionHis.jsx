import { AppBarWithTitle } from '../../components/AppBar';

const TransactionHis = ({ setTransaction }) => {
  return (
    <>
      <AppBarWithTitle title="거래내역" onBackBtnClick={() => setTransaction(false)} />
    </>
  );
};

export default TransactionHis;
