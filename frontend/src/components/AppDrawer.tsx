import React from 'react';
import './AppDrawer.css'; // Import your CSS file
import { AppBar, Box, Dialog, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Slide, Toolbar } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppRouter from '../routes/AppRouter';
import AccountWidget from './AccountWidget';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="right" ref={ref} {...props} />;
  });

interface AppDrawerProps {
    open: boolean;
    onClose?: () => void;
}

const AppDrawer: React.FC<AppDrawerProps> = ({open, onClose}) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // 'md' is typically the breakpoint for desktop screens


    return (
        <div style={{ display: 'flex'}}>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullScreen
                onClose={onClose}>
                <AppBar sx={{ position: 'relative', zIndex: theme.zIndex.drawer + 1 }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                            >
                            <CloseIcon />
                        </IconButton>
                        <Box sx={{flexGrow: 1}}></Box>
                        <AccountWidget/>
                    </Toolbar>
                </AppBar>
                {isDesktop && (
                    <Drawer
                        variant="permanent"
                        open
                        sx={{
                            width: 240,
                            flexShrink: 0,
                            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                        }}
                    >
                        <Toolbar /> {/* This adds spacing at the top equal to the AppBar's height */}
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                )}
                <AppRouter/>
            </Dialog>
        </div>
    );
};

export default AppDrawer;
