import { AppBarWithLogo } from '../../components/AppBar';
import NavBar from '../../components/NavBar';

const Home = () => {
  return (
    <>
      <AppBarWithLogo />
      <NavBar page="home" />
    </>
  );
};

export default Home;
