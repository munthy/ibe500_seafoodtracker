import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#55add6',
    },
    secondary: {
      main: '#196585',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;