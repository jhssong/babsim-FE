import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from './recoil/atoms';

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
import RecipeReviews from './pages/Recipe/RecipeReviews';

const ProtectedRoute = ({ path }) => {
  const isLoggined = useRecoilValue(loginState).isLoggedIn;
  return isLoggined ? path : <Navigate to="/login" />;
};

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
