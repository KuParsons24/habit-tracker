import { Button, Container, Grid, Toolbar } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../authorization/context/AuthContext';
import NavBar from './NavBar';

export default function ProfilePage () {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout()
      .then(res => {
        navigate('/signin');
      });
  }

  return(
    <Container id='profilepage' maxWidth='md'>
      <NavBar title={'Profile'} />
      <Toolbar />
      <Grid container marginTop='10px' spacing={1}>
        <Grid container item xs={12} justifyContent='center' >
          <Button variant='contained' onClick={handleClick} >Logout</Button>
        </Grid>
      </Grid>
      <Toolbar />
    </Container>
  );
}