import { createTheme } from '@mui/material';
import { orange, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[800],
      light: orange[200],
    },
    secondary: {
      main: orange[300],
    },
    seperator: {
      main: orange[100],
    },
    subbackground: {
      main: grey[900],
    },
  },
});

export default theme;
