import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
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
            if (newValue === 0) {
              navigate('/');
            } else if (newValue === 1) {
              navigate('profile');
            }
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