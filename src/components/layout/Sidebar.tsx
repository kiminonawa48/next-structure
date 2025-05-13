'use client';

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const Sidebar = () => {
  return (
    <List>
      {['Dashboard', 'Profile', 'Settings'].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
