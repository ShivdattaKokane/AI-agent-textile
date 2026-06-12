import React, { useState } from 'react';
import {
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Avatar, Menu, MenuItem, Tooltip
} from '@mui/material';
import {
  Menu as MenuIcon, Dashboard, Chat, Assessment, Settings, Brightness4, Brightness7, Logout, ChevronLeft
} from '@mui/icons-material';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

const drawerWidth = 240;

const Layout: React.FC = () => {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'AI Chat', icon: <Chat />, path: '/chat' },
    { text: 'Reports', icon: <Assessment />, path: '/reports' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: mode === 'light' ? '#354a5f' : '#1e1e1e' }}>
        <Toolbar variant="dense">
          <IconButton color="inherit" onClick={() => setOpen(!open)} edge="start" sx={{ mr: 2 }}>
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, fontWeight: 'bold' }}>Enterprise AI Assistant</Typography>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>{user?.full_name.charAt(0)}</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={() => { logout(); navigate('/login'); }}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: open ? drawerWidth : 64, flexShrink: 0, '& .MuiDrawer-paper': { width: open ? drawerWidth : 64, boxSizing: 'border-box', overflowX: 'hidden' } }}>
        <Toolbar variant="dense" />
        <List sx={{ mt: 2 }}>
          {menuItems.map((item) => (
            <ListItemButton key={item.text} onClick={() => navigate(item.path)} selected={location.pathname === item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar variant="dense" />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
