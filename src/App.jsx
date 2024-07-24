import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState, isTryingToLoginState, userDataState } from './recoil/atoms';

import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Market from './pages/Market/Market';
import Recipe from './pages/Recipe/Recipe';
import MyPage from './pages/MyPage/MyPage';
import Scrap from './pages/Scrap/Scrap';
import Search from './pages/Search/Search';
import RecipeInfo from './pages/Recipe/RecipeInfo';
import Cart from './pages/Market/Cart';
import Product from './pages/Market/Product';
import NotFound from './pages/Error/NotFound';
import RecipeEdit from './pages/Recipe/RecipeEdit';
import UserInfoSetting from './pages/Login/UserInfoSetting';
import UserAllergySetting from './pages/Login/UserAllergySetting';
import { useEffect } from 'react';
import { auth, onAuthStateChanged } from './utils/firebase/firebase';
import getMember from './apis/Login/getMember';
import { getLoggedInPlatform } from './utils/firebase/localStorage';

const ProtectedRoute = ({ path }) => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  return isLoggedIn ? path : <Navigate to="/login" />;
};

const ProtectedRouteForLogin = ({ path }) => {
  const isTryingToLogin = useRecoilValue(isTryingToLoginState);
  const isLoggedIn = useRecoilValue(isLoggedInState);

  if (isTryingToLogin) return path;
  else if (isLoggedIn) return <Navigate to="/" />;
  else return <Navigate to="/login" />;
};

function App() {
  const navigate = useNavigate();
  const setUserData = useSetRecoilState(userDataState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const isTryingToLogin = useRecoilValue(isTryingToLoginState);

  async function checkLogin() {
    // Check google login session
    onAuthStateChanged(auth, async (currentUser) => {
      if (getLoggedInPlatform() == 'google' && isTryingToLogin == false) {
        try {
          console.log(' 설마?');
          const userData = await getMember('google&' + currentUser.uid);
          setUserData(userData);
          setIsLoggedIn(true);
          navigate('/');
        } catch (error) {
          console.error(error);
          navigate('/login');
        }
      }
    });
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/login/infoSetting"
            element={<ProtectedRouteForLogin path={<UserInfoSetting />} />}
          />
          <Route
            path="/login/allergySetting"
            element={<ProtectedRouteForLogin path={<UserAllergySetting />} />}
          />
          <Route path="/market" element={<Market />} />
          <Route path="/cart" element={<ProtectedRoute path={<Cart />} />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/recipe/:recipeId" element={<RecipeInfo />} />
          <Route path="/recipe/edit/:recipeId" element={<ProtectedRoute path={<RecipeEdit />} />} />
          <Route path="/mypage" element={<ProtectedRoute path={<MyPage />} />} />
          <Route path="/scrap" element={<ProtectedRoute path={<Scrap />} />} />
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
