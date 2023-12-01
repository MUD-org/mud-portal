import React, {useRef} from 'react';
import './AppDrawer.css'; // Import your CSS file
import CancelIcon from '@mui/icons-material/Cancel';
import { Stack, Box, Divider, List, ListItem, ListItemButton, ListItemText, SwipeableDrawer, Typography, IconButton } from '@mui/material';

interface AppDrawerProps {
    open: boolean;
    onClose?: () => void;
}

const AppDrawer: React.FC<AppDrawerProps> = ({open, onClose}) => {
    const drawerRef = useRef<HTMLDivElement>(null);

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
            { open
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
                            <Typography color="textPrimary">
                                It is a long established fact that a reader will be distracted by the readable content of a 
                                page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less 
                                normal distribution of letters, as opposed to using 'Content here, content here', making it
                                 look like readable English. Many desktop publishing packages and web page editors now use 
                                 Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many
                                  web sites still in their infancy. Various versions have evolved over the years, sometimes by 
                                  accident, sometimes on purpose (injected humour and the like).
                            </Typography>
                    </Box>
                )
                : null}
            
        </div>
    );
};

export default AppDrawer;
