import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';

export default function NavBar() {
  return (
    <AppBar position="fixed" elevation={4} sx={{ color: 'white' }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Habits
        </Typography>
        <IconButton color='inherit' >
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}