import React from 'react';
import './App.css';
import AppDrawer from '../components/AppDrawer';
import { Box } from '@mui/material';
import GameDrawer from '../components/GameDrawer';

function App() {
  return (
    <div className="App">
      <AppDrawer />
      <Box sx={{display: 'flex'}}>
        <Box component="main" sx={{ flexGrow: 1 }}>

        </Box>
        <GameDrawer />
      </Box>
    </div>
  );
}

export default App;
