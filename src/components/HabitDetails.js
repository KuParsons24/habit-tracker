import { Grid, Toolbar } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import BasicCalendar from './BasicCalendar';
import HabitCalendar from './HabitCalendar';
import NavBar from './NavBar';

export default function HabitDetails () {
  let { id } = useParams();
  return(
    <div id={'HabitDetails'}>
      <NavBar title={'Habit'} backButton />
      <Toolbar />
      <Grid container marginTop='10px'>
        <Grid container item xs={12} justifyContent='center' >
          <BasicCalendar />
        </Grid>
      </Grid>
    </div>
  );
}