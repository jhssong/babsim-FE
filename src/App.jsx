import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import theme from './styles/theme';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route></Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
