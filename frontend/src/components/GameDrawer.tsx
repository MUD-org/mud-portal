import React from 'react';
import { Divider, IconButton, Stack, SwipeableDrawer } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './GameDrawer.css';

const GameDrawer: React.FC = () => {
    const toggleDrawer =
    (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
    };

    return (
        <SwipeableDrawer 
            open={true} 
            anchor="right" 
            variant="permanent" 
            className="game-drawer"
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
        >
            <Stack direction="column" padding="0.5em" spacing="0.25em">
                <IconButton>
                    <AddIcon />
                </IconButton>
                <Divider/>
            </Stack>
        </SwipeableDrawer>
    );
};

export default GameDrawer;
