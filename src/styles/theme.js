import { createTheme } from '@mui/material';
import { orange, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: orange[800],
      light: orange[400],
    },
    seperator: {
      main: orange[100],
      light: grey[200],
    },
    subbackground: {
      main: grey[400],
    },
  },
});

export default theme;
