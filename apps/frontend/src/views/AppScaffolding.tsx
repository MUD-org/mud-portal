import React from "react";
import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import PortalRouter from "../router";
import { useUser } from '../contexts/UserContext'; 

const pages = ['Home', 'Browse'];
const settings = ['Logout'];

const AppScaffolding: React.FC = () => {
  const user = useUser();

  const [_anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
      <Toolbar>
        <Avatar alt="MUD" src="icon.png" sx={{ width: 56, height: 56, marginLeft: '1em', marginRight: '1em' }}/>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */} 
          <Box sx={{ flexGrow: 0, display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
            <Button size="large" variant="contained" color="info">
              Open Client
            </Button>
          </Box>         
          <Box sx={{ flexGrow: 1, justifyContent: 'center', display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          { (!user.user || !user.user.token)
            ? (<Button variant="contained" color="info" size="large">Login</Button>)
            : (<>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User's Name" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            </>)
          }
          </Box>
        </Toolbar>
      </AppBar>
      <PortalRouter />
    </>
  );
}

export default AppScaffolding;