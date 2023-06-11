import { createTheme } from '@mui/material/styles';
import { Inter } from '@next/font/google';

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90CAF9',
      light: '#E3F2FD',
      dark: '#42A5F5',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#424242',
      light: '#BDBDBD',
      dark: '#000000',
      contrastText: 'rgba(255, 255, 255, 0.87)',
    },
    info: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#EEEEEE',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontWeight: 'bold',
    },
    h2: {
      fontWeight: 'bold',
    },
    h3: {
      fontWeight: 'bold',
    },
    h4: {
      fontWeight: 'bold',
    },
    h5: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 'bold',
    },
  },
  shape: {
    borderRadius: 8,
  },
  mixins: {
    toolbar: {
      minHeight: 56,
      '@media (min-width:0px):': {
        '@media (orientation: landscape):': {
          minHeight: 56,
        },
      },
      '@media (min-width:600px):': {
        minHeight: 56,
      },
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordWrap: 'normal',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem',
        },
      },
      defaultProps: {
        variant: 'contained',
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
          borderRadius: '8px',
        },
      },
      defaultProps: {
        variant: 'standard',
        fullWidth: true,
      },
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
        variant: 'standard',
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#27c5f3',
          textDecoration: 'none',
        },
      },
    },
  },
});

export default theme;
