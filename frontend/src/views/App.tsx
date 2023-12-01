import React, {useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import AppDrawer from '../components/AppDrawer';
import { Box, Tabs, Tab, Divider } from '@mui/material';
import GameDrawer from '../components/GameDrawer';
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#317873',
    },
    secondary: {
      main: '#8B4513',
    },
    text: {
      primary: '#d3d3d3',
      secondary: '#d3d3d3'
    },
    background: {
      default: '#1c1c1c',
      paper: '#2f4f4f'
    }
  },
});

function App() {
  const [appDrawerOpen, setAppDrawerOpen] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppDrawer open={appDrawerOpen} onClose={() => setAppDrawerOpen(false)}/>
        <Box sx={{display: 'flex', width: '100%', backgroundColor: theme => theme.palette.background.default }}>
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs 
                // value={value} 
                // onChange={handleChange} 
                aria-label="basic tabs example"
                variant="scrollable"
                scrollButtons="auto">
                <Tab icon={<MenuIcon />} onClick={() => setAppDrawerOpen(!appDrawerOpen)} />
                <Divider />
              </Tabs>
            </Box>
          </Box>
          <GameDrawer />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
