import React, {useRef} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AppDrawer.css'; // Import your CSS file
import CancelIcon from '@mui/icons-material/Cancel';
import { Stack, Box, Divider, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer, Typography, IconButton } from '@mui/material';
import AppRouter from '../routes/AppRouter';

interface AppDrawerProps {
    open: boolean;
    onClose?: () => void;
}

const AppDrawer: React.FC<AppDrawerProps> = ({open, onClose}) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const navigate = useNavigate();

    const appContentWidth = () => {
        if (!open)
            return 0;
        return `calc(100% - ${(drawerRef?.current?.getBoundingClientRect().width || 0) + 60}px)`;
    }

    return (
        <div className="app-drawer">
            <SwipeableDrawer
                anchor="left"
                open={open}
                onClose={() => onClose}
                onOpen={() => ""}>
                <Stack ref={drawerRef}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/client')}>
                                <ListItemText primary="Client (Debug)" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/featured')}>
                                <ListItemText primary="Featured Games" />
                            </ListItemButton>
                        </ListItem>
                    <Divider/>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                    </List>
                </Stack>
            </SwipeableDrawer>
            { open && location.pathname !== '/client'
                ? (
                    <Box
                        className="content"
                        sx={{
                            left: drawerRef?.current?.getBoundingClientRect().width || 0, 
                            width: appContentWidth(),
                            backgroundColor: theme => theme.palette.background.default
                        }}>
                            <Stack 
                                direction="row" 
                                justifyContent="space-between" 
                                alignItems="center">
                                <span></span>
                                <IconButton onClick={() => onClose?.()} color="secondary">
                                    <CancelIcon />
                                </IconButton>
                            </Stack>
                            <AppRouter/>
                    </Box>
                )
                : null}
        </div>
    );
};

export default AppDrawer;
