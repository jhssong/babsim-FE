import getMember from './apis/Login/getMember';
import { getLoggedInPlatform, getLoginToken } from './apis/Login/localStorage';
import { Suspense, lazy, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState, isTryingToLoginState, userDataState } from './recoil/atoms';

import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';
import Loading from './components/Loading'; // 가정한 경로
import Home from './pages/Home/Home';

// Lazy loading components
const Login = lazy(() => import('./pages/Login/Login'));
const Market = lazy(() => import('./pages/Market/Market'));
const Recipe = lazy(() => import('./pages/Recipe/Recipe'));
const MyPage = lazy(() => import('./pages/MyPage/MyPage'));
const Scrap = lazy(() => import('./pages/Scrap/Scrap'));
const Search = lazy(() => import('./pages/Search/Search'));
const RecipeInfo = lazy(() => import('./pages/Recipe/RecipeInfo'));
const Cart = lazy(() => import('./pages/Market/Cart'));
const NotFound = lazy(() => import('./pages/Error/NotFound'));
const RecipeEdit = lazy(() => import('./pages/Recipe/RecipeEdit'));
const UserInfoSetting = lazy(() => import('./pages/Login/UserInfoSetting'));
const UserAllergySetting = lazy(() => import('./pages/Login/UserAllergySetting'));

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
    if (getLoggedInPlatform() == 'google' && isTryingToLogin == false) {
      try {
        console.log('Trying to find google user data');
        const userData = await getMember(getLoginToken());
        setUserData(userData);
        setIsLoggedIn(true);
        navigate('/');
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    }
    if (getLoggedInPlatform() == 'kakao' && isTryingToLogin == false) {
      try {
        console.log('Trying to find kakao user data');
        const userData = await getMember(getLoginToken());
        setUserData(userData);
        setIsLoggedIn(true);
        navigate('/');
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    }
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loading />}>
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
            <Route path="/recipe" element={<Recipe />} />
            <Route path="/recipe/:recipeId" element={<RecipeInfo />} />
            <Route path="/recipe/edit/:recipeId" element={<RecipeEdit mode="edit" />} />
            <Route path="/recipe/fork/:recipeId" element={<RecipeEdit mode="fork" />} />
            <Route path="/mypage" element={<ProtectedRoute path={<MyPage />} />} />
            <Route path="/scrap" element={<ProtectedRoute path={<Scrap />} />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </>
  );
}

export default App;
