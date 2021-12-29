import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Paper } from '@mui/material';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const navActions = [
    {
      label: 'Habits',
      icon: <ListIcon/>,
    }, 
    {
      label: 'Profile',
      icon: <AccountCircleIcon/>,
    },
  ];

  return (
    <Box sx={{ width: '100vw', position: 'fixed', bottom: 0 }}>
      <Paper elevation={4} >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          {navActions.map((action) => {
            return (<BottomNavigationAction key={action.label} label={action.label} icon={action.icon} />);
          })}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}