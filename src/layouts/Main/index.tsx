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
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import useLogout from '../../common/hooks/logout';
import { AppDispatch } from '../../redux/store';
import { Link } from 'react-router-dom';
import { paths } from '../../route/path';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenuList } from '../../redux/actions/menuAction';



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
  window?: () => Window;
  children: React.ReactNode;  // Nhận `children` từ props để hiển thị nội dung
}

const ResponsiveDrawer: React.FC<LayoutProps> = ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = useState<IUser | null>(null);
  // Lấy thông tin user từ localStorage
  const dispatch: AppDispatch = useDispatch();
  const { menuList, menuLoading, menuError } = useSelector((state: any) => state.menu);

  useEffect(() => {
    console.log('Dispatching fetchMenuList...');
    dispatch(fetchMenuList());
  }, [menuList, dispatch]);


  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parseUser = JSON.parse(userData);
        setUser(parseUser);
      } catch (error) {
        console.log('Lỗi parse:', error);
      }
    }
  },[]);



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

  const logout = useLogout(); // Truyền hàm logout đúng cách

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

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
          <Link to={paths.home} style={{ textDecoration:'none', color:'white'}}>
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
        {children}
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
