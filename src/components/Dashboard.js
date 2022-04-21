import React, {useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid'
import PhishingIcon from '@mui/icons-material/Phishing';
import {TabContext, TabList, TabPanel} from '@mui/lab';

import MakeTransaction from './MakeTransaction';
import ShowChain from './ShowChain'

function Credits(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'HiMolde IBE500 | '}
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
      main: '#ffff',
    },
    secondary: {
      main: '#1b2836',
      light: '#293c52',
    },
    error: {
      main: '#851919',
    },
  },
});

function DashboardContent() {
  const [tabValue, setTabValue] = useState("1")

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      
        <Typography component="h1" sx={{fontSize:48, color:"primary", textAlign:"center" ,backgroundColor:"secondary.main"}}>
         <PhishingIcon fontSize="large" /> BSV Seafood Tracker
        </Typography>
      
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />   
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : "secondary.main",
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <TabContext value={tabValue}>
            <Box container sx={{borderBottom:1,borderColor:"divider"}}>
              <TabList onChange={handleTabChange} centered>
                <Tab label="Create Transaction" value="1" />
                <Tab label="View Lot History" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1"><Grid container alignItems="center" justifyContent="center"><MakeTransaction /></Grid></TabPanel>
            <TabPanel value="2"><Grid container alignItems="center" justifyContent="center"><ShowChain /></Grid></TabPanel>
          </TabContext>
            <Credits sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
