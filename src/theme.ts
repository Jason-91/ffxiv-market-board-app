import { createTheme } from '@mui/material/styles';

const createCustomTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: { main: '#1976d2' },
            secondary: { main: '#9c27b0' },
            background: {
              default: '#fff',
              paper: '#fff',
            },
            text: {
              primary: '#000',
              secondary: '#757575',
            },
          }
        : {
            // palette values for dark mode
            primary: { main: '#90caf9' },
            secondary: { main: '#ce93d8' },
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            text: {
              primary: '#fff',
              secondary: '#bdbdbd',
            },
          }),
    },
  });

export default createCustomTheme;