import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: "'Drius', sans-serif",
  },
  palette: {
    primary: {
      main: '#00be00',
    },
    secondary: {
      main: '#040605',
      light: '#1E1E1E'
    },
    info: {
      main: '#00be00'
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.cdnfonts.com/css/drius');
        body {
          font-family: 'Drius', sans-serif;
     
          background-size: cover;
          background-attachment: fixed;
          background-position: center;
        }
      `,
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
          color: 'lime',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: '0 3px 5px 2px rgba(0, 190, 0, .3)',
          '&:hover': {
            backgroundColor: 'black',
            color: 'lime',
          },
        },
      },
    },
  },
});
