import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ title, backButton, addButton, setOpenDialog }) {
  let navigate = useNavigate();
  
  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAddClick = () => {
    setOpenDialog(true);
  };

  return (
    <AppBar position="fixed" elevation={4} sx={{ color: 'white' }}>
      <Toolbar>
        {backButton ?  
        <IconButton onClick={handleBackClick} color='inherit' sx={{ paddingRight: '30px' }} >
          <ArrowBackIosNewIcon />
        </IconButton>
        :         
        null}
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {!addButton ?  
        null :         
        <IconButton color='inherit' onClick={handleAddClick} >
          <AddIcon />
        </IconButton>}
      </Toolbar>
    </AppBar>
  );
}