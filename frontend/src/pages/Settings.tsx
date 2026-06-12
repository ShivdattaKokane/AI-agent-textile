import React from 'react';
import { Typography, Box, Paper, Switch, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Brightness4 } from '@mui/icons-material';
import { useSettings } from '../context/SettingsContext';

const Settings: React.FC = () => {
  const { mode, toggleColorMode } = useSettings();
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Settings</Typography>
      <Paper>
        <List>
          <ListItem>
            <ListItemIcon><Brightness4 /></ListItemIcon>
            <ListItemText primary="Dark Mode" />
            <Switch checked={mode === 'dark'} onChange={toggleColorMode} />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};
export default Settings;
