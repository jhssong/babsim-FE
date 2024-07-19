import { ThemeProvider } from "@emotion/react"
import {CssBaseline} from "@mui/material"
import theme from "./styles/theme"
import GlobalStyle from "./styles/GlobalStyle"

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <CssBaseline />
      </ThemeProvider>
    </>
  );
}

export default App;
