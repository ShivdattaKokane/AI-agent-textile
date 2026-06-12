import { createTheme, PaletteMode } from '@mui/material';

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#0070d2' : '#90caf9',
    },
    secondary: {
      main: '#607d8b',
    },
    background: {
      default: mode === 'light' ? '#f5f7f9' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"72", "72full", Arial, Helvetica, sans-serif',
    h5: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: mode === 'light' ? '0 2px 4px rgba(0,0,0,0.05)' : '0 2px 4px rgba(0,0,0,0.5)',
        },
      },
    },
  },
});
