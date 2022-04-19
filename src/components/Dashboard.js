import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';



import MakeTransaction from './MakeTransaction';
import ShowChain from './ShowChain'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/munthy/ibe500_seafoodtracker">
        Viktor & Magnus
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const mdTheme = createTheme({
  palette: {
    mode:'dark',
    primary: {
      main: '#29abe3',
    },
    secondary: {
      main: '#196585',
    },
    error: {
      main: '#851919',
    },
  },
});

function DashboardContent() {


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />   
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
            <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center" sx={{outline:"solid"}}>
                <Grid item xs={6}>
                <MakeTransaction />
                </Grid>
                <Grid item xs={6}>
                  <ShowChain />
                </Grid>
              </Grid>
            <Copyright sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
