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
import useLogout from '../../common/hooks/logout';
import { AppDispatch } from '../../redux/store';
import { Link, Outlet } from 'react-router-dom';
import { paths } from '../../route/path';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenuList } from '../../redux/actions/menuAction';
import { RootState } from '../../redux/store';
import { syncAuthState } from '../../redux/actions/auth';
import Auth from '../../common/HOC/auth';
import { USER_KEY } from '../../constants/app';
import { getUserLocalStore } from '../../common/actions/stores';
import { setUserInStore } from '../../redux/reducers/authReducers';

interface IUser {
  id: number;
  phone: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  fullname: string;
  image_url: string;
  main_group_id: number;
}




const drawerWidth = 240;

interface LayoutProps {
  // window?: () => Window;
  // children: React.ReactNode;  // Nhận `children` từ props để hiển thị nội dung
}

const ResponsiveDrawer: React.FC<LayoutProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const { menuList = [], menuLoading, menuError } = useSelector((state: RootState) => state.menu);
  const logout = useLogout(); // Truyền hàm logout đúng cách

  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const {user} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if(menuList.length === 0){
      dispatch(fetchMenuList());
    } 
  }, []);

  useEffect(() => {
    if(!user){
      const userLocal = getUserLocalStore()
      dispatch(setUserInStore(userLocal));
    }
  },[user])

  //hàm đệ quy để lấy ra các menu con
  const renderMenuItems = (menuItems: any) => {

    if (!menuItems || !Array.isArray(menuItems)) {
      console.log('menuItems is not an array:', menuItems);
      return null;
  }

    return menuItems.map((item: any) => {
      const handleClick = () => {
        setOpen(!open);
      };

      return (
        <div key={item.id}>
          <ListItem disablePadding>
            <ListItemButton onClick={item.children ? handleClick : undefined} component={Link} to={item.url}>
              <ListItemText primary={item.name} />
              {item.children ? open ? <ExpandLessIcon/> : <ExpandMoreIcon/> : null}
              </ListItemButton>
          </ListItem>
          {item.children && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(item.children)}
              </List>
            </Collapse>
          )}
        </div>
      );
    });
  };


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // User menu handlers
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
        <List>
          {renderMenuItems(menuList)}
        </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

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
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          {/* Logo on the AppBar */}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          <Link to={paths.overview} style={{ textDecoration:'none', color:'white'}}>
            My Logo
            </Link>

          </Typography>
          {/* Avatar with Dropdown for user actions */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src={user?.image_url} />
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

            <MenuItem onClick={handleCloseUserMenu}>
                <Typography 
                  component="div"
                  style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  <p>{user?.fullname}</p>
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
                <Typography 
                  component="div"
                  style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  <p>{user?.main_group_id}</p>
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseUserMenu}>
                <Link 
                  to="/profile" 
                  style={{ 
                    textDecoration: 'none', 
                    color: 'inherit', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    width: '100%',
                  }}>
                  <Typography style={{ textAlign: 'center' }}>Profile</Typography>
                </Link>
              </MenuItem>

              <MenuItem onClick={logout}>
                <Typography 
                  component="div"
                  style={{
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    textAlign: 'center',
                    width: '100%',
                  }}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
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
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* Render nội dung truyền qua props */}
        <div>
          <Outlet/>
        </div>
      </Box>
    </Box>
  );
};

export default Auth({WrappedComponent:ResponsiveDrawer});




