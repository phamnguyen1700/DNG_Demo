import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState, AppDispatch } from '../../redux/store';
// import { fetchMenuList } from '../../redux/actions/menuAction';
import { getUserLocalStore } from '../../common/actions/stores';
import { setUserInStore } from '../../redux/reducers/authReducers';
import useLogout from '../../common/hooks/logout';
import Auth from '../../common/HOC/auth';
import { menuConfig } from '../../Menu/menuConfig';
import { paths } from '../../route/path';
import StoreMenu from './components/storesMenu';
interface MenuItem {
  id: number;
  name: string;
  url?: string;
  children?: MenuItem[];
}

const drawerWidth = 240;

const ResponsiveDrawer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const logout = useLogout();
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { user } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    if (!user) {
      const userLocal = getUserLocalStore();
      dispatch(setUserInStore(userLocal));
    }
  }, [user, dispatch]);

  const handleToggle = (id: number) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  const renderMenuItems = (menuItems: MenuItem[]) => {
    return menuItems.map((item) => (
      <div key={item.id}>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              if (item.children) {
                handleToggle(item.id);
              }
            }}
            component={item.children ? 'button' : Link}
            to={item.children ? '#' : item.url || '#'}
          >
            <ListItemText primary={item.name} />
            {item.children ? (open[item.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />) : null}
          </ListItemButton>
        </ListItem>
        {item.children && (
          <Collapse in={open[item.id]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {renderMenuItems(item.children)}
            </List>
          </Collapse>
        )}
      </div>
    ));
  };
  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const drawer = (
    <div>
      <Toolbar>
        <Link to={paths.overview} style={{ textDecoration: 'none', color: 'inherit' }}><p> HOME </p></Link>
      </Toolbar>
      <Divider />
      <List>
        {renderMenuItems(menuConfig)}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
        >       
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {/* <Link to={paths.overview} style={{ textDecoration: 'none', color: 'white' }}>
              My Logo
            </Link> */}
            <StoreMenu />
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user?.image_url} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography component="div" sx={{ width: '100%', textAlign: 'center' }}>
                  <p>{user?.fullname}</p>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography component="div" sx={{ width: '100%', textAlign: 'center' }}>
                  <p>{user?.main_group_id}</p>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', width: '100%', textAlign: 'center' }}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Typography component="div" sx={{ width: '100%', textAlign: 'center' }}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Auth({ WrappedComponent: ResponsiveDrawer });
